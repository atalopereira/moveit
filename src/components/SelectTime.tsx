import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import Select from 'react-select';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/SelectTime.module.css';

interface OptionsSelect {label: string, value: number}

const options = [
  { value: 0.1, label: '6 seg (teste)' },
  { value: 15, label: '15 minutos' },
  { value: 25, label: '25 minutos' }
];

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isFocused ? '#fff' : '#2E384D',
    background: state.isFocused ? '#a0a8fd' : '#fff',
    cursor: 'pointer'
  }),
  control: (provided) => ({
    ...provided,
    width: '160px',
    color: '#666666',
    borderRadius: 5,
    cursor: 'pointer'
  }),
}

const SelectTime = () => {
  const { changeMinutes, selectMinutes } = useContext(CountdownContext);
  const [indexTime, setIndexTime] = useState(options[2]);

  useEffect(() => {
    const index = options.findIndex((element) => {
      return element.value === selectMinutes
    });
    setIndexTime(options[index]);
  }, [selectMinutes]);

  function handleChangeMinutes(option: OptionsSelect) {
    changeMinutes(option.value);
  }

  return (
    <div className={styles.container}>
      <span className={styles.title}>Alterar o tempo</span>
      <Select
        styles={customStyles}
        controlShouldRenderValue={true}
        options={options}
        isSearchable={false}
        value={indexTime}
        onChange={(value: OptionsSelect) => handleChangeMinutes(value)}
      />
    </div>
  );
}

export default SelectTime;