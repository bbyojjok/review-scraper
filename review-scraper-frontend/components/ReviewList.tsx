import styled from '@emotion/styled';
import { MdStar, MdSubdirectoryArrowRight } from 'react-icons/md';
import { Scrollbars } from 'react-custom-scrollbars-2';

const ReviewListBlock = styled.div`
  overflow-y: auto;
  height: calc(100% - 50px);

  .thumb-vertical {
    cursor: pointer;
    border-radius: inherit;
    background-color: rgba(0, 0, 0, 0.8);
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
};

const ReviewList = ({ os, list }: ReviewListProps) => {
  const isGooglePlay = os === 'GooglePlay';

  return (
    <ReviewListBlock>
      {/* <Scrollbars
        universal
        renderThumbVertical={(props) => (
          <div {...props} className="thumb-vertical" />
        )}
      > */}
      <ul className="review-list">
        {list.length === 0 && (
          <li className="center">${os} 리뷰가 없습니다.</li>
        )}
        {list.map(({ _id, review }: any) => {
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
      {/* </Scrollbars> */}
    </ReviewListBlock>
  );
};

export default ReviewList;
