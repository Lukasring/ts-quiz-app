import styled, { createGlobalStyle } from "styled-components";
import BGimage from "./images/background.jpg";

export const GlobalStyle = createGlobalStyle`
  *{
    box-sizing: border-box;
    font-family: Oswald;
  }  

html {
    height: 100%;
  }

  body {
    background-image: url(${BGimage});
    background-size: cover;
    margin: 0;
    padding: 0 20px;
    display: flex;
    justify-content: center;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    color: #fff;
  }

  .score {
    color: #fff;
    font-size: 2rem;
    margin: 0;
  }

  h1 {
    font-family: "Fascinate Inline", cursive;
    background-image: linear-gradient(180deg, #fff, #87f1ff);
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    filter: drop-shadow(2px 2px #0085a3);
    font-weight: 400;
    font-size: 70px;
    text-align: center;
    margin: 20px;
  }

  .start,
  .next {
    cursor: pointer;
    background-image: linear-gradient(180deg, #fff, #ffcc91);
    border: 2px solid #d38558;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    height: 40px;
    margin: 20px 0;
    padding: 0 40px;
    transition: transform 0.1s ease;

    :hover {
      transform: scale(1.05);
    }
  }

  .start {
    max-width: 200px;
  }
`;

export const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;

  select {
    border: 3px solid #fff;
    box-shadow: 1px 2px 0px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    color: #fff;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.25);
    font-weight: bold;
    font-size: 0.9rem;
    height: 40px;
    width: 95%;
    margin: 6px 8px;
    text-transform: capitalize;
    background-color: transparent;
    appearance: none;
    background: linear-gradient(90deg, #56ccff, #6eafb4);
    text-align: center;
    text-align-last: center;
    -moz-text-align-last: center;
    size: 5;
  }

  option {
    margin: 6px;
    color: #fff;
    background: #6eafb4;
  }
`;
