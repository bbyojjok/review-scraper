import styled from '@emotion/styled';
import { MdStar, MdSubdirectoryArrowRight } from 'react-icons/md';
import ReviewTitle from './ReviewTitle';

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
    overflow-y: auto;
    height: calc(100% - 50px);
  }

  .review-list {
    li {
      margin-top: 15px;
      padding: 10px;
      font-size: 12px;
      background-color: #333;
      border-radius: 5px;

      &:first-child {
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
          width: calc(100% - 100px);
        }

        .date {
          text-align: right;
          width: 100px;
        }

        .rate {
          width: 90px;
        }

        .author {
          text-align: right;
          width: calc(100% - 90px);
        }
      }

      .text {
        line-height: 1.4;
      }

      .reply-text {
        margin-top: 15px;
        padding: 10px;
        background-color: #444;
        border-radius: 5px;

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
          <ul className="review-list">
            {reviews.googlePlay.length === 0 && (
              <li className="center">googlePlay 리뷰가 없습니다.</li>
            )}
            {reviews.googlePlay.map(({ _id, name, os, review }: any) => {
              const { userName, text, scoreText, date, replyText, replyDate } =
                review;
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
          <ul className="review-list">
            {reviews.appStore.length === 0 && (
              <li className="center">appStore 리뷰가 없습니다.</li>
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
        </div>
      </div>
    </ReviewsBlock>
  );
};

export default Reviews;
