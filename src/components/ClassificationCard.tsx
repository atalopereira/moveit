import styles from '../styles/components/ClassificationCard.module.css';

interface ClassificationCardProps {
  level: number;
  challengesCompleted: number;
  experience: number
}

export default function ClassficationCard({level, challengesCompleted, experience}: ClassificationCardProps) {
  console.log('classification: ', {level, challengesCompleted, experience});
  return (
    <div className={styles.classification}>
      <p>1</p>
      <div className={styles.wrapperUserData}>
        <div className={styles.userInformation}>
          <img src="https://github.com/atalopereira.png" alt="image profile"/>
          <div>
            <strong>Átalo Pereira</strong>
            <p>
              <img src="icons/level.svg" alt="level"/>
              {`level ${level}`}
            </p>
          </div>
        </div>
        <span>
          <p>{challengesCompleted}</p> completados
        </span>
        <span>
          <p>{experience}</p> xp
        </span>
      </div>
    </div>
  );
}