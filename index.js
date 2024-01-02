const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/getAmazonProductDetails', async (req, res) => {
  try {
    const query = req.query.productQuery || 'Phone';
    const page = req.query.page || '1'; // Default to page 1 if not provided

    const options = {
      method: 'GET',
      url: 'https://real-time-amazon-data.p.rapidapi.com/search',
      params: {
        query,
        page,
        country: 'IN',
        category_id: 'aps',
      },
      headers: {
        'X-RapidAPI-Key': 'd9d53fd757mshbd3d495dfd7cae2p19c368jsne8158af1cef2',
        'X-RapidAPI-Host': 'real-time-amazon-data.p.rapidapi.com',
      },
    };

    const response = await axios.request(options);
    const productDetails = response.data;

    res.json(productDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
