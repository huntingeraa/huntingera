import express from 'express';
const router = express.Router();
import googleTrends from 'google-trends-api'


router.get('/:country', async (req, res) => {
  try {
    var result = []
    await googleTrends.dailyTrends({
      geo: req.params.country
    }).then(function(results) {
      try {
        var arr = JSON.parse(results).default.trendingSearchesDays[0].trendingSearches
        for (var i = 0; i < arr.length; i++) {
          result.push(arr[i].title.query)
        }
        res.json(result)
      } catch (e) {
        res.json([])
      }
    })
  } catch (err) {
    console.log(err)
  }
})

export default router;
