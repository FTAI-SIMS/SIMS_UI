const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = 4000; // You can change this port if needed

app.use(cors()); // Allow all origins

// Proxy endpoint
app.get('/sheets', async (req, res) => {
  const { spreadsheetId, sheetName, apiKey } = req.query;
  if (!spreadsheetId || !sheetName || !apiKey) {
    return res.status(400).json({ error: 'Missing required query parameters.' });
  }

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}&majorDimension=ROWS`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Google Sheets proxy running on http://localhost:${PORT}`);
});