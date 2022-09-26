import styled from '@emotion/styled';
import { MdStar } from 'react-icons/md';
import { SiGoogleplay, SiApple } from 'react-icons/si';

const ReviewTitleBlick = styled.div`
  height: 50px;
  font-size: 12px;
  line-height: 1.4;

  & > div {
    display: flex;
    justify-content: space-between;
  }

  & > div:nth-of-type(1) {
    p {
      display: flex;
      align-items: center;
    }

    .os {
      svg {
        margin-right: 4px;
      }
    }
  }

  & > div:nth-of-type(2) {
    text-align: right;
  }
`;

type ReviewTitleProps = {
  os: string;
  score: number;
  version: string;
  length: number;
};

const ReviewTitle = ({ os, score, version, length }: ReviewTitleProps) => {
  return (
    <ReviewTitleBlick>
      <div>
        <p className="os">
          {os === 'GooglePlay' ? (
            <>
              <SiGoogleplay />
              <span>{os}</span>
            </>
          ) : (
            <>
              <SiApple />
              <span>{os}</span>
            </>
          )}
        </p>
        <p>버전: {version}</p>
      </div>
      <div>
        <p>
          <span>{score}</span>
          <MdStar />
        </p>
        <p>조회된 리뷰 수: {length}</p>
      </div>
    </ReviewTitleBlick>
  );
};

export default ReviewTitle;
