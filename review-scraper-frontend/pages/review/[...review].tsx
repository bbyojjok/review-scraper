import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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
  const [currentReview, setCurrentReview] = useState<any>(reviews);
  const [currentDay, setCurrentDay] = useState<string>(selectedDay);
  const [currentScore, setCurrentScore] = useState<string>(selectedScore);
  const [name, day, score] = router.query.review as string[];

  useEffect(() => {
    if (!day || !score) {
      router.replace(`/review/${name}/${selectedDay}/${selectedScore}`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeScore = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (currentScore === val) {
      return;
    }

    const findScore = currentScore.split('').find((score) => score === val);
    let calScore = '';
    if (findScore) {
      calScore = currentScore
        .split('')
        .filter((score) => score !== findScore)
        .sort()
        .join('');
    } else {
      calScore = currentScore.split('').concat(val).sort().join('');
    }

    const { data: reviews } = await findReview(
      `/${selectedName}/${currentDay}/${calScore}`,
    );

    setCurrentScore(calScore);
    setCurrentReview(reviews);

    console.log('calScore:', calScore);
    console.log('currentScore:', currentScore);

    router.push(
      `/review/${selectedName}/${currentDay}/${calScore}`,
      undefined,
      {
        shallow: true,
      },
    );
  };

  const changeDays = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const { data: reviews } = await findReview(
      `/${selectedName}/${val}/${currentScore}`,
    );

    setCurrentDay(val);
    setCurrentReview(reviews);

    router.push(`/review/${selectedName}/${val}/${currentScore}`, undefined, {
      shallow: true,
    });
  };

  return (
    <>
      <Sort
        detail={detail}
        selectedScore={currentScore.split('')}
        selectedDay={currentDay}
        changeScore={changeScore}
        changeDays={changeDays}
      />
      <Reviews detail={detail} reviews={currentReview} />
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
