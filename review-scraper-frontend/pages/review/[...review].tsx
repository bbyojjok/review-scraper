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
  score: string[];
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
      router.replace(
        `/review/${name}/${selectedDay}/${selectedScore.join('')}`,
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeScore = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (selectedScore.join('') === val) {
      return;
    }

    let url = `/review/${name}/${day}/`;
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
    router.push(`/review/${name}/${e.target.value}/${score}`);
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
};

export default Review;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const [name, day = '7', score = '12345'] = params?.review as Array<string>;
  const url = `/${name}/${day}/${score}`;

  const { data: googlePlay } = await findReview(`${url}/googlePlay`);
  const { data: appStore } = await findReview(`${url}/appStore`);
  const { data: detail } = await findList(name);

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
