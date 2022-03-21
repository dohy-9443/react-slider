import React from 'react';
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
  
  const bgArr2 = [
    {background: 'red'},
    {background: 'orange'},
    {background: 'yellow'},
    {background: 'green'},
    {background: 'blue'},
    {background: 'navy'},
    {background: 'violet'}
  ]
  
  const bgArr3 = [
    {background: 'salmon'},
    {background: 'tomato'},
  ]
  
  const bgArr4 = [
    {background: 'red'},
    {background: 'orange'},
    {background: 'yellow'},
  ]
  

  return (
    <Container>
      <Reset/>
      <SliderCover className='app-slider'>
        <Slider division np autoplay>
          {
            bgArr.map((item,index) => {
              return <Slide key={index}><DIV style={item}>손대지마시오</DIV></Slide>
            })
          }
        </Slider>
      </SliderCover>
      <SliderCover className='app-slider2'>
        <Slider np>
          {
            bgArr2.map((item,index) => {
              return <Slide key={index}><DIV style={item}></DIV></Slide>
            })
          }
        </Slider>
      </SliderCover>
      <SliderCover>
        <Slider division>
          {
            bgArr3.map((item,index) => {
              return <Slide key={index}><DIV style={item}></DIV></Slide>
            })
          }
        </Slider>
      </SliderCover>
      <SliderCover>
        <Slider>
          {
            bgArr4.map((item,index) => {
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
  margin: 0 auto 100px;
  &.app-slider .paging .btn { background: red; }
  
  &.app-slider .paging .btn.active { background: blue; }

  &.app-slider .next { 
    background: pink; 
    width: 50px; height: 50px; 
    left: 100%; 
    &::after {  color: red; } 
  }
  &.app-slider .prev { 
    background: pink; 
    width: 50px; height: 50px;
    right: 100%; 
    &::after {  color: red; } 
  }
  &.app-slider2 .next {
    right: 0;
  }
`;