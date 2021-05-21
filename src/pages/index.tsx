import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { getUserGitHub, apiUsers, getUser, createChallengesData } from '../api';
import styles from '../styles/pages/Login.module.css';
import { UserInfoContext } from '../contexts/UserInfoContext';

export default function Login() {
  const router = useRouter();
  const { storeInfoUser  } = useContext(UserInfoContext);
  const [username, setUsername] = useState('');
  const [errorUser, setErrorUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function signIn(event) {
    event.preventDefault();

    await getUserGitHub.get(username)
      .then((response) => {
        console.log('response: ', response.data);

        // If there exist username, use data, otherwise, store it in the DB 
        getUser(username)
          .then((response) => {
            const { _id: id, name, username } = response.data.result;
            storeInfoUser(id, name, username);
          })
          .catch(() => {
            const { name, id } = response.data;
            insertUser(username, name, id);
            storeInfoUser(id, name, username);
            createChallengesData(id);
          });

        setIsLoading(true);

        setTimeout(() => {
          router.push('/home');
          setIsLoading(false);
        }, 2000);
      })
      .catch((error) => {
        setErrorUser(true);
      });
  }

  async function insertUser(username: string, name: string, id: number) {
    await apiUsers(username, name, id);
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

          <form onSubmit={signIn}>
            <div className={styles.wrapLogin}>
              {isLoading ?
                <>
                  <input
                    type="text"
                    value={username}
                    placeholder="Digite seu username"
                    disabled
                  />
                  <button disabled>
                    <div className={styles.loader}/>
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
