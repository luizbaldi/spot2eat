import React from 'react';

/* Components */
import Header from './Header';
import Loader from './Loader';

/* Libs */
import styled from 'styled-components';

const FullScreenContainer = (props) => {
  return (
    <Container>
      {props.loadingState ?
        <Loader />
        : <div>
          {props.showHeader ?
            <Header {...props} screenName={props.screenName}>
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
