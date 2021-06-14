import styles from '../styles/components/Loader.module.css';

interface LoaderProps {
  background: boolean;
}

export default function Loader({ background } : LoaderProps) {
  return (
    <div className={background ? styles.background : ''}>
      <div className={styles.loader}/>
    </div>
  );
}