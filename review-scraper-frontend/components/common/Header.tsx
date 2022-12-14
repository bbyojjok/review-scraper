import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { MdOutlineArrowBackIos } from 'react-icons/md';

const HeaderBlock = styled.header`
  position: sticky;
  z-index: 10;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 50px;
  height: 50px;
  background-color: #000;

  h1 a {
    font-size: 16px;
    font-weight: 600;
    color: #fff;
  }

  .btn-back {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    padding: 15px;
    border: 0;
    background: 0;
    cursor: pointer;

    .icon {
      vertical-align: middle;
      color: #fff;
      width: 1.2rem;
      height: 1.2rem;
    }
  }

  .btn-admin {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #888;
    transition: color 0.2s;

    &:hover {
      color: #fff;
    }
  }
`;

const Header = () => {
  const router = useRouter();

  return (
    <HeaderBlock>
      {router.pathname !== '/' && (
        <button className="btn-back" onClick={() => router.push('/')}>
          <MdOutlineArrowBackIos className="icon" />
        </button>
      )}
      <h1>
        <Link href="/">
          <a>REVIEW-SCRAPER</a>
        </Link>
      </h1>
    </HeaderBlock>
  );
};

export default Header;
