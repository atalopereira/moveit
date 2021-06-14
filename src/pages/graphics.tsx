import React, { useContext, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import style from '../styles/pages/Graphics.module.css';
import { getUser } from '../api';
import { UserInfoContext } from '../contexts/UserInfoContext';
import Loader from '../components/Loader';

interface GraphicProps {
  segunda: number,
  terça: number,
  quarta: number,
  quinta: number,
  sexta: number,
  sábado: number,
  domingo: number
}

const options = (data: number[]) => ({
  chart: {
    type: 'column',
    marginTop: 20
  },

  title: {
    text: '',
    style: {
      fontWeight: 'bold'
    }
  },

  xAxis: {
    categories: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
    title: {
      text: 'Dias da semana',
      margin: 20,
      style: {
        fontSize: '15',
        fontWeight: 'bold'
      }
    },
    labels: {
      style: {
        fontSize: '15'
      }
    }
  },

  yAxis: {
    softMax: 30,
    title: {
      text: 'Experiência',
      margin: 20,
      style: {
        fontSize: '15',
        fontWeight: 'bold'
      }
    },
    labels: {
      style: {
        fontSize: '15'
      }
    }
  },

  tooltip: {
    enabled: false
  },

  legend: {
    enabled: false
  },

  credits: {
    enabled: false
  },

  plotOptions: {
    series: {
      dataLabels: {
        enabled: true,
        format: '{point.y:.0f} xp',
        style: {
          fontSize: '15'
        }
      }
    }
  },

  series: [{
    type: 'column',
    data
  }]
})


export default function Graphics(props: GraphicProps) {
  const { isLoadingPage, changeLoadingPage } = useContext(UserInfoContext);
  const [xpWeek, setXpWeek] = useState(Object.values(props));
  
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
      <div className={style.container}>
        <h1>Progresso semanal</h1>
        <HighchartsReact
          highcharts={Highcharts}
          options={options(xpWeek)}
        />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { moveitId } = ctx.req.cookies;
  const id = Number(moveitId);

  const result = await getUser(id)
    .then((response) => {
      return response.data.result.history
    })
    .catch(() => {
      return {}
    });
  
  return {
    props: {
      ...result
    }
  }
}
