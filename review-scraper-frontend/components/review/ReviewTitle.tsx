import React from 'react';
import styled from '@emotion/styled';
import { MdStar } from 'react-icons/md';
import { SiGoogleplay, SiApple } from 'react-icons/si';

const ReviewTitleBlock = styled.div`
  height: 50px;
  font-size: 12px;
  line-height: 1.4;

  & > div {
    display: flex;
    justify-content: space-between;

    p {
      display: flex;
      align-items: center;

      a {
        display: flex;
        align-items: center;
      }
    }
  }

  & > div:nth-of-type(1) {
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
  url: string;
  length: number;
};

const ReviewTitle = ({ os, score, version, url, length }: ReviewTitleProps) => {
  return (
    <ReviewTitleBlock>
      <div>
        <p className="os">
          <a href={url} target="_blank" title="스토어로 이동하기">
            {os === 'GooglePlay' ? <SiGoogleplay /> : <SiApple />}
            <span>{os}</span>
          </a>
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
    </ReviewTitleBlock>
  );
};

export default React.memo(ReviewTitle);
