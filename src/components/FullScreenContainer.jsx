import React from 'react';

/* Components */
import Header from './Header';
import Loader from './Loader';

/* Libs */
import styled from 'styled-components';
import PropTypes from 'prop-types';

const FullScreenContainer = (props) => {
  return (
    <Container>
      {props.loadingState ?
        <Loader />
        : <div>
          {props.showHeader ?
            <Header history={props.history} screenName={props.screenName}>
              {props.children}
            </Header>
            : <div>
              {props.children}
            </div>
          }
        </div>
      }
    </Container>
  );
}

FullScreenContainer.propTypes = {
  loadingState: PropTypes.bool.isRequired,
  showHeader: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array
  ]),
  screenName: PropTypes.string
};

const Container = styled.div`
  background: url(img/blue-people-bg.jpg) no-repeat;
  background-position: center center;
  background-size: cover;
  color: white;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  overflow: auto;
`;

export default FullScreenContainer;
