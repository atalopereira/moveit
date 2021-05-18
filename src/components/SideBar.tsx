import React from 'react';
import { useRouter } from 'next/router';

import style from '../styles/components/SideBar.module.css';

export default function SideBar() {
  const route = useRouter();

  function goToHome(event) {
    event.preventDefault();
    route.push('/home');
  }

  function goToClassification(event) {
    event.preventDefault();
    route.push('/classificationUsers');
  }

  return (
    <main>
    <div className={style.container}>
      <div className={style.logoIcon}>
        <img src="icons/logo.svg" alt="logo"/>
      </div>
      <div className={style.options}>
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
    </main>
  );
}