import type { NextPage } from 'next';
import axios from 'axios';
import Lists from '../components/Lists';

type HomeProps = {
  lists?: any;
};

const Home: NextPage = ({ lists }: HomeProps) => {
  return <Lists lists={lists} />;
};

export default Home;

export const getServerSideProps = async () => {
  const { data: lists } = await axios.get('http://localhost:3000/api/list');
  return {
    props: {
      lists,
    },
  };
};
