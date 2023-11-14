import React, { useState } from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components';
import CRUDComponent from './CRUDComponent';

const StyledWindow = styled.div`
  width: ${props => props.isMaximized ? '' : '500px'};
  height: ${props => props.isMaximized ? '100vh' : '400px'};
  border: 1px solid #00FF00; 
  background-color: #000000; 
  color: #00FF00;
  position: ${props => props.isMaximized ? 'fixed' : 'absolute'};
  top: ${props => props.isMaximized ? '0' : 'initial'};
  left: ${props => props.isMaximized ? '0' : '350px'};
  right: ${props => props.isMaximized ? '0' : 'initial'};
  bottom: ${props => props.isMaximized ? '0' : 'initial'};
  overflow: auto; 
  z-index: 10; 

 &::-webkit-scrollbar {
    width: 0em; 
  }
`;

const WindowHeader = styled.div`
  position: sticky;
  top: 0; /* 상단에 고정 */
  width:100%;
  background-color: #202020;
  padding: 5px;
  text-align: right;
  border-bottom: 1px solid #00FF00;
`;

const WindowContent = styled.div`
  padding: 10px;
`;

const Button = styled.button`
  background-color: transparent; 
  color: #00FF00; 
  border: none; 
  padding: 5px 10px; 
  margin: 0 5px;
  font-size: 1em; 
  cursor: pointer; 
  transition: background-color 0.3s ease; 

  &:hover {
    background-color: #00DD00; 
  }
`;

const Window = ({ isMinimized, toggleMinimize, isMaximized, toggleMaximize }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClosed, setIsClosed] = useState(false);

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
        disabled={isMaximized} 
        position={isMaximized ? position : null} 
        onStop={(e, data) => {
          if (!isMaximized) {
            setPosition({ x: data.x, y: data.y });
          }
        }}
      >
        <StyledWindow isMaximized={isMaximized}>
          <WindowHeader>
            <Button onClick={toggleMinimize}>_</Button>
            <Button onClick={handleMaximize}>{isMaximized ? 'ᄆ' : 'ᄆ'}</Button>
            <Button onClick={handleClose}>x</Button>
          </WindowHeader>
          <WindowContent>
            <CRUDComponent />
          </WindowContent>
        </StyledWindow>
      </Draggable>
    );
};
  
export default Window;