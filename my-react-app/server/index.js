const cors = require('cors');
const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.post('/test', (req, res) => {
  res.send('POST request to /test successful');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});