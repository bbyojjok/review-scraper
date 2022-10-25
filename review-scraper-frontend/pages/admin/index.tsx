import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import Seo from '../../components/Seo';
import useUser from '../../store/modules/userHook';
import { useMutation, useQuery } from '@tanstack/react-query';
import { signin, check } from '../../lib/api';

function loadUser() {
  try {
    const user = localStorage.getItem('user');
    console.log('# user :', user);
    if (!user) return;
    // store.dispatch(check());
  } catch (e) {
    console.log('localStorage is not working');
  }
}

const StyledInput = styled.input``;

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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value;
    setLoginData((state: any) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const { mutate, isLoading, isError, isSuccess } = useMutation(
    ['signin'],
    signin,
    {
      onSuccess: (data) => {
        login({ userId: loginData.username });
        // try {
        //   localStorage.setItem('user', JSON.stringify(data));
        // } catch (e) {
        //   console.log('localStorage is not working');
        // }
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
    setLoginData({ username: '', password: '' });
    logout();
  };

  return (
    <>
      <Seo title="Admin" url={router.asPath} />
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
          <button>로그인</button>
          <p>로그인 isLoggedin: {isLoggedin ? 'true' : 'false'}</p>
        </form>
        <button onClick={onLogout}>로그아웃</button>
      </LoginBlock>
    </>
  );
}
