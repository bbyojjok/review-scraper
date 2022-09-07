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
          {reviews.googlePlay.map(({ _id, name, os, review }: any) => (
            <li key={_id}>
              <hr />
              <p>name: {name}</p>
              <p>os: {os}</p>
              <p>userName: {review.userName}</p>
              <p>userName: {review.userName}</p>
              <p>text: {review.text}</p>
              <p>scoreText: {review.scoreText}</p>
              <p>date: {review.date}</p>
              <p>replyText: {review.replyText}</p>
              <p>replyDate: {review.replyDate}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p>앱스토어, score: {detail.appStore.score}</p>
        <ul>
          {reviews.appStore.length === 0 && <li>appStore 리뷰가 없습니다</li>}
          {reviews.appStore.map(({ _id, name, os, review }: any) => (
            <li key={_id}>
              <hr />
              <p>name: {name}</p>
              <p>os: {os}</p>
              <p>author: {review.author}</p>
              <p>comment: {review.comment}</p>
              <p>rate: {review.rate}</p>
              <p>date: {review.date}</p>
            </li>
          ))}
        </ul>
      </div>
    </ReviewsBlock>
  );
};

export default Reviews;
