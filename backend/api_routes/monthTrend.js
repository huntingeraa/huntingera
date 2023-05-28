import express from 'express';
const router = express.Router();
import googleTrends from 'google-trends-api'

router.get("/:keyword/:country", async (req, res) => {
    try {
      const now = new Date();
      const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000); // 30 days ago
      const startTime = oneMonthAgo;
      const endTime = now;
  
      const options = {
        keyword: req.params.keyword,
        startTime: startTime,
        endTime: endTime,
        granularTimeResolution: true,
        geo : req.params.country,
      };
  
      googleTrends.interestOverTime(options).then((results) => {
        const data = JSON.parse(results).default.timelineData;
        const final = [["Time", req.params.keyword]];
        data.forEach((d) => {
          const time = new Date(d.time * 1000).toLocaleString();
          final.push([time, d.value[0]]);
        });
        res.json(final);
      });
    } catch (err) {
      console.log(err);
    }
  });
  export default router;