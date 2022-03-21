import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

export const Slide = ({children}) => <ImgSlide>{children}</ImgSlide>

export const Slider = ({children, pageNum, np, paging}) => {

  const wrapEl = useRef(null)
  const pagingBtns = useRef([])

  useEffect(() => {
    console.log(pagingBtns.current)
  }, [])

  return (
    <Contaniner>
      <Wraper>
        <Inner ref={wrapEl}>
          {children}
        </Inner>
      </Wraper>
      {
        paging && 
        <Paging>
          {
            new Array(children.length).fill().map((_,i) => {
              return <Pager key={i} ref={(el) => pagingBtns.current[i] = el}>{ pageNum && i + 1 }</Pager>
            })
          }
        </Paging>
      }
      {
        np && 
        <NP>
          <Next></Next>
          <Prev></Prev>
        </NP>
      }
    </Contaniner>
  );
};

const Contaniner = styled.div`
  width: 100%;
  position: relative;
`;

const Wraper = styled.div`
  width: 100%;
  overflow: hidden;
`;

const Inner = styled.div`
  display: flex;
  transition: transform 0.3s;
  cursor: pointer;
`;

const ImgSlide = styled.div`
  width: 100%; height: 180px;
  display: flex; align-items: center; justify-content: center;
  font-size: 50px; font-weight: bold;
  margin-right: 0;
  position: relative;
  box-sizing: border-box;
`;

const Paging = styled.div`
  position: absolute; top: 110%; left: 50%; transform: translateX(-50%); 
  display: flex;
`;

const Btn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const Pager = styled(Btn)`
  width: 20px; height: 20px;
  display: flex; align-items: center; justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  margin-right: 10px;

  &.active { color: #fff; background-color: #000; }
`;

const NP = styled.div`
  width: 100%;
  position: absolute; top: 50%; transform: translateY(-50%);
`;

const NPBtn = styled.button`
  width: 100px; height: 20px;
  background-color: orange; color: #FFF;
  position: absolute;
`;

const Next = styled(NPBtn)`
  right: 10px;
`;

const Prev = styled(NPBtn)`
  left: 10px;
`;