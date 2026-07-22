# Deploy ke Netlify

Project ini sudah diperbaiki agar tidak memakai dependency `catalog:` atau `workspace:*`.

## Upload ke GitHub
Upload **semua isi folder ini** ke repository GitHub. Pastikan `package.json`, `vite.config.ts`, dan `netlify.toml` berada di halaman utama repository, bukan di dalam folder tambahan.

## Pengaturan Netlify
Karena ada `netlify.toml`, Netlify akan membaca pengaturan otomatis:

- Build command: `npm run build`
- Publish directory: `dist`
- Node.js: 20

Jika project tetap berada di subfolder `confession-app`, set Base directory menjadi `confession-app`. Jika isi folder diunggah langsung ke halaman utama repository, kosongkan Base directory.

Setelah mengganti file di GitHub, pilih **Deploys → Trigger deploy → Clear cache and deploy site**.
