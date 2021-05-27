import React from 'react';

import LoaderStyled from '../styles/LoaderStyled';

const Loader = ({ text }) => (
  <div
    style={{
      padding: '24px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}
  >
    <LoaderStyled>
      <div className="spinner"></div>
    </LoaderStyled>

    <div> {text ? text : 'Загружаю...'}.</div>
  </div>
);

export default Loader;
