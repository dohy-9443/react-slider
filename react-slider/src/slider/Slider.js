import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

export const Slide = ({children}) => <ImgSlide className='slide'>{children}</ImgSlide>


export const Slider = ({children, pageNum, np, paging, autoplay}) => {

  const wrapEl = useRef(null)
  const pagingBtns = useRef([])
  const nextEl = useRef(null)
  const prevEl = useRef(null)

  // autoplay는 잠정 중단
  const timer = (w, i, page) => {
    
    setInterval(() => {
      i++;
      if (i < children.length) {
        if (page && page.length > 0) {
          page.forEach((reItem) => {
            reItem.classList.remove('active');
          })
          
          // 페이징 현재 index한테 active
          page[i].classList.add('active');
        }
        w.style.transform = `translateX(${-i * 100/children.length}%)`;
      } else if (i === children.length) {
        i = 0;
        if (page && page.length > 0) {
          page.forEach((reItem) => {
            reItem.classList.remove('active');
          })
          
          // 페이징 현재 index한테 active
          page[i].classList.add('active');
        }
        w.style.transform = `translateX(${-i * 100/children.length}%)`;
      }
    }, 3000)
    
  }

  function resetPW (page, index, wrap, children, a) {
    if (page && page.length > 0) {
      page.forEach((reItem) => {
        reItem.classList.remove('active');
      })
      
      // 페이징 현재 index한테 active
      page[index].classList.add('active');
    }
    if (a) {
      // autoplay는 잠정 중단
      // timer(wrap, index, page)
      
    } else {
      // 슬라이드 현재 index만큼 이동
      wrap.style.transform = `translateX(${-index * 100/children.length}%)`;
    }
    
  }

  function imgslide(w, p) {
    let firstX; // drag , touch 시작 x 값 담을 변수
    let lastX; // drag , touch 마지막 x 값 담을 변수
    var i = 0; // 슬라이드 현재 버튼 변수

    w.style.width = `${p.length * 100}%`; // 시작할 때 슬라이드 감싸는 div 넓이값
    w.style.transform = `translateX(0%)`; // 시작할 때 슬라이드 감싸는 div translate 값
    
    if (autoplay) {
      setTimeout(() => {
        resetPW(pagingBtns.current, i, w, p, autoplay)
      }, 2000)
    }


    if (pagingBtns && pagingBtns.current.length > 0) {
      pagingBtns.current[0].classList.add('active')

      // pagination 버튼 클릭부터 시작
      pagingBtns.current.forEach((item, index) => {
      
        // 버튼 클릭 이벤트
        item.addEventListener('click', function() {
          // i 에 현재 index 담고
          i = index;

          resetPW(pagingBtns.current, i, w, p, autoplay)
          
        })

      })
    }
    

    // 터치 이벤트 시작
    w.addEventListener('touchstart', (e) => {
      // 시작점 x 값 담고
      let x = e.touches[0].clientX;

      // 위에 선언한 처음 x값 담고
      firstX = x;

      // 그 값 return
      return firstX;
    }, false);

    w.addEventListener('touchend', (e) => {

      // 터치 땐 x 값 담고
      let x = e.changedTouches[0].clientX;
  
      // 그 값을 위에 선언한 마지막 x 값 담고
      lastX = x;
      
      // 시작값이 마지막값보다 크면
      if (firstX > lastX) {
        // 그러면 슬라이드가 오른쪽에서 왼쪽으로 작동 1 -> 2 -> 3
  
        // i 가 0이랑 같거나 크고 i 가 슬라이드 갯수보다 2개 적을 때
        if (0 <= i && i < p.length - 2) {
  
          i++; // i = i + 1
          
          resetPW(pagingBtns.current, i, w, p, autoplay)
  
          // i가 슬라이드 갯수 - 2 적을 때 ( 마지막 슬라이드 )
        } else if (i === p.length - 2) {
          i = p.length - 1; // 맨 마지막 index
  
          resetPW(pagingBtns.current, i, w, p, autoplay)
        }
  
      // 시작값이 마지막값보다 작으면
      } else {
        // 그러면 슬라이드가 왼쪽에서 오른쪽으로 작동 3 -> 2 -> 1
  
        // i가 0보다 크고 i가 총 장수와 같거나 작을 때
        if (0 < i && i <= p.length - 1) {
          i--; // i = i - 1;
          
          resetPW(pagingBtns.current, i, w, p, autoplay)
  
          // i 가 0 일 때
        } else if (i === 0) {
          i = 0;
  
          resetPW(pagingBtns.current, i, w, p, autoplay)
        }
  
      }
  
    }, false)

    // 이벤트만 pointer로 바뀌고 터치 이벤트랑 똑같음!
    w.addEventListener('pointerdown', (e) => {
      let x = e.clientX;

      firstX = x;

      return firstX
    })

    w.addEventListener('pointerup', (e) => {

      let x = e.clientX
      lastX = x;

      if (firstX > lastX) {

        if (0 <= i && i < p.length - 2) {
          i++;
          
          resetPW(pagingBtns.current, i, w, p, autoplay)

        } else if (i === p.length - 2) {
          i = p.length - 1;

          resetPW(pagingBtns.current, i, w, p, autoplay)

        }

      } else {
        if (0 < i && i <= p.length - 1) {
          i--;
          
          resetPW(pagingBtns.current, i, w, p, autoplay)

        } else if (i === 0) {
          i = 0;

          resetPW(pagingBtns.current, i, w, p, autoplay)

        }

      }
    })
    
    // next 버튼 클릭
    if (nextEl.current && nextEl.current !== null) {
      nextEl.current.addEventListener('click', function() {
      
        // 1 -> 2 -> 3 가는거랑 똑같음
        if (i >= 0 && i < p.length - 1) {
          i++;
          
          resetPW(pagingBtns.current, i, w, p, autoplay)

          
  
        } else if (i === p.length) {
          i = p.length
          
          resetPW(pagingBtns.current, i, w, p, autoplay)

        }
      })
    }
    

    // prev 버튼
    if (prevEl.current && prevEl.current !== null) {
      prevEl.current.addEventListener('click', function() {

        // 3 -> 2 -> 1 이랑 똑같음
        if (i > 0 && i <= p.length - 1) {
          i--;
  
          resetPW(pagingBtns.current, i, w, p, autoplay)

        } else if (i === 0) {
          i = 0;
  
          resetPW(pagingBtns.current, i, w, p, autoplay)

        }
      })
    }
    
  }

  useEffect(() => {
    
    imgslide(wrapEl.current, children);
    
    
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
        <Paging className='paging'>
          {
            new Array(children.length).fill().map((_,i) => {
              return <Pager type="button" className='btn' key={i} ref={(el) => pagingBtns.current[i] = el}>{ pageNum && i + 1 }</Pager>
            })
          }
        </Paging>
      }
      {
        np && 
        <NP className='np'>
          <Next className='next' ref={nextEl} type="button"></Next>
          <Prev className='prev' ref={prevEl} type="button"></Prev>
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
  width: 100%;
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

const NPBtn = styled(Btn)`
  width: 20px; height: 20px; border-radius: 50%;
  background-color: black; color: #FFF;
  position: absolute; 

  &:disabled {
    background: rgba(0,0,0,0.2);
  }
`;

const Next = styled(NPBtn)`
  /* right: 10px; */
  

  &::after {
    content: '>';
    display: flex; justify-content: center; align-items: center;
    width: 100%; height: 100%;
    color: #fff; font-size: 16px;
  }
`;

const Prev = styled(NPBtn)`
  /* left: 10px; */
  
  &::after {
    content: '<';
    display: flex; justify-content: center; align-items: center;
    width: 100%; height: 100%;
    color: #fff; font-size: 16px;
  }
`;