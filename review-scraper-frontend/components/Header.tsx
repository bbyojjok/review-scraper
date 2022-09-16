import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';

const HeaderBlock = styled.header`
  position: sticky;
  z-index: 10;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 50px;
  height: 50px;
  background-color: #222831;
  box-shadow: 0px 0px 5px 0px #191b1d;

  h1 a {
    font-size: 16px;
    font-weight: 600;
    color: #fff;
  }

  .btn-back {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  }

  .btn-login {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const Header = () => {
  const router = useRouter();

  return (
    <HeaderBlock>
      {router.pathname !== '/' && (
        <button className="btn-back" onClick={() => router.back()}>
          뒤로가기
        </button>
      )}
      <h1>
        <Link href="/">
          <a>REVIEW-SCRAPER</a>
        </Link>
      </h1>
      <Link href="/admin">
        <a className="btn-login">로그인버튼</a>
      </Link>
    </HeaderBlock>
  );
};

export default Header;
