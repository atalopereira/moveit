import styles from  '../styles/pages/ClassificationUsers.module.css';
import ClassificationCard from '../components/ClassificationCard';

export default function classificationUsers() {
  return(
    <div className={styles.container}>
      <h1>Classificação</h1>
      <div>
        <div className={styles.columns}>
          <span>Posição</span>
          <span>Usuário</span>
          <span>Desafios</span>
          <span>Experiência</span>
        </div>
        <ClassificationCard/>
      </div>
    </div>
  );
}