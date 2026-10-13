
import express from 'express';

const app = express();

// Parse incoming JSON request bodies, with a 10 KB limit.
app.use(express.json({ limit: '10kb' }));

// Serve frontend files from the public folder.
app.use(express.static('public'));

// Health-check route.
app.get('/api/health', (req, res) => {
    res.json({ ok: true });
});

const port = Number(process.env.PORT || 3000);

app.listen(port, () => console.log(`Open http://localhost:${port}`));
