const express = require('express');
const cors = require('cors');
const fs = require('fs/promises');
const path = require('path');

const app = express();
const PORT = 5000;
const DB_PATH = path.join(__dirname, 'data', 'db.json');

app.use(cors());
app.use(express.json());

// Yardımcı: DB Oku/Yaz
const readDb = async () => JSON.parse(await fs.readFile(DB_PATH, 'utf-8'));
const writeDb = async (data) => await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));

// API: Dashboard Verileri
app.get('/api/stats', async (req, res) => {
    const data = await readDb();
    res.json(data.currentStats);
});

// API: Yeni Tarama Başlat (Simülasyon)
app.post('/api/scan', async (req, res) => {
    const { url } = req.body;
    const db = await readDb();

    // Yapay bir gecikme ve analiz sonucu (Mocking AI)
    const newResult = {
        id: Date.now(),
        url,
        score: Math.floor(Math.random() * (100 - 60) + 60), // 60-100 arası puan
        date: new Date().toISOString(),
        issuesFound: [
            "Navbar: 'Home' etiketi Fransızca değil.",
            "Footer: Yasal uyarılar eksik.",
            "Form: Placeholder metinleri İngilizce kalmış."
        ]
    };

    // DB güncelle
    db.history.unshift(newResult);
    db.currentStats.score = newResult.score;
    db.currentStats.issues = newResult.issuesFound.length;
    db.currentStats.compliant = newResult.score > 90;

    await writeDb(db);
    
    // İşlem biraz sürüyormuş gibi 1.5 saniye bekle
    setTimeout(() => {
        res.json(newResult);
    }, 1500);
});

app.listen(PORT, () => console.log(`🔮 Quebec-Ready AI Engine: http://localhost:${PORT}`));