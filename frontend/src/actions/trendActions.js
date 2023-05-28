import axios from 'axios'
import * as RNLocalize from "react-native-localize";
const domain = "http://localhost:5000"
//const domain = "https:apigoogletrends.herokuapp.com"
export const trendD = (trend, countryselected) => async (dispatch) => {
    try {
        dispatch({
            type: 'SENDING'
        })
        console.log('dispatched')
        const country = countryselected;

        const result = await axios.get(`${domain}/api/yearsTrend/${trend}/${country}`)
        // const result2 = await axios.get(`${domain}/${trend2}`)
        // console.log(result.data)
        dispatch({
            type: 'TREND_RECEIVED',
            payload: result.data
        });
    } catch (error) {

        if (error.response) {


            console.log(error.response.data.errors);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            /*
             * The request was made but no response was received, `error.request`
             * is an instance of XMLHttpRequest in the browser and an instance
             * of http.ClientRequest in Node.js
             */
            console.log(error.request);
        } else {

            console.log("Error", error.message);
        }
        console.log(error);

        dispatch({
            type: 'TREND_ERROR',
        });
    }
};

export const trendMD = (trend, countryselected) => async (dispatch) => {
    try {
        dispatch({
            type: 'SENDING'
        })
        console.log('dispatched')
        const country = countryselected;

        const result = await axios.get(`${domain}/api/monthTrend/${trend}/${country}`)
        // const result2 = await axios.get(`${domain}/${trend2}`)
        // console.log(result.data)
        dispatch({
            type: 'TREND_RECEIVED',
            payload: result.data
        });
    } catch (error) {

        if (error.response) {


            console.log(error.response.data.errors);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            /*
             * The request was made but no response was received, `error.request`
             * is an instance of XMLHttpRequest in the browser and an instance
             * of http.ClientRequest in Node.js
             */
            console.log(error.request);
        } else {

            console.log("Error", error.message);
        }
        console.log(error);

        dispatch({
            type: 'TREND_ERROR',
        });
    }
};

export const trendPD = (trend,countryselected) => async (dispatch) => {
    try {
        dispatch({
            type: 'SENDING'
        })
        console.log('dispatched')
        const country = countryselected;


        const result = await axios.get(`${domain}/api/hourTrend/${trend}/${country}`)
        //const result1 = await axios.get(`${domain}/${trend}/${country}/regions`)
        // const result2 = await axios.get(`${domain}/${trend2}`)
        //console.log(result1.data)
        dispatch({
            type: 'TREND_RECEIVED',
            payload: result.data
        });
    } catch (error) {

        if (error.response) {


            console.log(error.response.data.errors);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            /*
             * The request was made but no response was received, `error.request`
             * is an instance of XMLHttpRequest in the browser and an instance
             * of http.ClientRequest in Node.js
             */
            console.log(error.request);
        } else {

            console.log("Error", error.message);
        }
        console.log(error);

        dispatch({
            type: 'TREND_ERROR',
        });
    }
};

export const trendR = (trend,countryselected) => async (dispatch) => {
    try {
        dispatch({
            type: 'RTRENDING'
        })
        console.log('dispatched')
        const country = countryselected;


       // const result = await axios.get(`${domain}/${trend}/${country}/exact/past`)
        const result1 = await axios.get(`${domain}/api/regionsTrend/${trend}/${country}`)
        //const result2= await axios.get(`${domain}/${trend}/${country}/related-queries`)
        // const result2 = await axios.get(`${domain}/${trend2}`)
        //console.log(result2)
        dispatch({
            type: 'RTRENDING_RECEIVED',
            payload: result1.data
        });
    } catch (error) {

        if (error.response) {


            console.log(error.response.data.errors);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            /*
             * The request was made but no response was received, `error.request`
             * is an instance of XMLHttpRequest in the browser and an instance
             * of http.ClientRequest in Node.js
             */
            console.log(error.request);
        } else {

            console.log("Error", error.message);
        }
        console.log(error);

        dispatch({
            type: 'RTRENDING_ERROR',
        });
    }
};

export const trendQ = (trend,countryselected) => async (dispatch) => {
    try {
        dispatch({
            type: 'QTRENDING'
        })
        console.log('dispatched')
        const country = countryselected;


       // const result = await axios.get(`${domain}/${trend}/${country}/exact/past`)
        //const result1 = await axios.get(`${domain}/${trend}/${country}/regions`)
        const result2= await axios.get(`${domain}/api/relatedTrend/${trend}/${country}`)
        // const result2 = await axios.get(`${domain}/${trend2}`)
        console.log(result2.data)
        dispatch({
            type: 'QTRENDING_RECEIVED',
            payload: result2.data
        });
    } catch (error) {

        if (error.response) {


            console.log(error.response.data.errors);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            /*
             * The request was made but no response was received, `error.request`
             * is an instance of XMLHttpRequest in the browser and an instance
             * of http.ClientRequest in Node.js
             */
            console.log(error.request);
        } else {

            console.log("Error", error.message);
        }
        console.log(error);

        dispatch({
            type: 'QTRENDING_ERROR',
        });
    }
};

export const getTrending = (countryselected) => async (dispatch) => {
    try {
        dispatch({
            type: 'TRENDING'
        })
        console.log('dispatched')
        const country = countryselected;

        const result = await axios.get(`${domain}/api/dailyTrend/${country}`)
        //const results = await axios.get(`${domain}/handbags/stores`)
          
        // const result2 = await axios.get(`${domain}/${trend2}`)
        // console.log(JSON.parse(result.data).default.trendingSearchesDays[0].trendingSearches)
        dispatch({
            type: 'TRENDING_RECEIVED',
            payload: result.data
        });
    } catch (error) {

        if (error.response) {


            console.log(error.response.data.errors);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            /*
             * The request was made but no response was received, `error.request`
             * is an instance of XMLHttpRequest in the browser and an instance
             * of http.ClientRequest in Node.js
             */
            console.log(error.request);
        } else {

            console.log("Error", error.message);
        }
        console.log(error);

        dispatch({
            type: 'TRENDING_ERROR',
        });
    }
};

export const getCompetitors = (searchTerm) => async (dispatch) => {
    try {
        dispatch({
            type: 'CTRENDING'
        })
        console.log('dispatched')

        const result4 = await axios.get(`${domain}/api/competitorsTop/${searchTerm}`)
        dispatch({
            type: 'CTRENDING_RECEIVED',
            payload: result4.data
        });
    } catch (error) {

        if (error.response) {


            console.log(error.response.data.errors);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            /*
             * The request was made but no response was received, `error.request`
             * is an instance of XMLHttpRequest in the browser and an instance
             * of http.ClientRequest in Node.js
             */
            console.log(error.request);
        } else {

            console.log("Error", error.message);
        }
        console.log(error);

        dispatch({
            type: 'CTRENDING_ERROR',
        });
    }
};