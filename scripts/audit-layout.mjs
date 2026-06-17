import { spawn } from "node:child_process";
import { rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const chromePath = process.env.CHROME_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const chromePort = 9223;
const previewUrl = "http://127.0.0.1:4174/";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitFor(url, attempts = 40) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
    } catch {}
    await sleep(250);
  }
  throw new Error(`Timed out waiting for ${url}`);
}

async function connect(wsUrl) {
  const ws = new WebSocket(wsUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener("open", resolve, { once: true });
    ws.addEventListener("error", reject, { once: true });
  });

  let id = 0;
  const pending = new Map();
  ws.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(JSON.stringify(message.error)));
      else resolve(message.result);
    }
  });

  return {
    send(method, params = {}) {
      const messageId = ++id;
      ws.send(JSON.stringify({ id: messageId, method, params }));
      return new Promise((resolve, reject) => pending.set(messageId, { resolve, reject }));
    },
    close() {
      ws.close();
    }
  };
}

async function auditViewport(client, width, height) {
  await client.send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width <= 480
  });
  await client.send("Page.navigate", { url: previewUrl });
  await sleep(900);
  const expression = `(() => {
    const viewportWidth = document.documentElement.clientWidth;
    const nodes = Array.from(document.querySelectorAll("body *"));
    const offenders = nodes.map((el) => {
      const rect = el.getBoundingClientRect();
      return {
        tag: el.tagName.toLowerCase(),
        className: typeof el.className === "string" ? el.className : "",
        text: (el.innerText || el.getAttribute("aria-label") || "").replace(/\\s+/g, " ").trim().slice(0, 100),
        left: Math.round(rect.left),
        right: Math.round(rect.right),
        width: Math.round(rect.width)
      };
    }).filter((item) => item.right > viewportWidth + 1 || item.left < -1)
      .sort((a, b) => b.right - a.right)
      .slice(0, 20);
    return {
      innerWidth,
      clientWidth: viewportWidth,
      scrollWidth: document.documentElement.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
      offenders
    };
  })()`;
  const result = await client.send("Runtime.evaluate", {
    expression,
    returnByValue: true
  });
  return result.result.value;
}

const server = spawn(process.execPath, ["scripts/serve.mjs"], {
  cwd: root,
  stdio: "ignore"
});

const chromeUserData = path.join(root, ".chrome-layout-audit");
await rm(chromeUserData, { recursive: true, force: true });

const chrome = spawn(chromePath, [
  "--headless=new",
  "--disable-gpu",
  `--remote-debugging-port=${chromePort}`,
  `--user-data-dir=${chromeUserData}`,
  "about:blank"
], { stdio: "ignore" });

try {
  await waitFor(previewUrl);
  await waitFor(`http://127.0.0.1:${chromePort}/json/version`);
  const tabs = await (await fetch(`http://127.0.0.1:${chromePort}/json/list`)).json();
  const client = await connect(tabs[0].webSocketDebuggerUrl);
  await client.send("Page.enable");
  await client.send("Runtime.enable");
  const mobile = await auditViewport(client, 390, 1200);
  const desktop = await auditViewport(client, 1366, 1100);
  client.close();
  console.log(JSON.stringify({ mobile, desktop }, null, 2));
} finally {
  chrome.kill();
  server.kill();
}
