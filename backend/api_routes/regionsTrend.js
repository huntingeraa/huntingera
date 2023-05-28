import express from 'express';
const router = express.Router();
import googleTrends from 'google-trends-api'

router.get("/:keyword/:country", async (req, res) => {
    try {
      const options = {
        keyword: req.params.keyword,
        geo: req.params.country,
      };
      googleTrends.interestByRegion(options).then((results) => {
        const data = JSON.parse(results).default.geoMapData;
        if (!data || data.length === 0) {
          console.log("No search data available for the regions of the specified country for the given keyword.");
          res.status(404).send("No search data available for the regions of the specified country for the given keyword.");
          return;
        }
        const total = data.reduce((acc, d) => acc + d.value, 0);
        const final = [["Region", "Percentage"]];
        data.slice(0, 12).forEach((d) => {
          final.push([d.geoName, parseFloat(d.value)]);
        });
        res.json(final);
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("An error occurred while processing the request.");
    }
  });

  export default router;