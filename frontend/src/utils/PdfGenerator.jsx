import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

const generateResumePDF = async (resumeData) => {
  try {
    const { personalInfo, skills, experience, education, tools } = resumeData;

    // Create new document
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    // Set document properties
    doc.setProperties({
      title: `${personalInfo.name} - Resume`,
      author: personalInfo.name,
      subject: "Resume",
      keywords: "resume, cv, portfolio"
    });

    // Define improved colors
    const colors = {
      primary: [41, 128, 185],      // More professional blue
      secondary: [52, 73, 94],      // Dark slate
      accent: [26, 188, 156],       // Teal accent
      light: [236, 240, 241],       // Lighter background
      white: [255, 255, 255],
      text: [68, 68, 68],           // Softer text color
      background: [250, 252, 254]   // Very subtle blue background
    };

    // Set document-wide background
    doc.setFillColor(...colors.background);
    doc.rect(0, 0, 210, 297, 'F');

    // --- HEADER AREA ---
    // Create gradient-like header with multiple color bands for more visual interest
    const headerGradientColors = [
      [33, 118, 174],  // Slightly darker blue
      [37, 123, 180],
      [41, 128, 185],  // Primary blue
      [45, 134, 191],
      [50, 140, 198]   // Slightly lighter blue
    ];

    const bandHeight = 7;
    headerGradientColors.forEach((color, index) => {
      doc.setFillColor(...color);
      doc.rect(0, index * bandHeight, 210, bandHeight, 'F');
    });

    // Modern accent shape
    doc.setFillColor(...colors.accent);
    doc.rect(170, 0, 40, 35, 'F');

    // Create polygon accent for visual interest
    doc.setFillColor(...colors.secondary);
    const triangleX = [160, 210, 210];
    const triangleY = [0, 0, 20];
    doc.triangle(triangleX[0], triangleY[0], triangleX[1], triangleY[1], triangleX[2], triangleY[2], 'F');

    // --- HEADER CONTENT ---
    // Profile information
    doc.setFontSize(28);
    doc.setTextColor(...colors.white);
    doc.setFont("helvetica", "bold");
    doc.text(personalInfo.name.toUpperCase(), 20, 17);

    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text(personalInfo.title, 20, 25);

    // Add contact section with modern styling
    const contactY = 45;

    // Add subtle divider
    doc.setDrawColor(...colors.light);
    doc.setLineWidth(0.75);
    doc.line(15, 38, 195, 38);

    const loadIcons = async () => {
      const iconSize = 5;
      const iconYOffset = 1;
      const textYOffset = 4.5;
      const textGap = 3;

      const icons = [
        { src: personalInfo.email.icon, x: 20, y: contactY + iconYOffset, text: personalInfo.email.text },
        { src: personalInfo.phone.icon, x: 85, y: contactY + iconYOffset, text: personalInfo.phone.text },
        { src: personalInfo.location.icon, x: 150, y: contactY + iconYOffset, text: personalInfo.location.text }
      ];

      for (const icon of icons) {
        try {
          const img = new Image();
          img.src = icon.src;
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
          });

          doc.addImage(img, 'PNG', icon.x, icon.y, iconSize, iconSize);

          doc.setFontSize(9);
          doc.setTextColor(...colors.secondary);
          doc.setFont("helvetica", "bold");
          doc.text(icon.text, icon.x + iconSize + textGap, contactY + textYOffset, {
            baseline: 'middle'
          });
        } catch (error) {
          console.error(`Error adding icon for ${icon.text}:`, error);
          doc.text(icon.text, icon.x, contactY + textYOffset, { baseline: 'middle' });
        }
      }
    };

    await loadIcons();

    if (personalInfo.photo) {
      try {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = personalInfo.photo;

        await new Promise((resolve) => {
          img.onload = resolve;
        });

        // Create circular cropped version
        const canvas = document.createElement('canvas');
        const size = 400;  // Bigger crop size for better resolution
        canvas.width = size;
        canvas.height = size;

        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, 0, 0, size, size);

        const circularImage = canvas.toDataURL('image/png');

        // PDF drawing settings
        const centerX = 180;
        const centerY = 17;
        const outerRadius = 13;  // Smaller background circle
        const imageSize = 24;    // Larger image inside

        // Primary color palette
        const primaryColor = { r: 30, g: 110, b: 165 };

        // Draw colored background circle
        doc.setFillColor(primaryColor.r, primaryColor.g, primaryColor.b);
        doc.circle(centerX, centerY, outerRadius, 'F');

        // Add the circular image
        doc.addImage(circularImage, 'PNG', centerX - (imageSize / 2), centerY - (imageSize / 2), imageSize, imageSize);

      } catch (error) {
        console.error("Error adding profile image:", error);
      }
    }



    // --- CONTENT SECTIONS ---
    const addSectionHeader = (title, yPos) => {
      // More elegant section headers with left accent
      doc.setFillColor(...colors.primary);
      doc.rect(15, yPos - 7, 3, 20, 'F');

      doc.setFillColor(...colors.light);
      doc.rect(18, yPos - 4, 177, 14, 'F');

      doc.setFontSize(14);
      doc.setTextColor(...colors.secondary);
      doc.setFont("helvetica", "bold");
      doc.text(title, 24, yPos + 2);
    };

    let yPosition = 62;

    // Summary
    addSectionHeader("SUMMARY", yPosition);
    yPosition += 12;

    doc.setFontSize(10);
    doc.setTextColor(...colors.text);
    doc.setFont("helvetica", "normal");
    const summaryLines = doc.splitTextToSize(personalInfo.summary, 175);
    doc.text(summaryLines, 20, yPosition + 5);

    yPosition += 15 + (summaryLines.length * 5);

    // Experience
    addSectionHeader("PROFESSIONAL EXPERIENCE", yPosition);
    yPosition += 12;

    // Add vertical timeline for experience
    doc.setDrawColor(...colors.accent);
    doc.setLineWidth(1);
    doc.line(30, yPosition, 30, yPosition + (experience.length * 35));

    experience.forEach((exp, index) => {
      if (yPosition > 260) {
        doc.addPage();
        yPosition = 20;

        // Continue timeline on new page
        doc.setDrawColor(...colors.accent);
        doc.setLineWidth(1);
        doc.line(30, yPosition, 30, yPosition + (experience.length * 35));
      }

      // Timeline node
      doc.setFillColor(...colors.primary);
      doc.circle(30, yPosition + 5, 3, 'F');

      // Position with emphasis
      doc.setFontSize(12);
      doc.setTextColor(...colors.secondary);
      doc.setFont("helvetica", "bold");
      doc.text(exp.position, 40, yPosition + 5);

      // Company with subtle background
      doc.setFillColor(...colors.light);
      doc.roundedRect(40, yPosition + 8, 150, 12, 1, 1, 'F');

      doc.setFontSize(10);
      doc.setTextColor(...colors.primary);
      doc.setFont("helvetica", "bold");
      doc.text(`${exp.company}`, 45, yPosition + 15);

      // Period with emphasis
      doc.setTextColor(...colors.secondary);
      doc.setFont("helvetica", "italic");
      doc.text(`${exp.period || exp.duration}`, 120, yPosition + 15);

      // Description with proper indentation
      doc.setFontSize(9);
      doc.setTextColor(...colors.text);
      doc.setFont("helvetica", "normal");
      const descLines = doc.splitTextToSize(exp.description, 155);
      doc.text(descLines, 40, yPosition + 24);

      yPosition += 25 + (descLines.length * 5);
    });

    // Education
    yPosition += 5;
    if (yPosition > 260) {
      doc.addPage();
      yPosition = 20;
    }

    addSectionHeader("EDUCATION", yPosition);
    yPosition += 12;

    const eduColumns = 2;
    const eduWidth = 80;
    const eduGap = 10;

    education.forEach((edu, index) => {
      const rowIndex = Math.floor(index / eduColumns);
      if (yPosition + (rowIndex * 30) > 260) {
        doc.addPage();
        yPosition = 20;
      }

      const colIndex = index % eduColumns;
      const xPos = 20 + (colIndex * (eduWidth + eduGap));
      const yPos = yPosition + (rowIndex * 30);

      // More polished education card
      doc.setFillColor(...colors.light);
      doc.roundedRect(xPos, yPos - 5, eduWidth, 25, 3, 3, 'F');

      // Add accent bar
      doc.setFillColor(...colors.primary);
      doc.rect(xPos, yPos - 5, 3, 25, 'F');

      doc.setFontSize(11);
      doc.setTextColor(...colors.secondary);
      doc.setFont("helvetica", "bold");
      const degreeText = doc.splitTextToSize(edu.degree, eduWidth - 10);
      doc.text(degreeText[0], xPos + 7, yPos);

      doc.setFontSize(9);
      doc.setTextColor(...colors.primary);
      doc.setFont("helvetica", "bold");
      const institutionLines = doc.splitTextToSize(edu.institution, eduWidth - 10);
      doc.text(institutionLines[0], xPos + 7, yPos + 7);

      // Add year in a chip-style design
      doc.setFillColor(...colors.secondary);
      doc.roundedRect(xPos + 7, yPos + 12, 20, 6, 2, 2, 'F');

      doc.setFontSize(8);
      doc.setTextColor(...colors.white);
      doc.setFont("helvetica", "normal");
      doc.text(edu.year, xPos + 17, yPos + 16, {
        align: 'center',
        baseline: 'middle'
      });
    });

    yPosition += 30 * Math.ceil(education.length / eduColumns) + 5;

    // Skills
    if (yPosition > 260) {
      doc.addPage();
      yPosition = 20;
    }

    addSectionHeader("SKILLS", yPosition);
    yPosition += 12;

    if (skills.length > 0) {
      // More elegant skills header
      doc.setFillColor(...colors.light);
      doc.rect(20, yPosition - 5, 170, 10, 'F');

      doc.setFillColor(...colors.primary);
      doc.rect(20, yPosition - 5, 3, 10, 'F');

      doc.setFontSize(10);
      doc.setTextColor(...colors.secondary);
      doc.setFont("helvetica", "bold");
      doc.text("Skill", 30, yPosition);
      doc.text("Proficiency", 125, yPosition);

      yPosition += 10;

      skills.forEach((skill, index) => {
        if (yPosition + (index * 12) > 260) {
          doc.addPage();
          yPosition = 20;

          // Repeat skills header on new page
          doc.setFillColor(...colors.light);
          doc.rect(20, yPosition - 5, 170, 10, 'F');

          doc.setFillColor(...colors.primary);
          doc.rect(20, yPosition - 5, 3, 10, 'F');

          doc.setFontSize(10);
          doc.setTextColor(...colors.secondary);
          doc.setFont("helvetica", "bold");
          doc.text("Skill", 30, yPosition);
          doc.text("Proficiency", 125, yPosition);

          yPosition += 10;
        }

        const rowY = yPosition + (index * 12);

        // Alternate row colors
        if (index % 2 === 0) {
          doc.setFillColor(245, 249, 252);
          doc.rect(20, rowY - 5, 170, 10, 'F');
        }

        doc.setFontSize(9);
        doc.setTextColor(...colors.text);
        doc.setFont("helvetica", "normal");
        doc.text(skill.name, 30, rowY);

        const percentage = skill.percentage || skill.level;
        doc.text(`${percentage}%`, 125, rowY);

        // More modern progress bar
        doc.setFillColor(236, 240, 241);
        doc.roundedRect(145, rowY - 2, 40, 4, 2, 2, 'F');

        doc.setFillColor(...colors.accent);
        // Ensure minimum visible width for very small percentages
        const barWidth = Math.max(40 * (percentage / 100), 2);
        doc.roundedRect(145, rowY - 2, barWidth, 4, 2, 2, 'F');
      });

      yPosition += (skills.length * 12) + 10;
    }

    // Tools
    if (yPosition > 260) {
      doc.addPage();
      yPosition = 20;
    }

    addSectionHeader("TOOLS & TECHNOLOGIES", yPosition);
    yPosition += 12;

    const toolColumns = 3;
    const toolWidth = 55;
    const toolGap = 5;
    const toolHeight = 16;

    tools.forEach((tool, index) => {
      const colIndex = index % toolColumns;
      const rowIndex = Math.floor(index / toolColumns);
      const xPos = 20 + (colIndex * (toolWidth + toolGap));
      const yPos = yPosition + (rowIndex * (toolHeight + 8));

      // Modern pill-shaped tool tags
      doc.setFillColor(...colors.light);
      doc.roundedRect(xPos, yPos, toolWidth, toolHeight, 8, 8, 'F');

      // Add colored accent
      doc.setFillColor(...colors.primary);
      doc.circle(xPos + 8, yPos + toolHeight/2, 3, 'F');

      doc.setFontSize(9);
      doc.setTextColor(...colors.secondary);
      doc.setFont("helvetica", "normal");
      doc.text(tool.name, xPos + 16, yPos + toolHeight/2, {
        baseline: 'middle'
      });
    });

    // Footer with contact information on every page
    const pageCount = doc.internal.getNumberOfPages();

    // Pre-load QR code if available
    let qrCodeImg = null;
    if (personalInfo.qrCode) {
      try {
        const img = new Image();
        img.src = personalInfo.qrCode;
        await new Promise((resolve) => {
          img.onload = resolve;
        });
        qrCodeImg = img;
      } catch (error) {
        console.error("Error loading QR code:", error);
      }
    }

    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);

      // Colored footer background
      doc.setFillColor(...colors.light);
      doc.rect(0, 272, 210, 25, 'F');

      // Top border for footer
      doc.setFillColor(...colors.primary);
      doc.rect(0, 272, 210, 1, 'F');

      // Professional contact information in footer
      // Fixed sample data - replace with actual data from resume or parameters
      const footerName = personalInfo.name || "Elias Hagos";
      const footerInstitution = "Business College Helsinki, Full Stack Web Developer";
      const footerEmail = personalInfo.email?.text || "eliasars@yahoo.com";
      const footerGithub = "https://github.com/nahusenayElias";
      const footerPhone = personalInfo.phone?.text || "Tel. 01234567";

      // First line: Name and institution
      doc.setFontSize(8);
      doc.setTextColor(...colors.secondary);
      doc.setFont("helvetica", "bold");
      doc.text(`${footerName} | ${footerInstitution}`, 15, 278);

      // Second line: Contact details
      doc.setFontSize(7);
      doc.setTextColor(...colors.text);
      doc.setFont("helvetica", "normal");
      doc.text(`${footerEmail} | ${footerGithub} | ${footerPhone}`, 15, 283);

      // Page number
      doc.setFontSize(7);
      doc.setTextColor(...colors.secondary);
      doc.setFont("helvetica", "italic");
      doc.text(`Page ${i} of ${pageCount}`, 105, 290, { align: 'center' });

      // Add QR code to every page
      if (qrCodeImg) {
        const qrSize = 18;

        // QR code container
        doc.setFillColor(...colors.white);
        doc.roundedRect(175, 275, qrSize, qrSize, 2, 2, 'F');

        doc.setDrawColor(...colors.primary);
        doc.setLineWidth(0.5);
        doc.roundedRect(175, 275, qrSize, qrSize, 2, 2, 'S');

        // Add QR code image
        doc.addImage(qrCodeImg, 'PNG', 175, 275, qrSize, qrSize);

        // QR code caption
        doc.setFontSize(6);
        doc.setTextColor(...colors.secondary);
        doc.text("Scan for portfolio", 184, 296, { align: 'center' });
      }
    }

    doc.save(`${personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`);
    return true;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
};

export default generateResumePDF;