import styled from '@emotion/styled';
import ReviewTitle from './ReviewTitle';
import ReviewList from './ReviewList';

const ReviewsBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  left: 0;
  right: 0;
  top: 155px;
  bottom: 0;
  padding: 0 20px;
  max-width: 750px;
  margin: 0 auto;

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
          score={detail?.googlePlay?.score.toFixed(1)}
          version={detail?.googlePlay?.version}
          url={detail?.googlePlay?.url}
          length={reviews?.googlePlay?.totalCount}
        />
        <ReviewList
          os="GooglePlay"
          list={reviews.googlePlay.data}
          totalCount={reviews.googlePlay.totalCount}
        />
      </div>
      <div className="review-wrap">
        <ReviewTitle
          os="AppStore"
          score={detail?.appStore?.score.toFixed(1)}
          version={detail?.appStore?.version}
          url={detail?.appStore?.url}
          length={reviews?.appStore?.totalCount}
        />
        <ReviewList
          os="AppStore"
          list={reviews.appStore.data}
          totalCount={reviews.appStore.totalCount}
        />
      </div>
    </ReviewsBlock>
  );
};

export default Reviews;
