import React from 'react';
import { Reset } from 'styled-reset';
import styled from 'styled-components'

import { Slider, Slide } from './slider/Slider';

const App = () => {
  return (
    <>
      <Reset/>
      <Slider paging>
        {
          new Array(4).fill().map((_,index) => {
            return <Slide key={index}><DIV style={{background: 'red'}}>1</DIV></Slide>
          })
        }
      </Slider>
    </>
  );
};

export default App;

const DIV = styled.div`
  width: 100%; height: 100%;
  display: flex; justify-content: center; align-items: center;
  color: #FFF;
`;