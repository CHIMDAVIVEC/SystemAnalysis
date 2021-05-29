import React from 'react';
import ForbiddenPageStyled from '../styles/403Styled';

//Страница 403
function ForbiddenPage() {
  return (
    <ForbiddenPageStyled>
      <div className="mainbox">
        <iframe
          title="NOIDONTTHINKSO"
          src="https://www.youtube.com/embed/VKMw2it8dQY?playlist=VKMw2it8dQY&loop=1&autoplay=1&controls=0"
          width="0%"
          height="0%"
          frameBorder="0"
          allow="autoplay"
        ></iframe>
        <img
          alt=""
          src="https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2020/08/24/3486873633.png"
          width="100%"
          height="100%"
        />
        <div
          className="msg"
          style={{ position: 'absolute', right: '12%', bottom: '90%' }}
        >
          GET DOWN KING, 403 BEHIND YOU
        </div>
        <p style={{ position: 'absolute', left: '45%', bottom: '20%' }}>
          <a href="/home">GET DOWN</a>
        </p>
      </div>
    </ForbiddenPageStyled>
  );
}

export default ForbiddenPage;
