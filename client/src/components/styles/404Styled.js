import styled from 'styled-components';

//Стиль страницы с ошибкой 404
const MissingPageStyled = styled.div`
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
    color: #a000bd;
    font-family: Lucida Handwriting, monospace;
    font-size: 3.2rem;
    position: absolute;
    left: 13%;
    top: 40%;
    width: 75%;
  }
  
  p {
    font-family: "Lucida Console", "Courier New", monospace;
    font-size: 1.6rem;
  }

  a {
    text-decoration: none;
    color: #00ffff88;
  }

  a:hover {
    text-decoration: underline;
  }
`;

export default MissingPageStyled;
