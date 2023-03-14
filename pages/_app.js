import '../styles/globals.css'
import '../public/css/normalize.css'
import '../public/css/main.css'
import '../public/css/project2.css'
import '../public/css/Myinfo.css'
import '../public/css/list.css'
import '../public/css/view.css'
import Layout from "./layout/Layout";

function MyApp({ Component, pageProps }) {
  return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
      )
}

export default MyApp
