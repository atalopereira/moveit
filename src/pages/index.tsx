import { useRouter } from 'next/router';
import Cookie from 'js-cookie';
import styles from '../styles/pages/Login.module.css';

export default function Login() {
  const router = useRouter();

  function signIn() {
    Cookie.set('token-moveit', 'custom-token-here');
    router.push('/home');
  }

  function signOut() {
    Cookie.remove('token-moveit');
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

          <div className={styles.wrapLogin}>
            <input />
            <button type="button" onClick={signIn}>
              <img src="/icons/arrow-right.svg" alt="entrar" />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
