// Konfigurasi Supabase untuk upload foto + QR (Block Biometrik).
// Memakai project + bucket yang sama dengan Fog Glass, jadi tidak perlu setting Supabase tambahan.
// PENTING: pakai anon / publishable key saja. JANGAN pernah taruh service_role / secret key di sini.
window.BIO_SYNC_CONFIG = {
    SUPABASE_URL: 'https://fxgodohilfqabqkwrkre.supabase.co',
    SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4Z29kb2hpbGZxYWJxa3dya3JlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczMjYxNDMsImV4cCI6MjA4MjkwMjE0M30.9wgs6w6buzkYVsEVVJnQ6HqM2MDlzWg0eilDqVAwfTE',
    BUCKET: 'fog-glass',
    FOLDER: 'photos',       // policy Supabase saat ini hanya mengizinkan upload ke folder "photos"
    // QR selalu mengarah ke photo.html?p=<path>, lalu photo.html mengambil fotonya dari Supabase Storage.
    // Kosongkan = otomatis pakai photo.html di folder yang sama dengan index.html (kalau sudah di-hosting).
    // Isi manual kalau index.html dijalankan lokal (localhost/file), karena HP tidak bisa membuka localhost.
    // Contoh: 'https://username.github.io/computer-vision/Block%20Biometrik/photo.html'
    VIEWER_URL: ''
};
