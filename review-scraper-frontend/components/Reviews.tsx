import styled from '@emotion/styled';

const ReviewsBlock = styled.div`
  display: flex;
  flex-wrap: wrap;

  & > div {
    width: 50%;
    padding: 15px;
  }
`;

type ReviewsProps = {
  detail: any;
  reviews: any;
};

const Reviews = ({ detail, reviews }: ReviewsProps) => {
  return (
    <ReviewsBlock>
      <div>
        <p>구글플레이, score: {detail.googlePlay.score}</p>
        <ul>
          {reviews.googlePlay.length === 0 && (
            <li>googlePlay 리뷰가 없습니다</li>
          )}
          {reviews.googlePlay.map(({ _id, name, os, review }: any) => {
            const { userName, text, scoreText, date, replyText, replyDate } =
              review;
            return (
              <li key={_id}>
                <hr />
                <p>name: {name}</p>
                <p>os: {os}</p>
                <p>userName: {userName}</p>
                <p>text: {text}</p>
                <p>scoreText: {scoreText}</p>
                <p>date: {date}</p>
                <p>replyText: {replyText}</p>
                <p>replyDate: {replyDate}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <p>앱스토어, score: {detail.appStore.score}</p>
        <ul>
          {reviews.appStore.length === 0 && <li>appStore 리뷰가 없습니다</li>}
          {reviews.appStore.map(({ _id, name, os, review }: any) => {
            const { author, title, comment, rate, date } = review;
            return (
              <li key={_id}>
                <hr />
                <p>name: {name}</p>
                <p>os: {os}</p>
                <p>author: {author}</p>
                <p>title: {title}</p>
                <p>comment: {comment}</p>
                <p>rate: {rate}</p>
                <p>date: {date}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </ReviewsBlock>
  );
};

export default Reviews;
