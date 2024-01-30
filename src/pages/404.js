
import Head from 'next/head';
import UserLayout from 'src/layouts/UserLayout';

const Page404 = () => {

  return (
    <>
      <Head>
        <title> 404 Page </title>
      </Head>

    </>
  );
}
Page404.getLayout = (page) => <UserLayout>{page}</UserLayout>;

export default Page404;