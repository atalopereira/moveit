import { UserInfoProvider } from '../contexts/UserInfoContext';
import { Provider } from 'next-auth/client'
import { useRouter } from 'next/router';
import SideBar from '../components/SideBar';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  const route = useRouter();
  return (
    <Provider session={pageProps.session}>
      <UserInfoProvider>
        <SideBar currentRoute={route.pathname}/>
        <Component {...pageProps} />
      </UserInfoProvider>
    </Provider>
  );
}

export default MyApp
