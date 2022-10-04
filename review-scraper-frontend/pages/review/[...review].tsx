import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Reviews from '../../components/Reviews';
import Sort from '../../components/Sort';
import { findList, findReview } from '../../lib/api/index';

type ReviewProps = {
  detail: any;
  reviews: any;
  name: string;
  day: string;
  score: string;
};

const Review = ({
  detail,
  reviews,
  name: selectedName,
  day: selectedDay,
  score: selectedScore,
}: ReviewProps) => {
  const router = useRouter();
  const [name, day, score] = router.query.review as string[];

  useEffect(() => {
    if (!day || !score) {
      router.replace(`/review/${name}/${selectedDay}/${selectedScore}`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeScore = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (selectedScore === val) {
      return;
    }

    const findScore = selectedScore.split('').find((score) => score === val);
    console.log('findScore:', findScore);

    let calScore = '';
    if (findScore) {
      calScore = selectedScore
        .split('')
        .filter((score) => score !== findScore)
        .sort()
        .join('');
    } else {
      calScore = selectedScore.split('').concat(val).sort().join('');
    }
    console.log(calScore);

    router.push(`/review/${selectedName}/${selectedDay}/${calScore}`);
  };

  const changeDays = async (e: React.ChangeEvent<HTMLInputElement>) => {
    router.push(`/review/${selectedName}/${e.target.value}/${selectedScore}`);
  };

  return (
    <>
      <Sort
        detail={detail}
        selectedScore={selectedScore.split('')}
        selectedDay={selectedDay}
        changeScore={changeScore}
        changeDays={changeDays}
      />
      <Reviews detail={detail} reviews={reviews} />
    </>
  );
};

export default Review;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const [name, day = '7', score = '12345'] = params?.review as Array<string>;
  const { data: detail } = await findList(name);
  const { data: reviews } = await findReview(`/${name}/${day}/${score}`);

  return {
    props: { reviews, detail, name, day, score },
  };
};
