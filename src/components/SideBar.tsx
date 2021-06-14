import React, { useContext } from 'react';
import { useRouter } from 'next/router';

import style from '../styles/components/SideBar.module.css';
import { UserInfoContext } from '../contexts/UserInfoContext';

interface SideBarProps {
  currentRoute: string
}

export default function SideBar(props: SideBarProps) {
  const { changeLoadingPage } = useContext(UserInfoContext);
  const route = useRouter();

  function goToGraphics() {
    if (route.pathname !== '/graphics') {
      changeLoadingPage();
      route.push('/graphics');
    }
  }

  function goToHome() {
    if (route.pathname !== '/home') {
      changeLoadingPage();
      route.push('/home');
    }
  }

  function goToClassification() {
    if (route.pathname !== '/classificationUsers') {
      changeLoadingPage();
      route.push('/classificationUsers'); 
    }
  }

  function goToLogin() {
    route.push('/');
  }

  return (
    <>
      {props.currentRoute !== '/' &&
        <div className={style.container}>
          <div className={style.logoIcon}>
            <img src="icons/logo.svg" alt="logo"/>
          </div>
          <div className={style.options}>
            <img
              onClick={goToGraphics}
              src="icons/graphic.svg"
              alt="graphics"
            />
            <img
              onClick={goToHome}
              src="icons/home.svg"
              alt="home"
            />
            <img
              onClick={goToClassification}
              src="icons/podium.svg"
              alt="classificação"
            />
          </div>
          <div className={style.exitOption}>
            <img
              onClick={goToLogin}
              src="icons/exit.svg"
              alt="classificação"
            />
          </div>
        </div>
      }
    </>
  );
}