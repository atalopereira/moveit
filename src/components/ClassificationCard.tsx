import styles from '../styles/components/ClassificationCard.module.css';

interface ClassificationCardProps {
  level: number;
  challengesCompleted: number;
  totalExperience: number;
  username: string;
  name: string;
  position: number
}

export default function ClassficationCard({
  level, challengesCompleted, totalExperience, username, name, position
}: ClassificationCardProps) {
  return (
    <div className={styles.classification}>
      <p>{position}</p>
      <div className={styles.wrapperUserData}>
        <div className={styles.userInformation}>
          <img src={`https://github.com/${username}.png`} alt="image profile"/>
          <div>
            <strong>{name ? name : username}</strong>
            <p>
              <img src="icons/level.svg" alt="level"/>
              {`level ${level}`}
            </p>
          </div>
        </div>
        <span>
          <p>{challengesCompleted}</p>
          {challengesCompleted > 1
            ? "completados"
            : "completado"
          }
        </span>
        <span>
          <p>{totalExperience}</p> xp
        </span>
      </div>
    </div>
  );
}