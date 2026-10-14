import fs from "node:fs";
import path from "node:path";
import PDFDocument from "pdfkit";

const root = process.cwd();
const source = path.join(root, "public", "cv.md");
const output = path.join(root, "public", "cv.pdf");
const markdown = fs.readFileSync(source, "utf8");
const doc = new PDFDocument({ size: "A4", margins: { top: 52, bottom: 52, left: 54, right: 54 }, info: { Title: "MD. Emon Miah — CV", Author: "MD. Emon Miah", Subject: "Software Engineer CV" } });
fs.mkdirSync(path.dirname(output), { recursive: true });
doc.pipe(fs.createWriteStream(output));

const plain = (s) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*(.*?)\*\*/g, "$1").replace(/\*(.*?)\*/g, "$1");
const width = doc.page.width - doc.page.margins.left - doc.page.margins.right;
for (const raw of markdown.split(/\r?\n/)) {
  const line = raw.trim();
  if (!line || line === "---") { doc.moveDown(line ? 0.35 : 0.28); continue; }
  if (line.startsWith("# ")) {
    doc.font("Helvetica-Bold").fontSize(25).fillColor("#172414").text(plain(line.slice(2)), { width });
    doc.moveDown(0.2);
    doc.moveTo(doc.page.margins.left, doc.y).lineTo(doc.page.width - doc.page.margins.right, doc.y).strokeColor("#9cbd58").lineWidth(2).stroke();
    doc.moveDown(0.55);
  } else if (line.startsWith("## ")) {
    doc.moveDown(0.35).font("Helvetica-Bold").fontSize(14).fillColor("#35551f").text(plain(line.slice(3)), { width });
    doc.moveDown(0.18);
  } else if (line.startsWith("### ")) {
    doc.moveDown(0.25).font("Helvetica-Bold").fontSize(11).fillColor("#172414").text(plain(line.slice(4)), { width });
    doc.moveDown(0.1);
  } else if (line.startsWith("- ")) {
    doc.font("Helvetica").fontSize(9.5).fillColor("#252a24").text("•  " + plain(line.slice(2)), { width: width - 8, indent: 6, paragraphGap: 3 });
  } else if (line.startsWith("> ")) {
    doc.font("Helvetica-Oblique").fontSize(8).fillColor("#66705e").text(plain(line.slice(2)), { width });
  } else {
    doc.font("Helvetica").fontSize(9.5).fillColor("#252a24").text(plain(line), { width, paragraphGap: 3, lineGap: 2 });
  }
  if (doc.y > doc.page.height - doc.page.margins.bottom - 40) doc.addPage();
}
doc.end();
console.log("Generated public/cv.pdf from public/cv.md");
