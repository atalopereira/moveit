import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import style from '../styles/pages/Graphics.module.css';

const options: Highcharts.Options = {
  chart: {
    type: 'column'
  },

  title: {
    text: 'Progresso semanal',
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
    data: [29, 71, 106, 129, 144, 176, 135]
  }]
}

export default function Graphics() {
  return(
    <div className={style.container}>
      <h1>Graficos</h1>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  );
}
