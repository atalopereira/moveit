import { useContext, useEffect } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router';

import { getUser } from '../api';
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChallengeBox";
import Loader from "../components/Loader";

import styles from '../styles/pages/Home.module.css';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { UserInfoContext } from '../contexts/UserInfoContext';

interface HomeProps {
  level: number;
  experience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  const router = useRouter();
  const {
    isLoadingLogin, changeLoandingLogin, isLoadingPage, changeLoadingPage
  } = useContext(UserInfoContext);

  useEffect(() => {
    const token = Cookie.get('moveitName');
    if (!token) {
      router.replace('/');
    } else if (isLoadingLogin) {
      changeLoandingLogin();
    }

    if (isLoadingPage) {
      changeLoadingPage();
    }
  }, []);

  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.experience}
      challengesCompleted={props.challengesCompleted}
    >
      {isLoadingPage &&
        <Loader
          background={true}
        />
      }
      <div className={styles.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>
        <ExperienceBar/>
        <CountdownProvider>
          <section>
            <div>
              <Profile/>
              <CompletedChallenges/>
              <Countdown/>
            </div>

            <div>
              <ChallengeBox/>
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { moveitId } = ctx.req.cookies;
  const id = Number(moveitId);

  const result = await getUser(id)
    .then((response) => {
      return response.data.result;
    })
    .catch(() => {
      return {}
    });

  return {
    props: {
      ...result.challenges
    }
  }
}