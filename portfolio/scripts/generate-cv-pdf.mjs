import fs from "node:fs";
import path from "node:path";
import PDFDocument from "pdfkit";

const root = process.cwd();
const source = path.join(root, "public", "cv.md");
const output = path.join(root, "public", "cv.pdf");
const markdown = fs.readFileSync(source, "utf8");

const doc = new PDFDocument({
  size: "A4",
  margins: { top: 40, bottom: 40, left: 45, right: 45 },
  info: {
    Title: "MD. Emon Miah — CV",
    Author: "MD. Emon Miah",
    Subject: "Full Stack Mobile & Backend Developer Curriculum Vitae",
  },
});

fs.mkdirSync(path.dirname(output), { recursive: true });
doc.pipe(fs.createWriteStream(output));

const plain = (s) =>
  s
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1");

const width = doc.page.width - doc.page.margins.left - doc.page.margins.right;

for (const raw of markdown.split(/\r?\n/)) {
  const line = raw.trim();
  if (!line || line === "---") {
    doc.moveDown(line ? 0.25 : 0.2);
    continue;
  }

  if (line.startsWith("# ")) {
    doc.font("Helvetica-Bold").fontSize(22).fillColor("#111827").text(plain(line.slice(2)), { width });
    doc.moveDown(0.15);
    doc
      .moveTo(doc.page.margins.left, doc.y)
      .lineTo(doc.page.width - doc.page.margins.right, doc.y)
      .strokeColor("#E53935")
      .lineWidth(2)
      .stroke();
    doc.moveDown(0.35);
  } else if (line.startsWith("## ")) {
    doc.moveDown(0.3).font("Helvetica-Bold").fontSize(13).fillColor("#E53935").text(plain(line.slice(3)), { width });
    doc.moveDown(0.12);
  } else if (line.startsWith("### ")) {
    doc.moveDown(0.2).font("Helvetica-Bold").fontSize(10.5).fillColor("#111827").text(plain(line.slice(4)), { width });
    doc.moveDown(0.08);
  } else if (line.startsWith("#### ")) {
    doc.moveDown(0.15).font("Helvetica-Bold").fontSize(9.5).fillColor("#374151").text(plain(line.slice(5)), { width });
    doc.moveDown(0.05);
  } else if (line.startsWith("- ")) {
    doc
      .font("Helvetica")
      .fontSize(9)
      .fillColor("#374151")
      .text("•  " + plain(line.slice(2)), { width: width - 10, indent: 8, paragraphGap: 2.5 });
  } else if (line.startsWith("> ")) {
    doc.font("Helvetica-Oblique").fontSize(8).fillColor("#6B7280").text(plain(line.slice(2)), { width });
  } else {
    doc.font("Helvetica").fontSize(9).fillColor("#374151").text(plain(line), { width, paragraphGap: 2.5, lineGap: 1.5 });
  }

  if (doc.y > doc.page.height - doc.page.margins.bottom - 35) {
    doc.addPage();
  }
}

doc.end();
console.log("Generated public/cv.pdf with red accent theme from public/cv.md");
