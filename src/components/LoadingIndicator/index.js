import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'reactstrap';

const LoadingIndicator = ({ isLoading, loadingClass }) =>
  isLoading && (
    <>
      {loadingClass === 'loading-massive' && (
        <div className="loading-massive">
          <Spinner color="primary"/>
        </div>
      )}
      {loadingClass === 'loading-medium' && (
        <div className="loading-medium">
          <Spinner color="primary"/>
        </div>
      )}
      {loadingClass === 'loading-small' && (
        <div className="loading-small">
          <Spinner color="primary"/>
        </div>
      )}
    </>
  );

LoadingIndicator.propTypes = {
  isLoading: PropTypes.bool,
  loadingClass: PropTypes.string,
};

LoadingIndicator.defaultProps = {
  isLoading: false,
  loadingClass: 'loading-small',
};

export default LoadingIndicator;
