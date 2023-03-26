import Layout from '@/components/layout/layout'
import '@/styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        {/* All head contents will be ignored if a page has its own content for the same attribute */}
        <title>Next Events</title>
        <meta name='description' content='NextJS Events'/>
        <meta name="viewport" content='initial-scale=1.0, width=device-width'/>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
