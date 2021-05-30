import styles from  '../styles/pages/ClassificationUsers.module.css';
import ClassificationCard from '../components/ClassificationCard';
import { getAllChallengesData } from '../api';
import { GetServerSideProps } from 'next';

interface ClassificationItem {
  _id: number;
  level: number;
  experience: number;
  challengesCompleted: number;
}

interface ClassificationProps {
  [index: number]: ClassificationItem
}

export default function classificationUsers(props: ClassificationProps) {
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
        {props &&
          Object.keys(props).map((index, item) => (
            <ClassificationCard
              key={index}
              level={props[item].level}
              challengesCompleted={props[item].challengesCompleted}
              experience={props[item].experience}
            />
          ))
        }
      </div>
    </div>
  );
}

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
//   const resultChallenges = await getAllChallengesData()
//     .then((responseChallenges) => {
      
//       return responseChallenges.data;

//     })
//     .catch(() => {
//       return {}
//     });
    

  
//   return {
//     props: { ...resultChallenges }
//   }
// }