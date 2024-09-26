const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let messages = [];

// POST: קבלת הודעה מ-Wokwi
app.post('/api/messages', (req, res) => {
  const message = req.body.message;
  if (message) {
    messages.push(message);
    res.status(201).send({ message: 'Message received' });
  } else {
    res.status(400).send({ error: 'Message is required' });
  }
});

// GET: משיכת הודעות ע"י צוות תקשורת
app.get('/api/messages', (req, res) => {
  res.status(200).send(messages);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
