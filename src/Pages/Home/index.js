import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { getDeviceDetail } from '../../redux/actions/homeAction';

const HomePage = ({ handleGetDeviceDetail, homeReducer }) => {
  const { images } = homeReducer;
  const [img1, setImg1] = useState('/assets/cat.jpg');
  const [img2, setImg2] = useState('/assets/cat.jpg');
  useEffect(() => {
    handleGetDeviceDetail();
  }, []);

  useEffect(() => {
    if (images) {
      setImg1(images[0]);
      setImg2(images[1]);
    }
  }, [images]);

  const handleSwitch = () => {
    setImg1(images[2]);
    setImg2(images[3]);
  };

  const handleRelease = () => {
    setImg1(images[0]);
    setImg2(images[1]);
  };

  const approve = () => {
    // eslint-disable-next-line no-console
    console.log('you');
  };

  const clearResult = () => {
    // eslint-disable-next-line no-console
    console.log('gotta be');
  };

  const prev = () => {
    // eslint-disable-next-line no-console
    console.log('fucking ');
  };

  const next = () => {
    // eslint-disable-next-line no-console
    console.log('kidding me');
  };

  return (
    <div className="d-flex justify-content-around widht-100-per">
      <div className="width-28-per">
        <img src={img1} alt=" not found" />
      </div>
      <div className="width-10-per height-by-px-350 justify-content-center d-flex flex-column">
        <Button
          onMouseDown={handleSwitch}
          onMouseUp={handleRelease}
          type="button"
          className="m-b-20"
          color="primary"
        >
          Switch
        </Button>
        <Button onClick={approve} type="button" className="m-b-20" color="success">
          Approved
        </Button>
        <Button onClick={clearResult} type="button" className="m-b-20" color="info">
          Clear Result
        </Button>
        <Button onClick={prev} type="button" className="m-b-20" color="danger">
          Prev
        </Button>
        <Button onClick={next} type="button" className="m-b-20" color="primary">
          Next
        </Button>
      </div>
      <div className="width-28-per">
        <img src={img2} alt=" not found" />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  homeReducer: state.homeReducer,
});

const mapDispatchToProps = (dispatch) => ({
  handleGetDeviceDetail: (params) => dispatch(getDeviceDetail(params)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(HomePage);
