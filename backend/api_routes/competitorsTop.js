import express from 'express';
const router = express.Router();
import { google } from 'googleapis';

// Set up Google Custom Search API client
const customSearch = google.customsearch('v1');
const CX = '616cce7d812d54066';
const API_KEY = 'AIzaSyCCTU5QrUBkdtHiUZEzQyBgC3uM-wkoPfQ';

router.get('/:searchTerm', async (req, res) => {
  try {
    const searchTerm = req.params.searchTerm;
    let category = req.params.category || '';
    
    // Use Google Custom Search API to get search results
    const response = await customSearch.cse.list({
      cx: CX,
      q: `${searchTerm} ${category} site:myshopify.com`,
      auth: API_KEY,
      num: 10,
    });
    
    const results = response.data.items.map(item => {
      const url = item.link;
      const regex = /https?:\/\/([^.]+)\.myshopify\.com\/.*$/;
      const match = regex.exec(url);
      const storeName = item.title; // Extract the store name from the search result title
      const store = match ? match[1] : '';
      const collectionRegex = /https?:\/\/.+\.myshopify\.com\/collections\/(.+)/;
      const collectionMatch = collectionRegex.exec(url);
      const collection = collectionMatch ? collectionMatch[1] : '';
      if (!category || category.toLowerCase() === collection.toLowerCase()) { // Only add the result if category is empty or matches the collection
        return { name: store, collection: collection, url: url };
      }
      return null;
    }).filter(item => item != null);
    res.json(results);
  } catch (err) {
    console.log(err);
  }
});

export default router;