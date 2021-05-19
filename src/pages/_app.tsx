import { UserInfoProvider } from '../contexts/UserInfoContext';
import { useRouter } from 'next/router';
import SideBar from '../components/SideBar';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  const route = useRouter();
  return (
    <UserInfoProvider>
      <SideBar currentRoute={route.pathname}/>
      <Component {...pageProps} />
    </UserInfoProvider>
  );
}

export default MyApp
