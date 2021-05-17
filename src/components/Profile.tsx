import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { UserInfoContext } from '../contexts/UserInfoContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
  const { level } = useContext(ChallengesContext);
  const { name, login } = useContext(UserInfoContext);
  return (
    <div className={styles.profileContainer}>
      {login &&
      <>
      <img src={`https://github.com/${login}.png`} alt="image profile" />
      <div>
        <strong>{name !== null ? name : 'Usuário'}</strong>
        <p>
          <img src="icons/level.svg" alt="level"/>
          level {level}
        </p>
      </div>
      </>
      }
    </div>
  );
}