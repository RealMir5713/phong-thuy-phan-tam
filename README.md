# Phong Thủy Phan Tâm

Static Vietnamese SEO lead-generation website for the personal consultation brand “Phong Thủy Phan Tâm”.

## Commands

```powershell
npm.cmd run build
npm.cmd run serve
```

Preview URL:

```text
http://127.0.0.1:4174/
```

Deploy when Vercel CLI access is available:

```powershell
npx.cmd --yes vercel --prod --yes
```

## Contact Placeholders

The Facebook public metadata exposed the brand name and profile image, but no clean phone/Zalo number. Update these constants in `scripts/build.mjs` before the final production handoff if the real contact number is available:

- `phoneDisplay`
- `phoneTel`
- `zalo`
