import { useRouter } from 'next/router';
import { useState } from 'react';
import Cookie from 'js-cookie';
import api from '../api';
import styles from '../styles/pages/Login.module.css';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [errorUser, setErrorUser] = useState(false);

  async function signIn(event) {
    event.preventDefault();

    await api.get(username)
      .then((response) => {
        console.log('response: ', response.data);
        Cookie.set('moveit-name', response.data.name);
        Cookie.set('moveit-login', response.data.login);
        Cookie.set('moveit-id', response.data.id);
        // Cookie.set('moveit-image', response.data.avatar_url);
        router.push('/home');
      })
      .catch((error) => {
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

          <form onSubmit={signIn}>
            <div className={styles.wrapLogin}>
              <input
                type="text"
                value={username}
                onChange={handleChangeUsername}
                placeholder="Digite seu username"
              />
              <button type="submit">
                <img src="/icons/arrow-right.svg" alt="entrar" />
              </button>
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
