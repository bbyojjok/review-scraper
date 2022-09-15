import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Reviews from '../../components/Reviews';
import Sort from '../../components/Sort';

type ReviewProps = {
  detail: any;
  reviews: any;
  name: string;
  day: string;
  score: string[];
};

export default function Review({
  detail,
  reviews,
  name: selectedName,
  day: selectedDay,
  score: selectedScore,
}: ReviewProps) {
  const router = useRouter();
  const [name, day, score] = router.query.review as string[];

  console.log(selectedName, selectedDay, selectedScore);
  console.log(reviews);

  useEffect(() => {
    if (!day || !score) {
      router.replace(`/${name}/${selectedDay}/${selectedScore.join('')}`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeScore = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (selectedScore.join('') === val) {
      return;
    }

    let url = `/${name}/${day}/`;
    const findScore = selectedScore.find((score) => score === val);
    if (findScore) {
      url += selectedScore
        .filter((score) => score !== findScore)
        .sort()
        .join('');
    } else {
      url += selectedScore.concat(val).sort().join('');
    }
    router.push(url);
  };

  const changeDays = (e: React.ChangeEvent<HTMLInputElement>) => {
    router.push(`/${name}/${e.target.value}/${score}`);
  };

  return (
    <>
      <Sort
        detail={detail}
        selectedScore={selectedScore}
        selectedDay={selectedDay}
        changeScore={changeScore}
        changeDays={changeDays}
      />
      <Reviews detail={detail} reviews={reviews} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const [name, day = '7', score = '1'] = params?.review as Array<string>;

  let url = `http://localhost:8083/api/review/day/${name}`;
  if (day) {
    url += `/${day}`;
  }
  if (score) {
    url += `/${score}`;
  }

  const { data: googlePlay } = await axios.get(`${url}/googlePlay`);
  const { data: appStore } = await axios.get(`${url}/appStore`);
  const { data: detail } = await axios.get(
    `http://localhost:8083/api/list/${name}`,
  );

  return {
    props: {
      reviews: { googlePlay, appStore },
      detail,
      name,
      day,
      score: score.split(''),
    },
  };
};
