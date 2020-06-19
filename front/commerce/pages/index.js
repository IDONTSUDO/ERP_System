import Main from '../components/Header'
import Layout from '../components/Layout.js'

import Head from 'next/head';

export default () => <div>
      <Head>
        </Head>

    <Layout/><Main/>

    <style global jsx>{`
          body {
        font-family: 'Open Sans Condensed', sans-serif;
            src: url('fonts/OpenSans-Bold.ttf');
        }
        `}</style>
    </div>