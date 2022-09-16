import type { NextPage } from 'next';
import Lists from '../components/Lists';
import { findList } from '../lib/api/index';

type HomeProps = {
  lists?: any;
};

const Home: NextPage = ({ lists }: HomeProps) => {
  return <Lists lists={lists} />;
};

export default Home;

export const getServerSideProps = async () => {
  const { data: lists } = await findList();

  return {
    props: {
      lists,
    },
  };
};
