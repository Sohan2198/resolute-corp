const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// API endpoint for file upload and email sending
app.post('/api/upload', upload.single('fileInput'), async (req, res) => {
  const { file } = req;
  const {
    candidateCode,
    candidateType,
    candidateName,
    candidateLastName,
    age,
    birthDate,
    gender,
    email,
    title,
    ReferenceSP,
    ReferenceSM,
    ReferenceEC,
    status,
    lastPosition
  } = req.body; // Get all candidate details

  // Validate required fields
  if (!file || !candidateName || !candidateLastName || !email) {
    return res.status(400).json({ success: false, message: 'File, name, and email are required!' });
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email, // Use candidate's email from the form
      subject: `File Submission from ${candidateName} ${candidateLastName}`,
      text: `Hello ${candidateName},\n\nThank you for your submission. Here are the details you provided:\n\n` +
            `Candidate Code: ${candidateCode}\n` +
            `Candidate Type: ${candidateType}\n` +
            `Name: ${candidateName} ${candidateLastName}\n` +
            `Age: ${age}\n` +
            `Birth Date: ${birthDate}\n` +
            `Gender: ${gender}\n` +
            `Title: ${title}\n` +
            `Reference Staffing Partner: ${ReferenceSP}\n` +
            `Reference Social Media: ${ReferenceSM}\n` +
            `Reference Employee Code: ${ReferenceEC}\n` +
            `Status: ${status}\n` +
            `Last Position: ${lastPosition}\n\n` +
            `Please find the attached file.\n\nBest regards,`,
      attachments: [
        {
          filename: file.originalname,
          path: path.join(__dirname, 'uploads', file.filename),
        },
      ],
    };

    // Send email with attachment
    await transporter.sendMail(mailOptions);

    // Respond with success
    res.json({ success: true, message: 'File sent successfully' });

    // Clean up the file from server after sending
    fs.unlinkSync(path.join(__dirname, 'uploads', file.filename));
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Error sending file', error: error.message });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});