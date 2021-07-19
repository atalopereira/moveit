import React, { useContext, ChangeEvent } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/SelectTime.module.css';

const SelectTime = () => {
  const { changeMinutes, selectMinutes } = useContext(CountdownContext);

  function handleChangeMinutes(event: ChangeEvent<HTMLSelectElement>) {
    console.log('select: ', Number(event.target.value));
    changeMinutes(Number(event.target.value));
  }

  return (
    <div className={styles.container}>
      <span className={styles.title}>Altere o tempo</span>
      <select
        className={styles.select}
        value={selectMinutes}
        onChange={(event) => handleChangeMinutes(event)}
      >
        <option value={0.1}>6 segundos (teste)</option>
        <option value={15}>15 minutos</option>
        <option value={25}>25 minutos</option>
      </select>
    </div>
  );
}

export default SelectTime;