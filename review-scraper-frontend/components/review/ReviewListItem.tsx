import React from 'react';
import styled from '@emotion/styled';
import { MdStar, MdSubdirectoryArrowRight } from 'react-icons/md';

const ReviewListItemBlock = styled.li`
  margin-top: 15px;
  padding: 10px;
  font-size: 12px;
  background-color: #333;
  border-radius: 5px;
  transition: all 0.2s;
  border: 1px solid transparent;

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
      display: flex;
      align-items: center;
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

  @media (hover: hover) {
    &:hover {
      border: 1px solid #fff;
    }
  }
`;

type ReviewListItemProps = {
  os: string;
  reviewData: any;
};

const ReviewListItem = ({ os, reviewData }: ReviewListItemProps) => {
  const isGooglePlay = os === 'GooglePlay';
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
  } = reviewData;
  const star = isGooglePlay ? scoreText : rate;

  return (
    <ReviewListItemBlock className={reviewData ? '' : 'center'}>
      {reviewData ? (
        <>
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
        </>
      ) : (
        `${os} 리뷰가 없습니다.`
      )}
    </ReviewListItemBlock>
  );
};

export default React.memo(ReviewListItem);
