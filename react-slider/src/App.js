import React, { useState } from 'react';
import { Reset } from 'styled-reset';
import styled from 'styled-components'

import { Slider, Slide } from './slider/Slider';

const App = () => {

  const bgArr = [
    {background: 'red'},
    {background: 'orange'},
    {background: 'yellow'},
    {background: 'green'}
  ]

  return (
    <Container>
      <Reset/>
      <SliderCover className='app-slider'>
        <Slider paging np pageNum>
          {
            bgArr.map((item,index) => {
              return <Slide key={index}><DIV style={item}></DIV></Slide>
            })
          }
        </Slider>
      </SliderCover>
      
    </Container>
  );
};

export default App;

const Container = styled.div`
  width: 800px;
  margin: 0 auto;
`;

const DIV = styled.div`
  width: 100%; height: 180px;
  display: flex; justify-content: center; align-items: center;
  color: #FFF;
`;

const SliderCover = styled.div`
  width: 500px;
  margin: 0 auto;
  &.app-slider .paging .btn { background: red; }
  
  &.app-slider .paging .btn.active { background: blue; }
`;