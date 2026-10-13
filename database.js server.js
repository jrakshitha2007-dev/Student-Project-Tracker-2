[1mdiff --git a/server.js b/server.js[m
[1mindex 2e2f148..5651265 100644[m
[1m--- a/server.js[m
[1m+++ b/server.js[m
[36m@@ -1,19 +1,5 @@[m
[31m-[m
[31m-import express from 'express';[m
[31m-[m
[31m-const app = express();[m
[31m-[m
[31m-// Parse incoming JSON request bodies, with a 10 KB limit.[m
[31m-app.use(express.json({ limit: '10kb' }));[m
[31m-[m
[31m-// Serve frontend files from the public folder.[m
[31m-app.use(express.static('public'));[m
[31m-[m
[31m-// Health-check route.[m
[31m-app.get('/api/health', (req, res) => {[m
[31m-    res.json({ ok: true });[m
[31m-});[m
[31m-[m
[32m+[m[32mimport { createApp } from './app.js';[m
[32m+[m[32mimport { db } from './database.js';[m
[32m+[m[32mconst app = createApp(db);[m
 const port = Number(process.env.PORT || 3000);[m
[31m-[m
 app.listen(port, () => console.log(`Open http://localhost:${port}`));[m
[1mdiff --git a/server.js b/server.js[m
[1mindex 2e2f148..5651265 100644[m
[1m--- a/server.js[m
[1m+++ b/server.js[m
[36m@@ -1,19 +1,5 @@[m
[31m-[m
[31m-import express from 'express';[m
[31m-[m
[31m-const app = express();[m
[31m-[m
[31m-// Parse incoming JSON request bodies, with a 10 KB limit.[m
[31m-app.use(express.json({ limit: '10kb' }));[m
[31m-[m
[31m-// Serve frontend files from the public folder.[m
[31m-app.use(express.static('public'));[m
[31m-[m
[31m-// Health-check route.[m
[31m-app.get('/api/health', (req, res) => {[m
[31m-    res.json({ ok: true });[m
[31m-});[m
[31m-[m
[32m+[m[32mimport { createApp } from './app.js';[m
[32m+[m[32mimport { db } from './database.js';[m
[32m+[m[32mconst app = createApp(db);[m
 const port = Number(process.env.PORT || 3000);[m
[31m-[m
 app.listen(port, () => console.log(`Open http://localhost:${port}`));[m
