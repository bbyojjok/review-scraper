import type { NextPage } from 'next';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Seo from '../components/Seo';
import Lists from '../components/Lists';
import { findList } from '../lib/api/index';
import wrapper from '../store';
import { END } from 'redux-saga';

type HomeProps = {
  lists?: any;
};

const Home: NextPage = ({ lists }: HomeProps) => {
  return (
    <>
      <Seo title="Home" />
      <Lists lists={lists} />
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(
    (store) => async (context: GetServerSidePropsContext) => {
      // store.dispatch();
      // store.dispatch(END);
      // await store.sagaTasks.toPromise();

      const { data: lists } = await findList();

      return {
        props: {
          lists,
        },
      };
    },
  );
