import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Seo from '../../components/Seo';
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

    const arrSelectedScore = selectedScore.split('');
    const findScore = arrSelectedScore.find((score) => score === val);
    let calScore = arrSelectedScore.concat(val).sort().join('');
    if (findScore) {
      calScore = arrSelectedScore
        .filter((score) => score !== findScore)
        .sort()
        .join('');
    }

    router.push(`/review/${selectedName}/${selectedDay}/${calScore}`);
  };

  const changeDays = async (e: React.ChangeEvent<HTMLInputElement>) => {
    router.push(`/review/${selectedName}/${e.target.value}/${selectedScore}`);
  };

  return (
    <>
      <Seo title={detail.appStore.title} />
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
  const { data: googlePlayData, headers: googlePlayHeaders } = await findReview(
    `/${name}/${day}/${score}/googlePlay`,
  );
  const { data: appStoreData, headers: appStoreHeaders } = await findReview(
    `/${name}/${day}/${score}/appStore`,
  );

  const reviews = {
    googlePlay: {
      data: googlePlayData,
      totalCount: googlePlayHeaders['total-count'],
    },
    appStore: {
      data: appStoreData,
      totalCount: appStoreHeaders['total-count'],
    },
  };

  return {
    props: { reviews, detail, name, day, score },
  };
};
