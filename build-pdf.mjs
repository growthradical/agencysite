// Render album.html to a print-ready A4 PDF using headless Chromium (Puppeteer).
// Usage: npm install && npm run pdf  ->  album.pdf
import puppeteer from "puppeteer";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const htmlPath = "file://" + join(__dirname, "album.html");
const outPath = join(__dirname, "album.pdf");

const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.goto(htmlPath, { waitUntil: "networkidle0" });
await page.pdf({
  path: outPath,
  format: "A4",
  printBackground: true,
  preferCSSPageSize: true,
});
await browser.close();
console.log("Wrote " + outPath);
