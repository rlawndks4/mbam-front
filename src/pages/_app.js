

import Head from 'next/head';
import '../../styles/globals.css'
import theme from 'src/styles/theme';
import { ThemeProvider } from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "react-quill/dist/quill.snow.css";
import "react-quill-emoji/dist/quill-emoji.css";
import { useEffect, useState } from 'react';
import Script from 'next/script';
import { store } from '../redux/store';
import { Provider as ReduxProvider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import axios from 'axios';

const App = (props) => {
  const { Component, pageProps, head_data = {} } = props;
  const getLayout = Component.getLayout ?? ((page) => page);
  const [headData, setHeadData] = useState({});
  const router = useRouter();
  useEffect(() => {
    getHeadData(head_data);
  }, [router])

  const getHeadData = async (head_data_ = {}) => {
    let head_obj = head_data_;
    if (Object.keys(head_obj).length > 0) {
      setHeadData(head_obj)
    } else {
      let shop_id = -1;
      let post_id = -1;
      let post_table = -1;
      let route_list = router.asPath.split('/');
      if (route_list[1] == 'shop') {
        shop_id = route_list[4];
      } else if (route_list[1] == 'post') {
        post_id = route_list[3];
        post_table = route_list[2];
      }
      const { data: response } = await axios.get(`/api/setting?shop_id=${shop_id}&post_table=${post_table}&post_id=${post_id}`);
      setHeadData(response?.data);
    }
  }
  return (
    <>
      <Head>
        <title>{head_data?.meta_title || headData?.meta_title}</title>
        <meta name="description" content={head_data?.meta_description || headData?.meta_description} />
        <meta name="title" property="og:title" content={head_data?.meta_title || headData?.meta_title} />
        <meta name="keywords" content={head_data?.meta_keywords || headData?.meta_keywords} />
        <meta name="description" property="og:description" content={head_data?.meta_description || headData?.meta_description} />
        <meta name="google" content="notranslate" />
        <meta property="og:site_name" content={"마사지고수"} />
        <meta name="image" property="og:image" content={head_data?.og_image || headData?.og_image || "/assets/images/test/ogimage.png"} />
        <meta name="google-site-verification" content="FTUivJR1xukVHHU2LMvDbn22cgE2ftcR1-DxRPhjJ1A" />
        <meta name="naver-site-verification" content="3f056655e3a151c86be45c4a31dce9b02368ec8d" />
        <link rel='shortcut icon' href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/test/logo.png" />
        <meta name="google-site-verification" content="9n-0C-1LYCb57If3DzJzfBj4OYpsUooRq5IBdJ9Abwg" />
        <Script type="application/ld+json">
          {{
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "마사지고수",
            "url": "https://mago1004.com/"
          }}
        </Script>
        <Script
          strategy='beforeInteractive'
          src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=3fbdbua1qd`}
        ></Script>
      </Head>
      <ReduxProvider store={store}>
        <ThemeProvider theme={theme}>
          {getLayout(<Component {...pageProps} />)}
          <Toaster position={'right-top'} toastOptions={{ className: 'react-hot-toast' }} />
        </ThemeProvider>
      </ReduxProvider>
    </>
  );
}

App.getInitialProps = async (context) => {
  const { ctx } = context;
  try {
    let head_data = {}
    const host = ctx?.req?.headers?.host ? ctx?.req?.headers.host.split(':')[0] : '';
    let uri = ctx?.req?.headers['x-invoke-path'] ?? "";
    let shop_id = -1;
    let post_id = -1;
    let post_table = "";
    let route_list = uri.split('/');
    if (route_list[1] == 'shop') {
      shop_id = route_list[4]
    } else if (route_list[1] == 'post') {
      post_id = route_list[3];
      post_table = route_list[2];
    }
    if (host) {
      const url = `${process.env.BACK_URL}/api/setting?shop_id=${shop_id}&post_table=${post_table}&post_id=${post_id}`;
      const res = await fetch(url);
      head_data = await res.json();
      let dns_data = head_data?.data
      dns_data['og_image'] = dns_data?.img_src ? (process.env.BACK_URL + dns_data?.img_src) : ""
      return {
        head_data: dns_data,
      }
    } else {
      return {
        head_data: {},
      }
    }
  } catch (err) {
    console.log(err)
    return {
      head_data: {},
    }
  }
};
export default App
