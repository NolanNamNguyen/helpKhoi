import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Menu } from 'antd';
import { useHistory } from 'react-router';
import * as AppRoutes from '../../router/router';
import { LOCAL_STORAGE, IMAGE_ENDPOINT } from '../../constants/common';
import {
  getDeviceDetail,
  logout,
  markDangerous,
  createSnapShot,
} from '../../redux/actions/homeAction';

const HomePage = ({
  handleGetDeviceDetail,
  homeReducer,
  handleLogout,
  handleDecline,
  handleCreateSnapShot,
}) => {
  const { SubMenu } = Menu;
  const { images, fetchImageFailed } = homeReducer;
  const [imageIndex, setImageIndex] = useState(undefined);
  const history = useHistory();
  const [img1, setImg1] = useState('/assets/cat.jpg');
  const [img2, setImg2] = useState('/assets/cat.jpg');
  const [currentLink, setCurrentLink] = useState('Home');
  useEffect(() => {
    handleGetDeviceDetail({
      sid: localStorage.getItem(LOCAL_STORAGE.session_id),
      fetch_all: 1,
    });
    setInterval(() => {
      const imageInterval = handleGetDeviceDetail({
        sid: localStorage.getItem(LOCAL_STORAGE.session_id),
        fetch_all: 0,
      });
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
      setImageIndex(images.length - 1);
      console.log('aa', images);
    }
  }, [images?.length]);

  useEffect(() => {
    if (imageIndex) {
      setImg1(images[imageIndex]?.side_predicted_path);
      setImg2(images[imageIndex]?.up_predicted_path);
    }
  }, [imageIndex]);

  const clearResult = () => {
    setImg1(images[imageIndex]?.side_image_path);
    setImg2(images[imageIndex]?.up_image_path);
  };

  const handleRelease = () => {
    console.log('aaa');
    setImg1(images[imageIndex]?.side_predicted_path);
    setImg2(images[imageIndex]?.up_predicted_path);
  };

  const approve = () => {
    handleDecline({ iid: images[imageIndex].pk, sid: localStorage.getItem(LOCAL_STORAGE.session_id), danger: 0 });
  };

  const decline = () => {
    handleDecline({ iid: images[imageIndex].pk, sid: localStorage.getItem(LOCAL_STORAGE.session_id), danger: 1 });
  };

  const handleSwitch = () => {
    // eslint-disable-next-line no-console
    console.log('gotta be');
  };

  const prev = () => {
    setImageIndex(imageIndex - 1 > 0 && imageIndex + 1);
  };

  const next = () => {
    setImageIndex(imageIndex + 1 <= images.length - 1 && imageIndex + 1);
  };

  const handleClick = (data) => {
    setCurrentLink(data.key);
    if (data.key === 'Logout') {
      handleLogout(localStorage.getItem(LOCAL_STORAGE.session_id), () => {
        history.push(AppRoutes.LOGIN);
      });
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
        <SubMenu key="Home" title="Files">
          <Menu.Item key="setting:1">Load all Images</Menu.Item>
          <Menu.Item key="setting:2">Load only new</Menu.Item>
          <Menu.Item onClick={() => handleCreateSnapShot({ sid: localStorage.getItem(LOCAL_STORAGE.session_id) })} key="create_snap_shot">Create data snapshot</Menu.Item>
          <Menu.Item key="setting:4">Logout</Menu.Item>
        </SubMenu>
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
          <img
            className="width-100-per"
            src={`${IMAGE_ENDPOINT}${img1}`}
            alt=" not found"
          />
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
            Switch
          </Button>
          <Button
            onMouseDown={handleSwitch}
            onMouseUp={handleRelease}
            type="button"
            className="m-b-20"
            color="primary"
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
          <img
            className="width-100-per"
            src={`${IMAGE_ENDPOINT}${img2}`}
            alt=" not found"
          />
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
  handleCreateSnapShot: (params) => dispatch(createSnapShot(params)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(HomePage);
