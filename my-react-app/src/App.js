import React, { useState } from "react";
import styled from "styled-components";
import Window from "./components/Window";
import Footer from "./components/Footer";

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const MinimizedBar = styled.div`
  color: white;
  padding: 10px 0;
  z-index: 999;
`;

const InternetIcon = styled.div`
  height: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 100px;
`;

function App() {
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const toggleWindow = () => {
    setIsWindowOpen(!isWindowOpen);
    if (isMinimized) setIsMinimized(false);
    if (isMaximized) setIsMaximized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    if (isMaximized) setIsMaximized(false);
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
    if (isMinimized) setIsMinimized(false);
  };

  return (
    <AppContainer>
      <InternetIcon onClick={toggleWindow}>🌎</InternetIcon>
      {isWindowOpen && (
        <Window
          isMinimized={isMinimized}
          toggleMinimize={toggleMinimize}
          isMaximized={isMaximized}
          toggleMaximize={toggleMaximize}
        />
      )}
      <Footer isMinimized={isMinimized} toggleMinimize={toggleMinimize} />
    </AppContainer>
  );
}

export default App;
