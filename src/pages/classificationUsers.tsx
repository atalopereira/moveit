import { GetServerSideProps } from 'next';
import { useContext, useEffect } from 'react';
import styles from  '../styles/pages/ClassificationUsers.module.css';
import { getUsersOrderXp } from '../api';
import { UserInfoContext } from '../contexts/UserInfoContext';
import ClassificationCard from '../components/ClassificationCard';
import Loader from '../components/Loader';

interface ChallengesItem {
  level: number,
  experience: number,
  challengesCompleted: number,
  totalExperience: number,
}

interface ClassificationItem {
  _id: number;
  username: string;
  name: string;
  challenges: ChallengesItem;
}

interface ClassificationProps {
  [index: number]: ClassificationItem
}

export default function classificationUsers(props: ClassificationProps) {
  const { isLoadingPage, changeLoadingPage } = useContext(UserInfoContext);

  useEffect(() => {
    if (isLoadingPage) {
      changeLoadingPage();
    }
  }, []);

  return(
    <>
      {isLoadingPage &&
        <Loader
          background={true}
        />
      }
      <div className={styles.container}>
        <h1>Classificação</h1>
        <div>
          <div className={styles.columns}>
            <span>Posição</span>
            <span>Usuário</span>
            <span>Desafios</span>
            <span>Experiência</span>
          </div>
          <div className={styles.wrapperClassificationCard}>
            {props &&
              Object.keys(props).map((index, item) => {
                const { level, challengesCompleted, totalExperience } = props[item].challenges
                const { username, name } = props[item]

                return(
                  <ClassificationCard
                    key={index}
                    level={level}
                    challengesCompleted={challengesCompleted}
                    totalExperience={totalExperience}
                    username={username}
                    name={name}
                    position={item+1}
                  />
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
  const resultChallenges = await getUsersOrderXp()
    .then((responseChallenges) => {
      return responseChallenges.data;
    })
    .catch(() => {
      return {}
    });

  return {
    props: { ...resultChallenges }
  }
}