import styles from  '../styles/pages/ClassificationUsers.module.css';

export default function classificationUsers() {
  return(
    <div className={styles.container}>
      <h1>Leaderboard</h1>
      <div>
        <div className={styles.columns}>
          <span>Posição</span>
          <span>Usuário</span>
          <span>Desafios</span>
          <span>Experiência</span>
        </div>
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

            <p> <p>127</p> completados </p>
            <p> <p>154000</p> xp </p>

          </div>
        </div>
        
      </div>
    </div>
  );
}