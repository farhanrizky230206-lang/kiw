# Website Premium Untuk Tiaraa

## File utama
- `index.html`
- `netlify.toml`
- folder `assets`

## Masukkan file ke folder assets
- `foto.jpg`
- `lagu.mp3` atau `lagu.mpeg`

## Edit nama dan WhatsApp
Cari bagian `CONFIG` di bawah file `index.html`.

```js
const CONFIG = {
  namaDia: "Tiaraa",
  nomorWhatsApp: "6281234567890"
};
```

Nomor harus menggunakan format 62, tanpa tanda + dan tanpa angka 0 di depan.

## Upload ke GitHub
Upload seluruh isi folder ini. Pastikan `index.html` berada di halaman utama repository.

## Hubungkan ke Netlify
- Add new project
- Import an existing project
- Pilih GitHub
- Pilih repository
- Build command: kosong
- Publish directory: `.`
- Deploy

Safari iPhone membutuhkan sentuhan pertama sebelum musik dapat diputar.
