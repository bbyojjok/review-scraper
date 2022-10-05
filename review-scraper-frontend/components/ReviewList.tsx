import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { MdStar, MdSubdirectoryArrowRight } from 'react-icons/md';
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

  .review-list {
    li {
      margin-top: 15px;
      padding: 10px;
      font-size: 12px;
      background-color: #333;
      border-radius: 5px;

      &:first-of-type {
        margin-top: 0;
      }

      &.center {
        padding-top: 20px;
        padding-bottom: 20px;
        text-align: center;
      }

      .info {
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 10px;

        .title {
          width: calc(100% - 80px);
        }

        .date {
          text-align: right;
          width: 80px;
        }

        .rate {
          width: 65px;
        }

        .author {
          text-align: right;
          width: calc(100% - 65px);
          word-break: break-word;
        }
      }

      .text {
        line-height: 1.4;
        word-break: break-word;
      }

      .reply-text {
        margin-top: 15px;
        padding: 10px;
        background-color: #444;
        border-radius: 5px;
        word-break: break-word;

        p {
          display: flex;
          justify-content: space-between;
          padding-bottom: 5px;
        }
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
  const isGooglePlay = os === 'GooglePlay';

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
      <InfiniteScroll
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
      >
        <ul className="review-list">
          {reviewList.length === 0 && (
            <li className="center">${os} 리뷰가 없습니다.</li>
          )}
          {reviewList.map(({ _id, review }: any) => {
            const {
              author,
              title,
              comment,
              rate,
              userName,
              text,
              scoreText,
              date,
              replyText,
              replyDate,
            } = review;
            const star = isGooglePlay ? scoreText : rate;

            return (
              <li key={_id}>
                <div className="info">
                  <p className="title">{isGooglePlay || title}</p>
                  <p className="date">{date}</p>
                </div>
                <div className="info">
                  <p className="rate">
                    {Array(parseInt(star, 10))
                      .fill(0)
                      .map((val, idx) => (
                        <MdStar key={star + idx} />
                      ))}
                  </p>
                  <p className="author">{isGooglePlay ? userName : author}</p>
                </div>
                <div className="text">{isGooglePlay ? text : comment}</div>
                {isGooglePlay && replyText && (
                  <div className="reply-text">
                    <p>
                      <MdSubdirectoryArrowRight />
                      {replyDate}
                    </p>
                    {replyText}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </InfiniteScroll>
    </ReviewListBlock>
  );
};

export default ReviewList;
