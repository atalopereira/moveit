import { UserInfoProvider } from '../contexts/UserInfoContext';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <UserInfoProvider>
      <Component {...pageProps} />
    </UserInfoProvider>
  );
}

export default MyApp
