import React from 'react';
import MissingPageStyled from '../styles/404Styled';

//Страница 404
function MissingPage() {
  return (
    <MissingPageStyled>
      <div className="mainbox">
        <iframe
          title="UselessMouthWillBeFine"
          src="https://www.youtube.com/embed/ux-U60Kfz-Q?playlist=ux-U60Kfz-Q&loop=1&autoplay=1&controls=0"
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
          allow="autoplay"
        ></iframe>
        <div className="msg">
          P A G E W I L L B E F I N E
          <p>
            <a href="/home">back to reality i guess...</a>
          </p>
          <img
            alt=""
            src="https://cdn.betterttv.net/emote/5fecb5fa60488f2e470efd74/3x"
          />
        </div>
      </div>
    </MissingPageStyled>
  );
}

export default MissingPage;
