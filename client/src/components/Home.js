import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

//Перенаправление с "/" на "/home"
function Home() {
  let history = useHistory();
  useEffect(() => {
    history.push('/home');
  }, []);
  return <>{}</>;
}

export default Home;
