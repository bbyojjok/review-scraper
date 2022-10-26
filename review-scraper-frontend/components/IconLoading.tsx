/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { BiLoaderAlt } from 'react-icons/bi';

const IconLoadingStyle = css`
  animation: rotate 0.75s linear infinite;

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const IconLoading = () => {
  return <BiLoaderAlt css={IconLoadingStyle} className="icon-loading" />;
};

export default IconLoading;
