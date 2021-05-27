import styles from '../styles/components/ClassificationCard.module.css';

export default function ClassficationCard() {
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
              level 1
            </p>
          </div>
        </div>
        <p>
          <p>127</p> completados
        </p>
        <p>
          <p>154000</p> xp
        </p>
      </div>
    </div>
  );
}