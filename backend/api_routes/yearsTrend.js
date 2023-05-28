import express from 'express';
const router = express.Router();
import googleTrends from 'google-trends-api'

router.get("/:keyword/:country", async (req, res) => {

    try {
  
        //console.log('reached')
        var result = [];
        googleTrends.interestOverTime({
                keyword: req.params.keyword,
                geo : req.params.country,
            })
            .then(function(results) {
                // console.log((JSON.parse(results).default.timelineData[0]));
  
                JSON.parse(results).default.timelineData.map((data, i) => {
                    result.push({
                        'date': data.formattedTime,
                        'value': data.value[0]
                    })
  
                })
                var final = new Array(result.length + 1);
                final[0] = new Array(2);
                final[0][0] = "Years";
                final[0][1] = req.params.keyword;
                for (var i = 1; i < final.length; i++) {
                    final[i] = new Array(2);
                    final[i][0] = result[i - 1] && result[i - 1].date ? result[i - 1].date : "";
                    final[i][1] = result[i - 1] && result[i - 1].value;
                }
                res.json(final)
  
            })
  
    } catch (err) {
        console.log(err)
    }
  })

  export default router;