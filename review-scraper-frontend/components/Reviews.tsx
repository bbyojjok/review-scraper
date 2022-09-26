import styled from '@emotion/styled';
import { MdStar, MdSubdirectoryArrowRight } from 'react-icons/md';
import ReviewTitle from './ReviewTitle';
import { Scrollbars } from 'react-custom-scrollbars-2';

const ReviewsBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 20px;
  position: absolute;
  left: 0;
  right: 0;
  top: 190px;
  bottom: 0;

  .review-wrap {
    width: 50%;
    height: 100%;
    padding-bottom: 20px;

    &:nth-of-type(1) {
      padding-right: 10px;
    }
    &:nth-of-type(2) {
      padding-left: 10px;
    }
  }

  .list-wrap {
    /* overflow-y: auto; */
    height: calc(100% - 50px);

    & > div {
      & > div:nth-of-type(3) {
        & > div {
          background-color: rgba(0, 0, 0, 0.5) !important;
        }
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
          word-break: break-all;
        }
      }

      .text {
        line-height: 1.4;
        word-break: break-all;
      }

      .reply-text {
        margin-top: 15px;
        padding: 10px;
        background-color: #444;
        border-radius: 5px;
        word-break: break-all;

        p {
          display: flex;
          justify-content: space-between;
          padding-bottom: 5px;
        }
      }
    }
  }
`;

type ReviewsProps = {
  detail: any;
  reviews: any;
};

const Reviews = ({ detail, reviews }: ReviewsProps) => {
  return (
    <ReviewsBlock>
      <div className="review-wrap">
        <ReviewTitle
          os="GooglePlay"
          score={detail.googlePlay.score.toFixed(1)}
          version={detail.googlePlay.version}
          length={reviews.googlePlay.length}
        />
        <div className="list-wrap">
          <Scrollbars universal>
            <ul className="review-list">
              {reviews.googlePlay.length === 0 && (
                <li className="center">GooglePlay 리뷰가 없습니다.</li>
              )}
              {reviews.googlePlay.map(({ _id, name, os, review }: any) => {
                const {
                  userName,
                  text,
                  scoreText,
                  date,
                  replyText,
                  replyDate,
                } = review;
                return (
                  <li key={_id}>
                    <div className="info">
                      <p className="title"></p>
                      <p className="date">{date}</p>
                    </div>
                    <div className="info">
                      <p className="rate">
                        {Array(parseInt(scoreText, 10))
                          .fill(0)
                          .map((val, idx) => (
                            <MdStar key={scoreText + idx} />
                          ))}
                      </p>
                      <p className="author">{userName}</p>
                    </div>
                    <div className="text">{text}</div>
                    {replyText && (
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
          </Scrollbars>
        </div>
      </div>
      <div className="review-wrap">
        <ReviewTitle
          os="AppStore"
          score={detail.appStore.score.toFixed(1)}
          version={detail.appStore.version}
          length={reviews.appStore.length}
        />
        <div className="list-wrap">
          <Scrollbars universal>
            <ul className="review-list">
              {reviews.appStore.length === 0 && (
                <li className="center">AppStore 리뷰가 없습니다.</li>
              )}
              {reviews.appStore.map(({ _id, name, os, review }: any) => {
                const { author, title, comment, rate, date } = review;
                return (
                  <li key={_id}>
                    <div className="info">
                      <p className="title">{title}</p>
                      <p className="date">{date}</p>
                    </div>
                    <div className="info">
                      <p className="rate">
                        {Array(parseInt(rate, 10))
                          .fill(0)
                          .map((val, idx) => (
                            <MdStar key={rate + idx} />
                          ))}
                      </p>
                      <p className="author">{author}</p>
                    </div>
                    <div className="text">{comment}</div>
                  </li>
                );
              })}
            </ul>
          </Scrollbars>
        </div>
      </div>
    </ReviewsBlock>
  );
};

export default Reviews;
