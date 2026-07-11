import express, { type Express, type Request, type Response } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  const distPath = path.resolve(process.cwd(), "dist/public");
  if (!fs.existsSync(distPath)) throw new Error(`Build directory not found: ${distPath}`);

  // Read once at startup; inject per-route canonical on every request
  const indexHtml = fs.readFileSync(path.resolve(distPath, "index.html"), "utf-8");

  app.use(express.static(distPath));

  app.use("/{*path}", (req: Request, res: Response) => {
    // Normalize: root keeps trailing slash, all other paths strip it
    const urlPath = req.path === "/" ? "/" : req.path.replace(/\/$/, "");
    const canonical = `https://www.e-skillora.com${urlPath}`;
    const html = indexHtml.replace(
      '<link rel="canonical" href="https://www.e-skillora.com/">',
      `<link rel="canonical" href="${canonical}">`
    );
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.send(html);
  });
}
