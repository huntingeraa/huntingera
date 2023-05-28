import express from 'express';
const router = express.Router();
import googleTrends from 'google-trends-api'

router.get("/:keyword/:country", async (req, res) => {
    try {
      const options = {
        keyword: req.params.keyword,
        geo: req.params.country,
      };
      const results = await googleTrends.relatedQueries(options);
      const data = JSON.parse(results).default;
      if (!data || data.length === 0) {
        console.log("No related queries available for the specified keyword and country.");
        res.status(404).send("No related queries available for the specified keyword and country.");
        return;
      }
      const final = data.rankedList.reduce((acc, topic) => {
        const topicQueries = topic.rankedKeyword.map((query) => query.query);
        return [...acc, ...topicQueries];
      }, []).slice(0, 18);
      res.json(final);
    } catch (err) {
      console.log(err);
      res.status(500).send("An error occurred while processing the request.");
    }
  });


  export default router;