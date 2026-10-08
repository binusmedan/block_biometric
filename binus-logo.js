// Logo "BINUS @Medan Mantap Kaleee" (sama persis dengan watermark di video Accessory Filter).
// Digambar ke canvas sekali, lalu dipakai ulang: watermark foto (index.html) dan logo halaman (photo.html).
// Butuh font Lilita One (Google Fonts) di <head>; kalau gagal dimuat, fallback ke Arial Black / Impact.
(function () {
    const LOGO_W = 1400, LOGO_H = 660;
    const FONT_TITLE = '"Lilita One", "Arial Black", Impact, sans-serif';
    const logoCanvas = document.createElement('canvas');
    logoCanvas.width = LOGO_W; logoCanvas.height = LOGO_H;

    function layer() { const c = document.createElement('canvas'); c.width = LOGO_W; c.height = LOGO_H; return [c, c.getContext('2d')]; }

    function splash(c, x, y, a, color, s = 1) {
        c.save(); c.translate(x, y); c.rotate(a); c.scale(s, s);
        c.fillStyle = color;
        c.beginPath(); c.moveTo(0, -46); c.quadraticCurveTo(15, -6, 0, 12); c.quadraticCurveTo(-15, -6, 0, -46); c.fill();
        c.beginPath(); c.arc(0, -64, 6, 0, Math.PI * 2); c.fill();
        c.restore();
    }

    // Teks bertumpuk: bayangan, outline gelap, outline warna, outline dalam, isi
    function layeredText(c, text, x, y, o) {
        c.lineJoin = 'round'; c.miterLimit = 2;
        c.save();
        c.shadowColor = 'rgba(0,0,0,0.45)'; c.shadowBlur = 22; c.shadowOffsetY = 10;
        c.lineWidth = o.outer; c.strokeStyle = o.outerColor; c.strokeText(text, x, y);
        c.restore();
        c.lineWidth = o.mid; c.strokeStyle = o.midColor; c.strokeText(text, x, y);
        if (o.inner) { c.lineWidth = o.inner; c.strokeStyle = o.innerColor; c.strokeText(text, x, y); }
        c.fillStyle = o.fill; c.fillText(text, x, y);
    }

    function render() {
        const c = logoCanvas.getContext('2d');
        c.setTransform(1, 0, 0, 1, 0, 0);
        c.clearRect(0, 0, LOGO_W, LOGO_H);
        const cx = LOGO_W / 2;

        // Cipratan di atas tulisan
        splash(c, 300, 160, -0.75, '#c62828', 1.1); splash(c, 360, 120, -0.3, '#d4a017', 0.8);
        splash(c, 1040, 105, 0.35, '#d4a017', 0.9); splash(c, 1110, 140, 0.8, '#c62828', 1.15);

        // ---- BINUS (putih-perak, outline emas, miring) ----
        const by = 380;
        const [L, b] = layer();
        b.font = `250px ${FONT_TITLE}`; b.textAlign = 'center'; b.textBaseline = 'alphabetic';
        b.setTransform(1, 0, -0.2, 1, 0.2 * (by - 100), 0);
        const gold = b.createLinearGradient(0, by - 220, 0, by + 20);
        gold.addColorStop(0, '#fff1b0'); gold.addColorStop(0.35, '#e0a526'); gold.addColorStop(0.65, '#9c6510'); gold.addColorStop(1, '#f3c552');
        layeredText(b, 'BINUS', cx, by, { outer: 46, outerColor: '#4a2a08', mid: 30, midColor: gold, inner: 10, innerColor: '#fffaf0', fill: '#ffffff' });
        // Isi perak + goresan kuas (hanya di area isi)
        const [F, f] = layer();
        f.font = b.font; f.textAlign = 'center'; f.setTransform(1, 0, -0.2, 1, 0.2 * (by - 100), 0);
        const silver = f.createLinearGradient(0, by - 200, 0, by);
        silver.addColorStop(0, '#ffffff'); silver.addColorStop(0.55, '#f1edf6'); silver.addColorStop(1, '#c8c1d8');
        f.fillStyle = silver; f.fillText('BINUS', cx, by);
        f.setTransform(1, 0, 0, 1, 0, 0);
        f.globalCompositeOperation = 'source-atop';
        for (let i = 0; i < 26; i++) {
            const y = by - 200 + i * 8 + Math.sin(i * 1.7) * 3;
            f.strokeStyle = i % 3 ? 'rgba(150,140,175,0.16)' : 'rgba(255,255,255,0.55)';
            f.lineWidth = 2 + (i % 4);
            f.beginPath(); f.moveTo(cx - 520, y); f.quadraticCurveTo(cx, y - 14, cx + 520, y + 6); f.stroke();
        }
        const shine = f.createLinearGradient(0, by - 200, 0, by - 110);
        shine.addColorStop(0, 'rgba(255,255,255,0.7)'); shine.addColorStop(1, 'rgba(255,255,255,0)');
        f.fillStyle = shine; f.fillRect(0, by - 220, LOGO_W, 110);
        b.setTransform(1, 0, 0, 1, 0, 0);
        b.drawImage(F, 0, 0);
        c.drawImage(L, 0, 0);

        // ---- Sapuan kuas merah di bawah baris kedua ----
        const sw = c.createLinearGradient(cx - 480, 0, cx + 460, 0);
        sw.addColorStop(0, '#7f0000'); sw.addColorStop(0.4, '#e53935'); sw.addColorStop(1, '#8e0000');
        const swoosh = new Path2D();
        swoosh.moveTo(cx - 540, 590);
        swoosh.quadraticCurveTo(cx - 100, 466, cx + 500, 476);
        swoosh.quadraticCurveTo(cx + 430, 520, cx + 340, 542);
        swoosh.quadraticCurveTo(cx - 80, 604, cx - 540, 590);
        swoosh.closePath();
        c.save();
        c.shadowColor = 'rgba(0,0,0,0.35)'; c.shadowBlur = 16; c.shadowOffsetY = 8;
        c.fillStyle = sw; c.fill(swoosh);
        c.restore();
        // Serat kuas
        c.save(); c.clip(swoosh);
        for (let i = 0; i < 14; i++) {
            c.strokeStyle = i % 2 ? 'rgba(255,255,255,0.14)' : 'rgba(60,0,0,0.25)';
            c.lineWidth = 2 + (i % 3);
            c.beginPath(); c.moveTo(cx - 540, 560 + i * 4); c.quadraticCurveTo(cx - 60, 470 + i * 8, cx + 520, 470 + i * 6); c.stroke();
        }
        c.restore();
        c.strokeStyle = '#ffca28'; c.lineWidth = 8; c.lineCap = 'round';
        c.beginPath(); c.moveTo(cx - 330, 580); c.quadraticCurveTo(cx, 538, cx + 410, 516); c.stroke();

        // ---- @Medan (putih) + Mantap Kaleee (kuning-emas), outline merah ----
        const ly = 520;
        c.save();
        c.font = `112px ${FONT_TITLE}`; c.textAlign = 'left'; c.textBaseline = 'alphabetic';
        const t1 = '@Medan', t2 = 'Mantap Kaleee', gap = 26;
        const w1 = c.measureText(t1).width, w2 = c.measureText(t2).width;
        const scale = Math.min(1, 1180 / (w1 + gap + w2));
        const x0 = cx - (w1 + gap + w2) * scale / 2;
        c.setTransform(scale, 0, -0.12 * scale, scale, x0 + 0.12 * scale * (ly - 40), ly - ly * scale);
        const yellow = c.createLinearGradient(0, ly - 95, 0, ly + 10);
        yellow.addColorStop(0, '#fffde7'); yellow.addColorStop(0.35, '#ffe14d'); yellow.addColorStop(1, '#ff9800');
        const opt = { outer: 34, outerColor: '#4d0606', mid: 20, midColor: '#e53935' };
        layeredText(c, t1, 0, ly, { ...opt, fill: '#ffffff' });
        layeredText(c, t2, w1 + gap, ly, { ...opt, fill: yellow });
        c.restore();
    }

    render();   // langsung tersedia (font fallback), dirender ulang saat Lilita One siap

    // ready: resolve setelah font siap (maks 3 detik), supaya pemakai bisa menunggu versi final
    const ready = new Promise(resolve => {
        if (!document.fonts || !document.fonts.load) { resolve(); return; }
        const timer = setTimeout(resolve, 3000);
        document.fonts.load(`250px ${FONT_TITLE}`)
            .then(() => { render(); clearTimeout(timer); resolve(); })
            .catch(() => { clearTimeout(timer); resolve(); });
    });

    window.BinusLogo = {
        canvas: logoCanvas, width: LOGO_W, height: LOGO_H, ready, render,
        // Gambar logo di pojok kanan bawah canvas tujuan; return tinggi logo (untuk menaruh caption di atasnya)
        drawWatermark(ctx, w, h, frac = 0.4, marginFrac = 0.03) {
            const m = Math.min(w, h) * marginFrac;
            const lw = Math.min(w, h) * frac, lh = lw * LOGO_H / LOGO_W;
            ctx.drawImage(logoCanvas, w - m - lw, h - m - lh, lw, lh);
            return { m, lw, lh };
        }
    };
})();
