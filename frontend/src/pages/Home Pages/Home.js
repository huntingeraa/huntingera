import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import {trendData, getTrending} from '../../actions/trendActions' 
import {PropTypes} from 'prop-types'
import loading from '../../loading.gif'
import 'react-dropdown/style.css';
import searchImg from "../../images/img3.gif";
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

const CustomToggle = React.forwardRef(({ onClick, country }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {country}
    &#x25bc;
  </a>
));


const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <Form.Control
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value),
          )}
        </ul>
      </div>
    );
  },
);
const Home = ({dailyTrending, getTrending,keyArr}) => {
  const [selectedCountry, setSelectedCountry] = useState();
  const [image, setImage]= useState('true');
  useEffect(() => {
    async function getTrend() {
      await getTrending(selectedCountry);
    }
    getTrend();
  }, [getTrending, selectedCountry]);
  
  return (
    <Fragment>
        <Container>
        <Row>
        
<Col lg="6" md="6">
<div className="search__img">
              <img src={searchImg} alt="" className="w-100" />
            </div>
</Col>
          <Col lg="6" md="6">
    <div className="container">
<div className ="row">
<div className="col-md-12 col-sm-12">
<h4 className="section__subtitle" >Trending Searches</h4><h2 className="section__title">Daily Trending Searches</h2>
<p>{new Date().toLocaleString()}</p>
<p>Please Select in order to View Tending Searches</p>
<p>Select your country:</p>
<Dropdown>
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" country={selectedCountry}/>
                    <Dropdown.Menu>
                    <Dropdown.Item onClick={() => {setSelectedCountry('AU'); setImage(false);}}>Australia</Dropdown.Item>
                      <Dropdown.Item onClick={() => {setSelectedCountry('CA'); setImage(false);}}>Canada</Dropdown.Item>
                      <Dropdown.Item onClick={() => {setSelectedCountry('US'); setImage(false);}}>United States</Dropdown.Item>
                      <Dropdown.Item onClick={() => {setSelectedCountry('FR'); setImage(false);}}>France</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
{image? <img src={loading} style={{width:"200px",height:"200px"}}/>: <div>
<ul>{keyArr.map((x)=> 
 <div><li> {x}</li></div>
)}</ul></div>}
</div>
</div>
</div>
</Col>
        </Row>
      </Container>
</Fragment>
  );
}

Home.propTypes = {
dailyTrending:PropTypes.bool.isRequired,
getTrending:PropTypes.func.isRequired,
keyArr:PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
 dailyTrending:state.trend.dailyTrending,
keyArr:state.trend.keyArr
 });
export default connect(mapStateToProps, {
 getTrending
})(Home);
