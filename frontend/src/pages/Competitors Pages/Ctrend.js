import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import {getCompetitors} from '../../actions/trendActions'
import { connect} from "react-redux";
import {PropTypes} from 'prop-types'
import 'react-dropdown/style.css';

const Ctrend = ({ result4, cdailyTrending }) => {
  const { keyword } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCompetitors(keyword));
  }, [dispatch, keyword]);
  console.log(result4)
  return (
    <>
    <div className="container">
    <h2 className="display-5" style={{"textAlign":"center"}}>Competitors Selling Search Products</h2>
  <p>Top 10 reults from Google Listed Below (You can check traffic Of there sites using SImilarweb
    etc to better understand your Competitors)
  </p>
  </div>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Store Names</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {result4 && result4.map((row, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{row.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</td>
            <td>{row.collection ? row.collection : 'All'}</td>
            <td>
              <Button variant="primary" size="sm" className="mr-2" onClick={() => window.open(row.url, '_blank')}>Visit</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table></>
  );
};

Ctrend.propTypes = {
  trendD:PropTypes.func.isRequired,
  sending:PropTypes.bool.isRequired,
  dailyTrending:PropTypes.bool.isRequired,
  rtrending:PropTypes.bool.isRequired,
  result4:PropTypes.array.isRequired,
  cdailyTrending:PropTypes.bool.isRequired,
  getTrending:PropTypes.func.isRequired,
  keyArr:PropTypes.array.isRequired
  }
  
  const mapStateToProps = (state) => ({
   sending:state.trend.sending,
   dailyTrending:state.trend.dailyTrending,
   rtrending:state.trend.rtrending,
   qtrending:state.trend.qtrending,
   result4:state.trend.result4,
   cdailyTrending:state.trend.cdailyTrending,
  keyArr:state.trend.keyArr
   });
  export default connect(mapStateToProps, {
   getCompetitors
  })(Ctrend);
