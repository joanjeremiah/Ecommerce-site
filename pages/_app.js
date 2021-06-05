import '../styles/globals.css'
import Layout from '../Components/Layout'
import {Provider} from 'next-auth/client'

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider> 
  );
}

export default MyApp
