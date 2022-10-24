import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { UAParser } from 'ua-parser-js';
import styled from '@emotion/styled';
import { BiLoaderAlt } from 'react-icons/bi';
import { useQuery } from '@tanstack/react-query';
import ReviewListItem from './ReviewListItem';
import { findReview, getReview } from '../lib/api';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

const ReviewListBlock = styled.div`
  overflow-y: auto;
  height: calc(100% - 50px);

  &.customScroll::-webkit-scrollbar {
    width: 5px;
  }

  &.customScroll::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: rgba(255, 255, 255, 0.5);
  }
  &.customScroll::-webkit-scrollbar-thumb:hover {
    background-color: rgba(255, 255, 255, 0.7);
  }

  .message-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px 0;

    span {
      font-size: 13px;
      margin-right: 5px;
    }

    .icon {
      animation: rotate 0.75s linear infinite;
    }

    @keyframes rotate {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
`;

type ReviewListProps = {
  os: string;
  list: any;
  totalCount: number;
};

const ReviewList = ({ os, list, totalCount }: ReviewListProps) => {
  const router = useRouter();
  const [name, day, score] = router.query.review as string[];
  const scrollableDivRef = useRef<HTMLDivElement>(null);
  const [reviewList, setReviewList] = useState<any>(list);
  const [reviewPage, setReviwPage] = useState<number>(2);
  const [hasNextPage, setHasNextPage] = useState<boolean>(totalCount >= 10);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const loadMore = async () => {
    setLoading(true);
    try {
      const url = `/${name}/${day}/${score}/${
        os === 'GooglePlay' ? 'googlePlay' : 'appStore'
      }?page=${reviewPage}`;

      // TODO 유즈쿼리 스크롤링 로드모어 이벤트에서는 작동안함
      // const response = useQuery(['reviews', url], () => getReview(url));
      // console.log(response.error);
      // console.log('## response:', response);

      const { data, headers } = await findReview(url);
      setReviewList((prevState: any) => prevState.concat(data));
      if (reviewPage === parseInt(headers['last-page'])) {
        setHasNextPage(false);
      }
      setReviwPage((prevState) => prevState + 1);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: !!error,
    rootMargin: '0px 0px 0px 0px',
  });

  useEffect(() => {
    setHasNextPage(totalCount > 10);
    setReviewList(list);
    setReviwPage(2);
    scrollableDivRef.current?.scrollTo(0, 0);
  }, [totalCount, list]);

  useEffect(() => {
    const parser = UAParser();
    if (parser.os.name === 'Windows') {
      scrollableDivRef.current?.classList.add('customScroll');
    }
  }, []);

  /*
  // TODO react-intersection-observer 라이브러리를 이용해서 스크롤 엔드시점을 알고 useInfiniteQuery를 이용하여 무한스크롤 작업 확인하기
  const { ref, inView } = useInView();
  const { data } = useInfiniteQuery(
    [`reviewsInfinite-${reviewPage}`],
    async () => {
      const url = `/${name}/${day}/${score}/${
        os === 'GooglePlay' ? 'googlePlay' : 'appStore'
      }?page=${reviewPage}`;
      const { data } = await getReview(url);
      return data;
    },
    {},
  );
  console.log(data);
  */

  return (
    <ReviewListBlock ref={scrollableDivRef}>
      {/* <h2>{`Header inside viewport ${inView}.`}</h2> */}

      <ul className="review-list">
        {reviewList.length === 0 && (
          <ReviewListItem os={os} reviewData={false} />
        )}
        {reviewList.map(({ _id, review }: any) => (
          <ReviewListItem key={_id} os={os} reviewData={review} />
        ))}
      </ul>
      {(loading || hasNextPage) && (
        <div ref={sentryRef} className="message-loading">
          <span>loading...</span>
          <BiLoaderAlt className="icon" />
        </div>
      )}

      {/* <div ref={ref}>
        <h2>{`Header inside viewport ${inView}.`}</h2>
      </div> */}
    </ReviewListBlock>
  );
};

export default ReviewList;
