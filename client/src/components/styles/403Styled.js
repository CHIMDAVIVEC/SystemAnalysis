import styled from 'styled-components';

const ForbiddenPageStyled = styled.div`
  body {
    background-color: #000000;
  }

  .mainbox {
    background-color: #000000;
    margin: auto;
    height: 100vh;
    width: 100%;
    position: relative;
  }

  .msg {
    text-align: center;
    color: #ff660c;
    font-family: "Comic Sans MS", cursive, monospace;
    font-size: 3.2rem;
  }

  p {
    font-family: "Comic Sans MS", cursive, monospace;
    font-size: 1.6rem;
  }

  a {
    text-decoration: none;
    animation: colorRotate 1s linear 0s infinite;
  }

  a:hover {
    text-decoration: underline;
  }

  @keyframes colorRotate {
    from {
      color: #6f0000;
    }
    50% {
      color: #b10000;
    }
    100% {
      color: #6f0000;
    }
`;

export default ForbiddenPageStyled;
