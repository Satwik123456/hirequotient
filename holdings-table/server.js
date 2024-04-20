const express = require('express');
const axios = require('axios');

const app = express();
const port = 5000;

app.get('/api/holdings', async (req, res) => {
  try {
    const response = await axios.get('https://canopy-frontend-task.now.sh/api/holdings');
    res.json(response.data.payload);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
