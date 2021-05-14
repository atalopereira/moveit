import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { UserInfoContext, UserInfoProvider } from '../contexts/UserInfoContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
  const { level } = useContext(ChallengesContext);
  const { name, login } = useContext(UserInfoContext);
  return (
    <div className={styles.profileContainer}>
      <img src={`https://github.com/${login}.png`} alt="image profile" />
      <div>
        <strong>{name ? name : 'Usuário'}</strong>
        <p>
          <img src="icons/level.svg" alt="level"/>
          level {level}
        </p>
      </div>
    </div>
  );
}