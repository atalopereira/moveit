import React from 'react';
import { useRouter } from 'next/router';

import style from '../styles/components/SideBar.module.css';

interface SideBarProps {
  currentRoute: string
}

export default function SideBar(props: SideBarProps) {
  const route = useRouter();

  function goToGraphics(event) {
    event.preventDefault();
    route.push('/graphics');
  }

  function goToHome(event) {
    event.preventDefault();
    route.push('/home');
  }

  function goToClassification(event) {
    event.preventDefault();
    route.push('/classificationUsers');
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
        </div>
      }
    </>
  );
}