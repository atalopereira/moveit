import { useRouter } from 'next/router';
import { FormEvent, useContext, useEffect, useState } from 'react';
import {
  getUserGitHub, createUser, getUser
} from '../api';
import Loader from '../components/Loader';
import styles from '../styles/pages/Login.module.css';
import { UserInfoContext } from '../contexts/UserInfoContext';
import { signIn, useSession, getSession } from 'next-auth/client';

declare module "next-auth" {
  interface Session {
    expires?: string,
    user: {
      name?: string,
      email?: string,
      picture?: string,
      sub?: string,
      exp?: number,
      iat?: number
    }
  }
}

export default function Login() {
  const router = useRouter();
  const host = global.window && global.window.location.host;
  const [session, loading] = useSession();
  const { isLoadingLogin, storeInfoUser, changeLoandingLogin  } = useContext(UserInfoContext);
  const [username, setUsername] = useState('');
  const [errorUser, setErrorUser] = useState(false);
  
  useEffect(() => {
    console.log('session; ', session);
    if(session) {
      console.log('isLoadingLogin; ', isLoadingLogin);
      changeLoandingLogin();
      signInWithGitHub(Number(session.user.sub));
    }
  }, [session]);

  async function signInWithGitHub(userId: number) {
  // async function signInWithGitHub() {
  //   await signIn("github").then(() => {
  //     console.log('session: ', session);
  //   });
  //   console.log('session: ', session);

    
    await getUserGitHub(userId)
      .then((response) => {
        const { id } = response.data;

        // If there exist user in DB, use data, otherwise, store it in the DB
        getUser(id, host)
          .then((response) => {
            const { _id: id, name, username } = response.data.result;
            storeInfoUser(id, name, username);
          })
          .catch(() => {
            const { name, id } = response.data;
            createUser(username, name, id, host);
            storeInfoUser(id, name, username);
          });

        setTimeout(() => {
          router.push('/home');
        }, 2000);
      })
      .catch(() => {
        setErrorUser(true);
      });
  }

  function handleChangeUsername(event: { target: HTMLInputElement }) {
    setErrorUser(false);
    setUsername(event.target.value);
  }
  
  return (
    <div className={styles.container}>
      <section>
        <div className={styles.leftSide}>
          <img src="/favicon-big.svg" alt="icon"/>
        </div>
        <div className={styles.rightSide}>
          <img src="/logo-full-white.svg" alt="logo moveit"/>
          <span>Bem-vindo</span>

          <div className={styles.wrapGitHub}>
            <img src="/icons/github.svg" alt="logo github" />
            <p>Faça o login usando sua conta do GitHub</p>
          </div>
          <button
            // onClick={() => signIn("github", { callbackUrl: 'http://localhost:3000/home' })}
            // onClick={() => signIn("github", { redirect: false })}
            onClick={() => {
              changeLoandingLogin();
              signIn("github", { redirect: false })
            }}
          >
            Entrar pelo GitHub
          </button>

          <form>
            <div className={styles.wrapLogin}>
              {isLoadingLogin ?
                <>
                  <input
                    type="text"
                    value={username}
                    placeholder="Digite seu username"
                    disabled
                  />
                  <button disabled>
                    <Loader
                      background={false}
                    />
                  </button>
                </>
              :
                <>
                  <input
                    type="text"
                    value={username}
                    onChange={handleChangeUsername}
                    placeholder="Digite seu username"
                  />
                  <button type="submit">
                    <img src="/icons/arrow-right.svg" alt="entrar" />
                  </button>
                  <button
                    // onClick={() => signIn("github", { callbackUrl: 'http://localhost:3000/home' })}
                    onClick={() => signIn("github")}
                  >
                    Entrar pelo GitHub
                  </button>
                </>
              }
            </div>
            {errorUser &&
              <p>Usuário não encontrado</p>          
            }
          </form>
        </div>
      </section>
    </div>
  )
}
