const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 4000; // or any port you prefer

app.use(cors());

app.post('/login', async (req, res) => {
  try {
    const response = await axios.post('http://optima-software-solutions.com/apis/login.php', req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
