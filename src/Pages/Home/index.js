import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Menu } from 'antd';
import * as AppRoutes from '../../router/router';

import { getDeviceDetail } from '../../redux/actions/homeAction';

const HomePage = ({ handleGetDeviceDetail, homeReducer }) => {
  const { images } = homeReducer;
  const [img1, setImg1] = useState('/assets/cat.jpg');
  const [img2, setImg2] = useState('/assets/cat.jpg');
  const [currentLink, setCurrentLink] = useState('Home');
  useEffect(() => {
    handleGetDeviceDetail();
    setInterval(() => {
      handleGetDeviceDetail();
    }, 5000);
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

  const handleClick = (data) => {
    setCurrentLink(data.key);
  };

  return (
    <div className="width-100-per d-flex flex-column height-100-per">
      <Menu
        onClick={handleClick}
        selectedKeys={[currentLink]}
        mode="horizontal"
      >
        <Menu.Item key="Home">Files</Menu.Item>
        <Menu.Item key="Edit">Edit</Menu.Item>
        <Menu.Item key="View">View</Menu.Item>
        <Menu.Item key="Help">
          <NavLink to={AppRoutes.HOME}>Help</NavLink>
        </Menu.Item>
      </Menu>
      <div className="d-flex align-items-center justify-content-around height-100-per widht-100-per">
        <div className="d-flex width-41-per">
          <img className="width-100-per" src={img1} alt=" not found" />
        </div>
        <div className="width-10-per height-100-per min-width-by-px-90 justify-content-center d-flex flex-column">
          <Button
            onMouseDown={handleSwitch}
            onMouseUp={handleRelease}
            type="button"
            className="m-b-20"
            color="primary"
          >
            Switch
          </Button>
          <Button
            onClick={approve}
            type="button"
            className="m-b-20"
            color="success"
          >
            Approved
          </Button>
          <Button
            onClick={clearResult}
            type="button"
            className="m-b-20"
            color="info"
          >
            Clear Result
          </Button>
          <Button
            onClick={prev}
            type="button"
            className="m-b-20"
            color="danger"
          >
            Prev
          </Button>
          <Button
            onClick={next}
            type="button"
            className="m-b-20"
            color="primary"
          >
            Next
          </Button>
        </div>
        <div className="d-flex width-41-per">
          <img className="width-100-per" src={img2} alt=" not found" />
        </div>
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
