import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Menu, Input } from 'antd';
import { useHistory } from 'react-router';
import uuid, { process } from 'uniqid';
import { CheckCircle } from 'react-feather';
import * as AppRoutes from '../../router/router';
import {
  LOCAL_STORAGE,
  IMAGE_ENDPOINT,
  FETCH_IMAGE_TYPE,
  DETECTED_NOTHING,
  INTERVALtIME,
} from '../../constants/common';
import {
  getImage,
  logout,
  markDangerous,
  createSnapShot,
  fetchImageDetail,
  resetErrorState,
} from '../../redux/actions/homeAction';

const HomePage = ({
  handleGetDeviceDetail,
  homeReducer,
  handleLogout,
  handleChangeDanger,
  handleCreateSnapShot,
  handleFetchImageDetail,
  handleresetError,
}) => {
  const [noteDefault, setNoteDefault] = useState('');
  const { TextArea } = Input;
  const { SubMenu } = Menu;
  const { images, fetchImageFailed, resetAlert } = homeReducer;
  const [imageIndex, _setImageIndex] = useState(0);
  const [pageRenderKey, setPageRenderKey] = useState(111);
  const [noteRenderKey, setNoteRenderKey] = useState(0);
  const history = useHistory();
  const [fetchType, _setFetchType] = useState(1);
  const [upDownState, setUpDownState] = useState({
    img1State: 'side_',
    img2State: 'up_',
  })
  const [img1, setImg1] = useState({
    path: 'assets/no-image.jpg',
    nomalPath: 'assets/no-image.jpg',
    imgAnnotation: '',
  });
  const [img2, setImg2] = useState({
    path: 'assets/no-image.jpg',
    nomalPath: 'assets/no-image.jpg',
    imgAnnotation: '',
  });
  const [currentLink, setCurrentLink] = useState('Home');
  const fetchRef = useRef(fetchType);
  const submitComment = useRef(undefined);
  const [pathAttr, setPathAttr] = useState('path');
  const intervalFetchRef = useRef(undefined);

  const setFetchType = (data) => {
    _setFetchType(data);
    fetchRef.current = data;
    if (!intervalFetchRef.current) {
      createInterval();
    }
  };

  const setImageIndex = (data) => {
    _setImageIndex(data);
    setNoteRenderKey(`note_renderKey${data}`);
  }

  useEffect(() => {
    handleGetDeviceDetail({
      sid: localStorage.getItem(LOCAL_STORAGE.session_id),
      fetch_all: fetchRef.current,
    });
    createInterval();
    return () => {
      clearInterval(intervalFetchRef.current);
    };
  }, []);

  const createInterval = () => {
    intervalFetchRef.current = setInterval(() => {
      handleGetDeviceDetail({
        sid: localStorage.getItem(LOCAL_STORAGE.session_id),
        fetch_all: fetchRef.current,
      });
    }, INTERVALtIME);
  }


  useEffect(() => {
    if (resetAlert) {
      setImg1({
        path: 'assets/no-image.jpg',
        nomalPath: 'assets/no-image.jpg',
        imgAnnotation: '',
      })
      setImg2({
        path: 'assets/no-image.jpg',
        nomalPath: 'assets/no-image.jpg',
        imgAnnotation: '',
      })
    }
  }, [resetAlert])

  useEffect(() => {
    if (fetchImageFailed) {
      localStorage.removeItem(LOCAL_STORAGE.session_id);
      history.push(AppRoutes.ACCESS_DENIED);
      handleresetError();
    }
  }, [fetchImageFailed]);

  useEffect(() => {
    if (images && images.length) {
      setImageIndex(images.length - 1);
    }
  }, [images?.length]);

  useEffect(() => {
    if (Number.isInteger(imageIndex) && imageIndex !== -1 && images && images.length && images[imageIndex]) {
      setNoteDefault(images[imageIndex]?.notes);
      setTimeout(() => {
        setNoteRenderKey(imageIndex)
      }, 100);
      setImg1({
        path: images[imageIndex][`${upDownState.img1State}predicted_path`],
        normalPath: images[imageIndex][`${upDownState.img1State}image_path`],
        imgAnnotation: images[imageIndex][`${upDownState.img1State}annotations`],
      });
      setImg2({
        path: images[imageIndex][`${upDownState.img2State}predicted_path`],
        normalPath: images[imageIndex][`${upDownState.img2State}image_path`],
        imgAnnotation: images[imageIndex][`${upDownState.img2State}annotations`],
      });
      return;
    }
    setImg1({
      path: 'assets/no-image.jpg',
      nomalPath: 'assets/no-image.jpg',
      imgAnnotation: '',
    })
    setImg2({
      path: 'assets/no-image.jpg',
      nomalPath: 'assets/no-image.jpg',
      imgAnnotation: '',
    })
  }, [imageIndex, upDownState, images?.length, pageRenderKey]);

  const clearResult = () => {
    setPathAttr('normalPath');
  };

  const handleRelease = () => {
    setPathAttr('path');
  };

  const approve = () => {
    if (images && images.length) {
      handleChangeDanger({
        iid: images[imageIndex].pk,
        sid: localStorage.getItem(LOCAL_STORAGE.session_id),
        notes: submitComment.current.resizableTextArea.textArea.innerHTML,
        danger: 0,
      }, () => {
        handleFetchImageDetail({ sid: localStorage.getItem(LOCAL_STORAGE.session_id), iid: images[imageIndex].pk }, updateImageDetail);
      });
    }
  };

  const decline = () => {
    handleChangeDanger(
      {
        iid: images[imageIndex].pk,
        sid: localStorage.getItem(LOCAL_STORAGE.session_id),
        notes: submitComment.current.resizableTextArea.textArea.innerHTML,
        danger: 1,
      },
      () => {
        handleFetchImageDetail({ sid: localStorage.getItem(LOCAL_STORAGE.session_id), iid: images[imageIndex].pk }, updateImageDetail);
      },
    );
  };

  const updateImageDetail = (updatedImg) => {
    images[imageIndex] = {
      pk: images[imageIndex].pk,
      ...updatedImg.image,
    }
    setNoteDefault(images[imageIndex]?.notes);
  };

  const handleSwitch = () => {
    if (images && images[imageIndex]) {
      const currentImg1State = upDownState.img1State;
      // setImg1(img2);
      // setImg2(currentImg1);
      setUpDownState({
        img1State: upDownState.img2State,
        img2State: currentImg1State,
      })
    }
  };

  const clearFetchIntervel = (params) => {
    clearInterval(intervalFetchRef.current);
    intervalFetchRef.current = undefined;
  }


  const prev = () => {
    imageIndex - 1 >= 0 && setImageIndex(imageIndex - 1);
  };

  const next = () => {
    imageIndex + 1 <= images?.length - 1 && setImageIndex(imageIndex + 1);
  };

  const handleClick = (data) => {
    setCurrentLink(data?.key);
  };

  const doLogout = () => {
    handleLogout(localStorage.getItem(LOCAL_STORAGE.session_id), () => {
      history.push(AppRoutes.LOGIN);
    });
  };

  return (
    <div className="width-100-per d-flex flex-column height-100-per">
      <Menu
        onClick={() => { handleClick() }}
        selectedKeys={[currentLink]}
        mode="horizontal"
        className="position-relative menu-container"
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
            onClick={() => {
              setFetchType(FETCH_IMAGE_TYPE.STOP_FETCH);
              clearFetchIntervel();
            }}
            key="stopFetch"
          >
            <div>
              {fetchType === FETCH_IMAGE_TYPE.STOP_FETCH && <CheckCircle size={15} />}
              <span className="m-l-5">Stop Fetch</span>
            </div>
          </Menu.Item>
          <Menu.Item
            onClick={() =>
              handleCreateSnapShot({
                sid: localStorage.getItem(LOCAL_STORAGE.session_id),
              }, () => {
                setPageRenderKey(uuid());
              })
            }
            key="create_snap_shot"
          >
            <span className="m-l-5">Create data snapshot</span>
          </Menu.Item>
          <Menu.Item key="setting:4">
            <span
              role="button"
              onClick={() => {
                doLogout();
              }}
              className="m-l-5"
            >
              Logout
            </span>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="Edit">Edit</Menu.Item>
        <Menu.Item key="View">View</Menu.Item>
        <Menu.Item key="Help">
          <NavLink to={AppRoutes.HOME}>Help</NavLink>
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            doLogout();
          }}
          className="position-absolute ps-r-100"
          key="Logout"
        >
          Logout
        </Menu.Item>
        <h2 className="position-absolute width-100-per d-flex justify-content-center z-index--1">
          Deep Sniff
        </h2>
      </Menu>
      <div className="d-flex flex-column justify-content-center height-100-per">

        <div className="d-flex align-items-center justify-content-around widht-100-per">
          <div className="d-flex flex-column align-items-center width-41-per position-relative">
            {images?.length ? (
              <h6 className="d-flex justify-content-center detected-text date-time-background">
                {images[imageIndex]?.stamped_time}
              </h6>
            ) : ''}
            <img
              className="width-100-per"
              src={
                images?.length ? `${IMAGE_ENDPOINT}${img1[pathAttr]}` : `${img1[pathAttr]}`
              }
              alt=" not found"
            />
            {img1?.imgAnnotation && img1?.imgAnnotation !== DETECTED_NOTHING ? (
              <h6 className="position-absolute ps-b--32 detected-text">
                {img1?.imgAnnotation}
              </h6>
            ) : ''}
          </div>
          <div className="width-10-per height-100-per min-width-by-px-90 justify-content-center d-flex flex-column">
            <Button
              onClick={() => { decline() }}
              type="button"
              className="m-b-20"
              color="danger"
            >
              {images?.length && images[imageIndex]?.danger < 0 ? (
                <CheckCircle className="m-r-6 m-b-2" size="16" />
              ) : ''}
              Decline
            </Button>
            <Button
              onClick={() => { approve() }}
              type="button"
              className="m-b-20"
              color="success"
            >
              {images?.length && images[imageIndex]?.danger > 0 ? (
                <CheckCircle className="m-r-6 m-b-2" size="16" />
              ) : ''}
              Approved
            </Button>
            <Button
              onClick={() => { handleSwitch() }}
              type="button"
              className="m-b-20"
              color="info"
            >
              Switch
            </Button>
            <Button
              onMouseDown={() => { clearResult() }}
              onMouseUp={() => { handleRelease() }}
              type="button"
              className="m-b-20"
              color="primary"
            >
              Clear Result
            </Button>
            <Button
              onClick={() => { prev() }}
              type="button"
              className="m-b-20"
              color="danger"
              disabled={imageIndex === 0}
            // disabled
            >
              Prev
            </Button>
            <Button
              onClick={() => { next() }}
              type="button"
              className="m-b-20"
              color="primary"
              disabled={imageIndex === images?.length - 1}
            >
              Next
            </Button>
            <div>
              <TextArea key={noteRenderKey} defaultValue={noteDefault} ref={submitComment} rows={4} />
            </div>
          </div>

          <div className="d-flex flex-column align-items-center width-41-per position-relative">
            {images?.length ? (
              <h6 className="d-flex justify-content-center detected-text date-time-background">
                {images[imageIndex]?.stamped_time}
              </h6>
            ) : ''}
            <img
              className="width-100-per"
              src={
                images?.length ? `${IMAGE_ENDPOINT}${img2[pathAttr]}` : `${img2[pathAttr]}`
              }
              alt=" not found"
            />
            {img2?.imgAnnotation && img2?.imgAnnotation !== DETECTED_NOTHING ? (
              <h6 className="position-absolute ps-b--32 detected-text">
                {img2?.imgAnnotation}
              </h6>
            ) : ''}
          </div>
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
  handleresetError: (params) => dispatch(resetErrorState(params)),
  handleLogout: (params, callback) => dispatch(logout(params, callback)),
  handleChangeDanger: (params, callback) =>
    dispatch(markDangerous(params, callback)),
  handleCreateSnapShot: (params, callback) => dispatch(createSnapShot(params, callback)),
  handleFetchImageDetail: (params, callback) => dispatch(fetchImageDetail(params, callback)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(HomePage);
