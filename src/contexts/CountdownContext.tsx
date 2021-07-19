import Cookies from "js-cookie";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  selectMinutes: number;
  startCountdown: () => void;
  resetCountdown: () => void;
  changeMinutes: (minutes: number) => void;
}

interface CountdownProviderProps {
  children: ReactNode
}

export const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children } : CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [selectMinutes, setSelectMinutes] = useState(25);
  const [time, setTime] = useState(selectMinutes * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function changeMinutes(minutes: number) {
    Cookies.set('minutes', String(minutes));
    setSelectMinutes(minutes);
    setTime(minutes * 60);
  }

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setHasFinished(false);
    setTime(selectMinutes * 60);
  }

  useEffect(() => {
    // Checked if there is minutes in cookie
    const minutesStored = Cookies.get('minutes');
    if (minutesStored) {
      setSelectMinutes(Number(minutesStored));
      setTime(Number(minutesStored) * 60);
    } else {
      Cookies.set('minutes', "25");
      setSelectMinutes(25);
      setTime(25 * 60);
    }
  }, []);

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        hasFinished,
        isActive,
        selectMinutes,
        startCountdown,
        resetCountdown,
        changeMinutes
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}
