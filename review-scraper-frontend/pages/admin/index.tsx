import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import Seo from '../../components/Seo';
import IconLoading from '../../components/IconLoading';
import useUser from '../../store/modules/userHook';
import { useMutation, useQuery } from '@tanstack/react-query';
import { signin, check, signout } from '../../lib/api';
import { setCookie, deleteCookie } from 'cookies-next';
import wrapper from '../../store';
import { loginAction } from '../../store/modules/user';
import { removeCookies } from 'cookies-next';

const StyledInput = styled.input``;

const AddBlock = styled.div`
  padding: 20px;
`;

const LoginBlock = styled.div`
  padding: 20px;
  max-width: 750px;
  margin: 0 auto;

  h2 {
    text-align: center;
  }
`;

export default function Login() {
  const router = useRouter();
  const [loginData, setLoginData] = useState<any>({
    username: '',
    password: '',
  });

  const { isLoggedin, login, logout } = useUser();

  const { data } = useQuery(['check'], check, {
    onSuccess: (data) => {
      login({ userId: data.username });
    },
    onError: (e) => {
      logout();
      removeCookies('userId');
    },
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value;
    setLoginData((state: any) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const { refetch: refetchSignout } = useQuery(['signout'], signout, {
    enabled: false,
  });
  const { mutate, isLoading, isError, isSuccess } = useMutation(
    ['signin'],
    signin,
    {
      onSuccess: (data) => {
        const { username } = loginData;
        login({ userId: username });
        setCookie('userId', username);
      },
      onError: (e: any) => {
        console.log('로그인에러 에러내용 알려주기', e.response.data);
      },
    },
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('# on submit !!');
    mutate(loginData);
  };

  const onLogout = () => {
    refetchSignout();
    setLoginData({ username: '', password: '' });
    logout();
    deleteCookie('userId');
  };

  return (
    <>
      <Seo title="Admin" url={router.asPath} />

      {isLoggedin ? (
        <AddBlock>
          <h2>[# TODO] 리뷰 스크랩할 사이트 추가 페이지</h2>
          <p>isLoggedin: {`${isLoggedin}`}</p>
          <button onClick={onLogout}>로그아웃</button>
        </AddBlock>
      ) : (
        <LoginBlock>
          <form onSubmit={onSubmit}>
            <div>{`isLoading: ${isLoading}`}</div>
            <div>{`isError: ${isError}`}</div>
            <div>{`isSuccess: ${isSuccess}`}</div>

            <StyledInput
              type="text"
              name="username"
              value={loginData.username}
              onChange={onChange}
              placeholder="야이디"
              autoComplete="off"
            />
            <StyledInput
              type="password"
              name="password"
              value={loginData.password}
              onChange={onChange}
              placeholder="비밀번호"
              autoComplete="off"
            />
            <button>
              로그인
              {isLoading && <IconLoading />}
            </button>
            <p>로그인 isLoggedin: {isLoggedin ? 'true' : 'false'}</p>
          </form>
        </LoginBlock>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(
    (store) => async (context: GetServerSidePropsContext) => {
      const { access_token: token, userId } = context.req?.cookies;
      if (!token) {
        return { props: {} };
      }

      if (userId) {
        store.dispatch(loginAction({ userId }));
      }
      console.log('store:');

      return {
        props: {},
      };
    },
  );
