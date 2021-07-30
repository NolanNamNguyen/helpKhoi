import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Menu } from 'antd';
import { useHistory } from 'react-router';
import { CheckCircle } from 'react-feather';
import * as AppRoutes from '../../router/router';
import {
  LOCAL_STORAGE,
  IMAGE_ENDPOINT,
  FETCH_IMAGE_TYPE,
} from '../../constants/common';
import {
  getImage,
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
  const { images, fetchImageFailed, newImages } = homeReducer;
  const [imageIndex, setImageIndex] = useState(0);
  const history = useHistory();
  const [fetchType, _setFetchType] = useState(0);
  const [img1, setImg1] = useState('/assets/no-image.jpg');
  const [img2, setImg2] = useState('/assets/no-image.jpg');
  const [currentLink, setCurrentLink] = useState('Home');
  const fetchRef = useRef(fetchType);

  console.log(typeof (images?.length))
  console.log(typeof (imageIndex))

  const setFetchType = (data) => {
    _setFetchType(data);
    fetchRef.current = data;
  };

  useEffect(() => {
    handleGetDeviceDetail({
      sid: localStorage.getItem(LOCAL_STORAGE.session_id),
      fetch_all: 1,
    });
    const intervalFetchImage = setInterval(() => {
      handleGetDeviceDetail({
        sid: localStorage.getItem(LOCAL_STORAGE.session_id),
        fetch_all: fetchRef.current,
      });
    }, 5000);
    return () => {
      clearInterval(intervalFetchImage);
    };
  }, []);

  useEffect(() => {
    if (fetchImageFailed) {
      localStorage.removeItem(LOCAL_STORAGE.session_id);
      history.push(AppRoutes.ACCESS_DENIED);
    }
  }, [fetchImageFailed]);

  useEffect(() => {
    if (newImages?.length) {
      newImages.forEach((img) => {
        images.push(img);
      });
    }
  }, [newImages]);

  useEffect(() => {
    if (images && images.length) {
      setImageIndex(images.length - 1);
    }
  }, [images?.length]);

  useEffect(() => {
    if (Number.isInteger(imageIndex) && imageIndex !== -1 && images) {
      setImg1(images[imageIndex]?.side_predicted_path);
      setImg2(images[imageIndex]?.up_predicted_path);
    }
  }, [imageIndex]);

  const clearResult = () => {
    setImg1(images[imageIndex]?.side_image_path);
    setImg2(images[imageIndex]?.up_image_path);
  };

  const handleRelease = () => {
    setImg1(images[imageIndex]?.side_predicted_path);
    setImg2(images[imageIndex]?.up_predicted_path);
  };

  const approve = () => {
    handleDecline({
      iid: images[imageIndex].pk,
      sid: localStorage.getItem(LOCAL_STORAGE.session_id),
      danger: 0,
    });
  };

  const decline = () => {
    handleDecline({
      iid: images[imageIndex].pk,
      sid: localStorage.getItem(LOCAL_STORAGE.session_id),
      danger: 1,
    });
  };

  const handleSwitch = () => {
    if (images && images[imageIndex]) {
      const currentImg1 = img1;
      setImg1(img2);
      setImg2(currentImg1);
    }
  };

  const prev = () => {
    imageIndex - 1 >= 0 && setImageIndex(imageIndex - 1);
  };

  const next = () => {
    imageIndex + 1 <= images?.length - 1 && setImageIndex(imageIndex + 1);
  };

  const handleClick = (data) => {
    setCurrentLink(data.key);
  };

  const doLogout = () => {
    handleLogout(localStorage.getItem(LOCAL_STORAGE.session_id), () => {
      console.log('wtf');
      history.push(AppRoutes.LOGIN);
    });
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
          <Menu.Item
            onClick={() => {
              setFetchType(FETCH_IMAGE_TYPE.ALL);
            }}
            key="fetchAll"
          >
            <div>
              {fetchType === FETCH_IMAGE_TYPE.ALL && <CheckCircle size={15} />}
              <span className="m-l-5">Load all Images</span>
            </div>
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              setFetchType(FETCH_IMAGE_TYPE.ONLY_NEW);
            }}
            key="fetchOnlyNew"
          >
            <div>
              {fetchType === FETCH_IMAGE_TYPE.ONLY_NEW && (
                <CheckCircle size={15} />
              )}
              <span className="m-l-5">Load only new</span>
            </div>
          </Menu.Item>
          <Menu.Item
            onClick={() =>
              handleCreateSnapShot({
                sid: localStorage.getItem(LOCAL_STORAGE.session_id),
              })
            }
            key="create_snap_shot"
          >
            <span className="m-l-5">Create data snapshot</span>
          </Menu.Item>
          <Menu.Item key="setting:4">
            <span role="button" onClick={() => { doLogout() }} className="m-l-5">
              Logout
            </span>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="Edit">Edit</Menu.Item>
        <Menu.Item key="View">View</Menu.Item>
        <Menu.Item key="Help">
          <NavLink to={AppRoutes.HOME}>Help</NavLink>
        </Menu.Item>
        <Menu.Item onClick={() => { doLogout() }} className="position-absolute ps-r-100" key="Logout">
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
            onClick={handleSwitch}
            type="button"
            className="m-b-20"
            color="info"
          >
            Switch
          </Button>
          <Button
            onMouseDown={clearResult}
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
            disabled={imageIndex === 0}
          // disabled
          >
            Prev
          </Button>
          <Button
            onClick={next}
            type="button"
            className="m-b-20"
            color="primary"
            disabled={imageIndex === images?.length - 1}
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
  handleGetDeviceDetail: (params) => dispatch(getImage(params)),
  handleLogout: (params, callback) => dispatch(logout(params, callback)),
  handleDecline: (params) => dispatch(markDangerous(params)),
  handleCreateSnapShot: (params) => dispatch(createSnapShot(params)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(HomePage);
