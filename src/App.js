import React, { Fragment } from 'react';
// import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
// import LoadingIndicator from './components/LoadingIndicator';
import AppRoutes from './router/appRoutes';
import GlobalAlert from './components/GlobalAlert';
import './App.scss';
import 'font-awesome/css/font-awesome.min.css';

const App = () => {
  // const locate = useLocation();
  // const [isLoading, setIsLoading] = useState(false);


  return (
    <Fragment>
      <div className="pageContainer">
        <div className="d-flex height-100-per width-100-per flex-column col-12 padding-none">
          <AppRoutes />
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(App);
