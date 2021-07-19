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
            <svg onClick={goToGraphics} width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M36 34.7143C36 35.0553 35.8645 35.3823 35.6234 35.6234C35.3823 35.8645 35.0553 36 34.7143 36H3.85714C2.83416 36 1.85309 35.5936 1.12973 34.8703C0.406377 34.1469 0 33.1658 0 32.1429V1.28571C0 0.944722 0.135459 0.617695 0.376577 0.376577C0.617695 0.135459 0.944722 0 1.28571 0C1.62671 0 1.95373 0.135459 2.19485 0.376577C2.43597 0.617695 2.57143 0.944722 2.57143 1.28571V32.1429C2.57143 32.4838 2.70689 32.8109 2.94801 33.052C3.18912 33.2931 3.51615 33.4286 3.85714 33.4286H34.7143C35.0553 33.4286 35.3823 33.564 35.6234 33.8051C35.8645 34.0463 36 34.3733 36 34.7143Z" fill="black"/>
              <path d="M23.1429 6.42854C23.1429 6.08754 23.2783 5.76052 23.5194 5.5194C23.7606 5.27828 24.0876 5.14282 24.4286 5.14282H34.7143C35.0553 5.14282 35.3823 5.27828 35.6234 5.5194C35.8645 5.76052 36 6.08754 36 6.42854V16.7143C36 17.0552 35.8645 17.3823 35.6234 17.6234C35.3823 17.8645 35.0553 18 34.7143 18C34.3733 18 34.0463 17.8645 33.8052 17.6234C33.564 17.3823 33.4286 17.0552 33.4286 16.7143V9.53225L21.4817 21.4817C21.3623 21.6014 21.2204 21.6964 21.0642 21.7612C20.908 21.826 20.7406 21.8594 20.5714 21.8594C20.4023 21.8594 20.2349 21.826 20.0787 21.7612C19.9225 21.6964 19.7806 21.6014 19.6612 21.4817L15.4286 17.2465L7.33887 25.3388C7.09744 25.5802 6.77001 25.7159 6.42858 25.7159C6.08716 25.7159 5.75972 25.5802 5.5183 25.3388C5.27687 25.0974 5.14124 24.77 5.14124 24.4285C5.14124 24.0871 5.27687 23.7597 5.5183 23.5183L14.5183 14.5183C14.6377 14.3985 14.7796 14.3035 14.9358 14.2387C15.092 14.1739 15.2595 14.1405 15.4286 14.1405C15.5977 14.1405 15.7652 14.1739 15.9214 14.2387C16.0776 14.3035 16.2194 14.3985 16.3389 14.5183L20.5714 18.7534L31.6106 7.71425H24.4286C24.0876 7.71425 23.7606 7.57879 23.5194 7.33767C23.2783 7.09656 23.1429 6.76953 23.1429 6.42854Z" fill="black"/>
            </svg>
            
            <svg onClick={goToHome} width="47" height="44" viewBox="0 0 47 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M24.4369 0L46.4197 20.0472L43.9656 22.5013L40.4747 19.3352V41.8918L38.7465 43.62H28.3772L26.649 41.8918V29.7943H19.7361V41.8918L18.0079 43.62H7.63869L5.91048 41.8918V19.3629L2.45406 22.5013L0 20.0472L21.9483 0H24.4369ZM9.36689 16.221V40.1636H16.2797V28.0661L18.0079 26.3379H28.3772L30.1054 28.0661V40.1636H37.0182V16.2002L23.1926 3.6638L9.36689 16.221Z" fill="black"/>
            </svg>

            <svg onClick={goToClassification} width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.25 16.25V46.3125C3.25 46.528 3.3356 46.7347 3.48798 46.887C3.64035 47.0394 3.84701 47.125 4.0625 47.125H17.875V16.25C17.875 15.819 17.7038 15.4057 17.399 15.101C17.0943 14.7962 16.681 14.625 16.25 14.625H4.875C4.44402 14.625 4.0307 14.7962 3.72595 15.101C3.4212 15.4057 3.25 15.819 3.25 16.25V16.25Z" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M32.5 4.875H19.5C19.069 4.875 18.6557 5.0462 18.351 5.35095C18.0462 5.6557 17.875 6.06902 17.875 6.5V47.125H34.125V6.5C34.125 6.06902 33.9538 5.6557 33.649 5.35095C33.3443 5.0462 32.931 4.875 32.5 4.875V4.875Z" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M47.125 21.125H35.75C35.319 21.125 34.9057 21.2962 34.601 21.601C34.2962 21.9057 34.125 22.319 34.125 22.75V47.125H47.9375C48.153 47.125 48.3597 47.0394 48.512 46.887C48.6644 46.7347 48.75 46.528 48.75 46.3125V22.75C48.75 22.319 48.5788 21.9057 48.274 21.601C47.9693 21.2962 47.556 21.125 47.125 21.125Z" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
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