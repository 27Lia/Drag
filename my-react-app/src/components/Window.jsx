// Window.js
import React, { useState } from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components';

const StyledWindow = styled.div`
  width: ${props => props.isMaximized ? '' : '300px'};
  height: ${props => props.isMaximized ? '100vh' : '200px'};
  border: 1px solid #00FF00; 
  background-color: #000000; 
  color: #00FF00;
  font-family: 'Orbitron', sans-serif;
  position: ${props => props.isMaximized ? 'fixed' : 'absolute'};
  top: ${props => props.isMaximized ? '0' : 'initial'};
  left: ${props => props.isMaximized ? '0' : '350px'};
  right: ${props => props.isMaximized ? '0' : 'initial'};
  bottom: ${props => props.isMaximized ? '0' : 'initial'};
  overflow: auto; 
  z-index: 10; 
`;


const WindowHeader = styled.div`
  background-color: #202020;
  padding: 5px;
  text-align: right;
  border-bottom: 1px solid #00FF00;
`;

const WindowContent = styled.div`
  padding: 10px;
`;

const Button = styled.button`
  background-color: transparent; // 투명 배경
  color: #00FF00; // 네온 그린 색상
  border: none; // 테두리 없음
  padding: 5px 10px; // 패딩
  margin: 0 5px; // 여백
  font-family: 'Orbitron', sans-serif; // 미래적 글꼴
  font-size: 1em; // 글꼴 크기
  cursor: pointer; // 커서 포인터
  transition: background-color 0.3s ease; // 배경색 전환 효과

  &:hover {
    background-color: #00DD00; // 호버 시 네온 그린 배경
  }
`;

const Window = ({ isMinimized, toggleMinimize, isMaximized, toggleMaximize }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isClosed, setIsClosed] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    if (isMinimized || isClosed) return null;

    const handleMaximize = () => {
      toggleMaximize();
      setPosition({ x: 0, y: 0 });
    };

    const handleClose = () => {
      setIsClosed(true);
    };


    return (
        <Draggable 
          disabled={isMaximized || isHidden} 
          position={isMaximized || isHidden ? position : null} 
          onStop={(e, data) => {
            if (!isMaximized && !isHidden) {
              setPosition({ x: data.x, y: data.y });
            }
          }}
        >
          <StyledWindow isMaximized={isMaximized} isHidden={isHidden}>
            <WindowHeader>
              <Button onClick={toggleMinimize}>_</Button>
              <Button onClick={handleMaximize}>{isMaximized ? 'ᄆ' : 'ᄆ'}</Button>
              <Button onClick={handleClose}>x</Button>
            </WindowHeader>
            <WindowContent>
              I am 추워요.
            </WindowContent>
          </StyledWindow>
        </Draggable>
      );
};
    
export default Window;