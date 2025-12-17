const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

function generateCertificatePDF(data) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        layout: "landscape",
        margin: 0,
      });

      const uniqueCertificateId = `IUL-${data.studentId}-${Date.now()}`;
      const filePath = path.join(
        __dirname,
        "../certificates/",
        `${uniqueCertificateId}.pdf`
      );

      const writeStream = fs.createWriteStream(filePath);
      doc.pipe(writeStream);

      const pageWidth = 842;
      const pageHeight = 595;

      doc.image(
        path.join(__dirname, "../assets/certificate.png"),
        0,
        0,
        { width: pageWidth, height: pageHeight }
      );

      /* ---------- Student Name ---------- */
      doc.font("Times-Bold").fontSize(36).fillColor("#1a4ed8");

      const studentText = data.studentName.toUpperCase();
      const studentY = 215;
      const studentWidth = doc.widthOfString(studentText);
      const studentX = (pageWidth - studentWidth) / 2;

      doc.text(studentText, 0, studentY, {
        width: pageWidth,
        align: "center",
      });

      doc
        .moveTo(studentX, studentY + 40)
        .lineTo(studentX + studentWidth, studentY + 40)
        .lineWidth(2)
        .strokeColor("#1a4ed8")
        .stroke();

      /* ---------- Quiz Name & Date ---------- */
      doc.fillColor("#000000").font("Times-Roman").fontSize(24).fillColor("#00008B");

      // Quiz Name
      const quizText = data.quizTitle;
      const quizX = 85;
      const quizY = 305;
      const quizWidth = 250;

      doc.text(quizText, quizX, quizY, {
        width: quizWidth,
        align: "center",
      });

      const quizTextWidth = doc.widthOfString(quizText);
      const quizLineX = quizX + (quizWidth - quizTextWidth) / 2;

      doc
        .moveTo(quizLineX, quizY + 28)
        .lineTo(quizLineX + quizTextWidth, quizY + 28)
        .lineWidth(1.5)
        .strokeColor("#000000")
        .stroke();

      // Date (2px smaller)
      doc.fontSize(22);

      const dateText = data.date;
      const dateX = 430;
      const dateY = 305;
      const dateWidth = 180;

      doc.text(dateText, dateX, dateY, {
        width: dateWidth,
        align: "center",
      });

      const dateTextWidth = doc.widthOfString(dateText);
      const dateLineX = dateX + (dateWidth - dateTextWidth) / 2;

      doc
        .moveTo(dateLineX, dateY + 26)
        .lineTo(dateLineX + dateTextWidth, dateY + 26)
        .lineWidth(1.5)
        .strokeColor("#000000")
        .stroke();

      /* ---------- Position & Score ---------- */
      let posColor = "#000000";
      let posSize = 18;

      if (Number(data.position) === 1) {
        posColor = "#D4AF37";
        posSize = 24;
      } else if (Number(data.position) === 2) {
        posColor = "#C0C0C0";
        posSize = 22;
      } else if (Number(data.position) === 3) {
        posColor = "#CD7F32";
        posSize = 22;
      }

      // Position
      doc.font("Times-Bold").fontSize(posSize).fillColor(posColor);

      const posText = String(data.position);
      const posX = 300;
      const posY = 352;
      const posBoxWidth = 80;

      doc.text(posText, posX, posY, {
        width: posBoxWidth,
        align: "center",
      });

      const posTextWidth = doc.widthOfString(posText);
      const posLineX = posX + (posBoxWidth - posTextWidth) / 2;

      doc
        .moveTo(posLineX, posY + posSize + 6)
        .lineTo(posLineX + posTextWidth, posY + posSize + 6)
        .lineWidth(1.5)
        .strokeColor(posColor)
        .stroke();

      // Score
      doc.font("Times-Bold").fontSize(18).fillColor(posColor);

      const scoreText = `${data.score}/${data.totalMarks}`;
      const scoreX = 440;
      const scoreY = 352;
      const scoreBoxWidth = 120;

      doc.text(scoreText, scoreX, scoreY, {
        width: scoreBoxWidth,
        align: "center",
      });

      const scoreTextWidth = doc.widthOfString(scoreText);
      const scoreLineX = scoreX + (scoreBoxWidth - scoreTextWidth) / 2;

      doc
        .moveTo(scoreLineX, scoreY + 24)
        .lineTo(scoreLineX + scoreTextWidth, scoreY + 24)
        .lineWidth(1.5)
        .strokeColor(posColor)
        .stroke();

      /* ---------- Faculty ---------- */
      doc.fillColor("#000000");

      doc.font("Times-Bold").fontSize(18)
        .text(data.facultyName, 90, 410, { width: 200, align: "center" });

      doc.font("Times-Roman").fontSize(16)
        .text(data.facultyDesignation, 90, 430, { width: 200, align: "center" });

      doc.font("Times-Roman").fontSize(13)
        .text(data.facultyDepartment, 90, 450, { width: 200, align: "center" });

      /* ---------- HOD ---------- */
      doc.font("Times-Bold").fontSize(18)
        .text(data.HODName, 470, 410, { width: 200, align: "center" });

      doc.font("Times-Roman").fontSize(16)
        .text(data.HODDesignation, 470, 430, { width: 200, align: "center" });

      doc.font("Times-Roman").fontSize(13)
        .text(data.HODDepartment, 470, 450, { width: 200, align: "center" });

      /* ---------- Certificate ID ---------- */
      doc.font("Times-Roman").fontSize(12).fillColor("#444444")
        .text(uniqueCertificateId, 165, 515);

      doc.end();

      writeStream.on("finish", () => resolve(filePath));
      writeStream.on("error", err => reject(err));
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = generateCertificatePDF;
