import React from "react";
import styled from "styled-components";

const DivContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: URL(/images/indexBG.jpg) no-repeat center;
  background-size: 100% 100%;
`;

const Home = () => {
  return (
    <>
      <DivContainer>
        <div
          style={{
            position: 'absolute',
            top:'50%',
            left:'25%'
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "50vw",
              backgroundColor: "red",
              zIndex: "10",
              textAlign: "center",
              top:'50%',
            }}
          >
            Choose your nickname
          </div>
        </div>
      </DivContainer>
    </>
  );
};

export default Home;
