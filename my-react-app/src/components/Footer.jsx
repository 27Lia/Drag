import styled from "styled-components";

const Box = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #000000;
  color: #00FF00; 
  text-align: center;
  border-top: 3px solid #00FF00; 
  box-shadow: 0px -5px 10px 0px #00FF00; 
  height:80px;
`;


const MinimizedBar = styled.div`
display:flex;
justify-content:center;
align-items:center;
  color: white;
  height:100%;
`;

const Button = styled.button`
  background-color: #00FF00; 
  color: black; 
  border: none; 
  padding: 10px 20px; 
  border-radius: 10px; 
  font-size: 1em; 
  text-transform: uppercase; 
  box-shadow: 0px 0px 10px 3px #00FF00; 
  cursor: pointer;
  transition: all 0.3s ease; 

  &:hover {
    background-color: #00DD00;
    box-shadow: 0px 0px 15px 5px #00DD00; 
  }
`;

function Footer({ isMinimized, toggleMinimize }) {
  return (
    <Box>
      {isMinimized && (
        <MinimizedBar>
          <Button onClick={toggleMinimize}>니가봤던그창</Button>
        </MinimizedBar>
      )}
    </Box>
  );
}

export default Footer