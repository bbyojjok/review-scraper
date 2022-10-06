import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import ReviewListItem from './ReviewListItem';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { BiLoaderAlt } from 'react-icons/bi';
import InfiniteScroll from 'react-infinite-scroller';
import { UAParser } from 'ua-parser-js';
import { findReview } from '../lib/api';

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
  const [hasMore, setHasMore] = useState<boolean>(totalCount >= 10);

  // 테스트
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const loadMore = async () => {
    setLoading(true);
    try {
      const url = `/${name}/${day}/${score}/${
        os === 'GooglePlay' ? 'googlePlay' : 'appStore'
      }?page=${reviewPage}`;
      const { data, headers } = await findReview(url);
      setReviewList((prevState: any) => prevState.concat(data));
      if (reviewPage === parseInt(headers['last-page'])) {
        setHasMore(false);
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
    hasNextPage: hasMore,
    onLoadMore: loadMore,
    disabled: !!error,
    rootMargin: '0px 0px 0px 0px',
  });

  useEffect(() => {
    setHasMore(totalCount > 10);
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

  const fetchMoreData = async () => {
    const url = `/${name}/${day}/${score}/${
      os === 'GooglePlay' ? 'googlePlay' : 'appStore'
    }?page=${reviewPage}`;
    const { data, headers } = await findReview(url);
    setReviewList((prevState: any) => prevState.concat(data));
    if (reviewPage === parseInt(headers['last-page'])) {
      setHasMore(false);
    }
    setReviwPage((prevState) => prevState + 1);
  };

  return (
    <ReviewListBlock id={`scrollableDiv${os}`} ref={scrollableDivRef}>
      {/* <InfiniteScroll
        pageStart={reviewPage}
        loadMore={fetchMoreData}
        hasMore={hasMore}
        loader={
          <div className="message-loading" key={0}>
            <span>loading...</span>
            <BiLoaderAlt className="icon" />
          </div>
        }
        useWindow={false}
      > */}
      <ul className="review-list">
        {reviewList.length === 0 && (
          <ReviewListItem os={os} reviewData={false} />
        )}
        {reviewList.map(({ _id, review }: any) => (
          <ReviewListItem key={_id} os={os} reviewData={review} />
        ))}
      </ul>

      {(loading || hasMore) && (
        <div ref={sentryRef} className="message-loading">
          <span>loading...</span>
          <BiLoaderAlt className="icon" />
        </div>
      )}

      {/* </InfiniteScroll> */}
    </ReviewListBlock>
  );
};

export default ReviewList;
