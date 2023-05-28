import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import Chart from 'react-google-charts'
import { connect} from "react-redux";
import {trendD, trendPD, trendMD, trendR, trendQ} from '../../actions/trendActions' 
import {PropTypes} from 'prop-types'
import loading from '../../loading.gif'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Table from './Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const options3 = [
  'Past Hour', 'Past Month', 'Past Years'
];
const options5 = [
  'US', 'AU', 'CA', 'FR', 'PK'
];

const Strend = ({sending, result, getTrending, result1, result2}) => {
    const { keyword } = useParams();
    const [option4, setOption4] = useState({ hour: 'Past Hour' });
    const [option6, setOption6] = useState({ country: 'US' });
    const dispatch = useDispatch();
    useEffect(() => {
      if (option4.hour === 'Past Hour') {
        dispatch(trendPD(keyword, option6.country));
      }  if (option4.hour === 'Past Month'){
        dispatch(trendMD(keyword, option6.country));
      }
      if (option4.hour === 'Past Years'){
        dispatch(trendD(keyword, option6.country));
      }
      dispatch(trendR(keyword, option6.country));
      dispatch(trendQ(keyword, option6.country));
    }, [dispatch, keyword, option4, option6]);
  
  useEffect(()=>{
   // console.log('Hello')
   async function getTrend(){
    await getTrending();
   }
    getTrend()

   
   },[getTrending])
   
  const [trend1,settrend1] = useState({
   trending1:''
  })
  const {trending1} = trend1;

  const [trend2,settrend2] = useState({
    trending2:''
   })
   const {trending2} = trend2;
  const data = result.length == 0 || result.length==1 ? [[1,1,1,1]]: result;
  const options = {
    title: "Trend Comparison",
    curveType: "function",
    legend: { position: "bottom" }
  };

  const optionsss = {
    title: 'Percentage by Region',
    hAxis: {
      title: 'Percentage',
    },
    vAxis: {
      title: 'Region',
      minValue: 1, // set the minimum value to 1
    },
    legend: { position: 'none' },
  };
  

  const options2 = [
    'Line Chart', 'Scatter Chart'
  ];
  
  const defaultOption = options2[0];
  const defaultOption1 = options3[0];
  const defaultOption2 = options5[0];
  const[option,setOption] = useState({
    chart:'Line Chart'
  })

const {chart} = option;
  return (
    <Fragment>
      <div className="container">
    <div className="jumbotron jumbotron-fluid">
  <div className="container">
    <h1 className="display-4" style={{"textAlign":"center"}}>Google Trend of Search Keyword</h1>
 
  </div>
</div>
<div className ="row">
<div className="col-md-10 col-sm-12">
     
     <div style={{"textAlign":"center"}}>
      <Dropdown  className = "btn btn-light" style={{width:'fit-content !important'}} onChange = {(e)=>{setOption({
        ...option,
        chart:e.value
      })}} options={options2}  value={defaultOption} placeholder="Select chart"></Dropdown>
       <Dropdown  className = "btn btn-light" style={{width:'fit-content !important'}} onChange = {(e)=>{setOption4({
        ...option4,
        hour:e.value
      })}} options={options3}  value={defaultOption1} placeholder="Select time"></Dropdown>
      <Dropdown  className = "btn btn-light" style={{width:'fit-content !important'}} onChange = {(e)=>{setOption6({
        ...option6,
        country:e.value
      })}} options={options5}  value={defaultOption2} placeholder="Select time"></Dropdown>
      </div>
      </div>
     </div>
     
     
     
      <Container>
        <Row>
          <Col md={9}>
      <div style={{"textAlign":"center", "margin":"20px"}}>
{sending ? <img src = {loading} /> : 

result.length ==1  && result[0] && result[0].length ? <h1>No comparisons found</h1>:
<div>
{data.length>1 ?
chart=='Line Chart' ? <Chart
chartType="LineChart"
width="100%"
height="400px"
data={data}
options={options}
/>: <Chart
chartType="ScatterChart"
width="100%"
height="100%"
data={data}
options={options}
legendToggle
/>:null}
      </div>}
      <div style={{"textAlign":"center", "margin":"30px"}}>
      <Chart
      chartType="BarChart"
      width="100%"
      height="400px"
      data={result1}
      options={optionsss}
    />
      </div>
     
</div>
</Col>
<Col className="mr-18">
<div style={{"alignItem":"right", "margin":"0px"}}>
      <Table data={result2} /> 
      </div>
      </Col>
</Row>
</Container>

     
</div>
</Fragment>
  );
}
Strend.propTypes = {
trendD:PropTypes.func.isRequired,
sending:PropTypes.bool.isRequired,
result1:PropTypes.array.isRequired,
qtrending:PropTypes.bool.isRequired,
result2:PropTypes.array.isRequired,
result:PropTypes.array.isRequired,
getTrending:PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
 sending:state.trend.sending,
 rtrending:state.trend.rtrending,
 qtrending:state.trend.qtrending,
 result:state.trend.result,
 result1:state.trend.result1,
 result2:state.trend.result2,
 });
export default connect(mapStateToProps, {
 trendD
})(Strend);