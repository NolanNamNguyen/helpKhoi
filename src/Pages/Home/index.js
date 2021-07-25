import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Menu } from 'antd';
import { useHistory } from 'react-router';
import * as AppRoutes from '../../router/router';
import { LOCAL_STORAGE } from '../../constants/common';
import {
  getDeviceDetail,
  logout,
  markDangerous,
} from '../../redux/actions/homeAction';

const HomePage = ({
  handleGetDeviceDetail,
  homeReducer,
  handleLogout,
  handleDecline,
}) => {
  const { images, fetchImageFailed } = homeReducer;
  const history = useHistory();
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
    if (fetchImageFailed) {
      localStorage.removeItem(LOCAL_STORAGE.session_id);
      history.push(AppRoutes.ACCESS_DENIED);
    }
  }, [fetchImageFailed]);

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

  const decline = (params) => {
    handleDecline(params);
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
    if (data.key === 'Logout') {
      handleLogout(localStorage.getItem(LOCAL_STORAGE.session_id));
      history.push(AppRoutes.LOGIN);
    }
  };

  return (
    <div className="width-100-per d-flex flex-column height-100-per">
      <Menu
        onClick={handleClick}
        selectedKeys={[currentLink]}
        mode="horizontal"
        className="position-relative"
      >
        <Menu.Item key="Home">Files</Menu.Item>
        <Menu.Item key="Edit">Edit</Menu.Item>
        <Menu.Item key="View">View</Menu.Item>
        <Menu.Item key="Help">
          <NavLink to={AppRoutes.HOME}>Help</NavLink>
        </Menu.Item>
        <Menu.Item className="position-absolute ps-r-100" key="Logout">
          Logout
        </Menu.Item>
        <h2 className="position-absolute ps-l-50-per">Chick Trader</h2>
      </Menu>
      <div className="d-flex align-items-center justify-content-around height-100-per widht-100-per">
        <div className="d-flex width-41-per">
          <img className="width-100-per" src={img1} alt=" not found" />
        </div>
        <div className="width-10-per height-100-per min-width-by-px-90 justify-content-center d-flex flex-column">
          <Button
            onClick={decline}
            type="button"
            className="m-b-20"
            color="danger"
          >
            Decline
          </Button>
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
  handleLogout: (params) => dispatch(logout(params)),
  handleDecline: (params) => dispatch(markDangerous(params)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(HomePage);
