import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import Seo from '../../components/Seo';
import Reviews from '../../components/Reviews';
import Sort from '../../components/Sort';
import { getLists, getReview } from '../../lib/api/index';

type ReviewProps = {
  name: string;
  day: string;
  score: string;
};

const Review = ({
  name: selectedName,
  day: selectedDay,
  score: selectedScore,
}: ReviewProps) => {
  const router = useRouter();

  useEffect(() => {
    const [name, day, score] = router.query.review as string[];
    if (!day || !score) {
      router.replace(`/review/${name}/${selectedDay}/${selectedScore}`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data: detail } = useQuery(['lists', selectedName], () =>
    getLists(selectedName),
  );

  const googlePlayReviewUrl = `/${selectedName}/${selectedDay}/${selectedScore}/googlePlay`;
  const { data: googlePlayData } = useQuery(
    ['reviews', googlePlayReviewUrl],
    () => getReview(googlePlayReviewUrl),
  );

  const appStoreReviewUrl = `/${selectedName}/${selectedDay}/${selectedScore}/appStore`;
  const { data: appStoreData } = useQuery(['reviews', appStoreReviewUrl], () =>
    getReview(appStoreReviewUrl),
  );

  const reviews = {
    googlePlay: {
      data: googlePlayData?.data,
      totalCount: googlePlayData?.totalCount,
    },
    appStore: {
      data: appStoreData?.data,
      totalCount: appStoreData?.totalCount,
    },
  };

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
      <Seo title={detail.appStore.title} url={router.asPath} />
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

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['lists', name], () => getLists(name));

  const googlePlayReviewUrl = `/${name}/${day}/${score}/googlePlay`;
  await queryClient.prefetchQuery(['reviews', googlePlayReviewUrl], () =>
    getReview(googlePlayReviewUrl),
  );

  const appStoreReviewUrl = `/${name}/${day}/${score}/appStore`;
  await queryClient.prefetchQuery(['reviews', appStoreReviewUrl], () =>
    getReview(appStoreReviewUrl),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      name,
      day,
      score,
    },
  };
};
