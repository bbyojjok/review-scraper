import type { NextPage } from 'next';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Seo from '../components/Seo';
import Lists from '../components/Lists';
import { getLists } from '../lib/api/index';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';

type HomeProps = {
  lists?: any;
};

const Home: NextPage = ({}: HomeProps) => {
  const { data: lists } = useQuery(['lists'], () => getLists());

  return (
    <>
      <Seo title="Home" url="" />
      <Lists lists={lists} />
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['lists'], () => getLists());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
