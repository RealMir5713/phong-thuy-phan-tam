const forms = document.querySelectorAll(".booking-form");

forms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = form.querySelector(".form-status");

    if (status) {
      status.textContent =
        "Cảm ơn anh/chị. Yêu cầu tư vấn đã được ghi nhận trên website mẫu. Vui lòng nhắn Zalo hoặc gọi số điện thoại hiển thị để xác nhận lịch sớm nhất.";
      status.classList.add("visible");
      status.setAttribute("tabindex", "-1");
      status.focus();
    }

    form.reset();
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const id = anchor.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
