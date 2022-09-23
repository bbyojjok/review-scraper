import styled from '@emotion/styled';
import React, { useState } from 'react';
import useUser from '../../store/modules/userHook';

const StyledInput = styled.input``;

const LoginBlock = styled.div`
  padding: 20px;

  h2 {
    text-align: center;
  }
`;

export default function Login() {
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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('# on submit !!');

    const { username, password } = loginData;
    login({ userId: username, password: password });
  };

  return (
    <LoginBlock>
      <h2>로그인 isLoggedin: {isLoggedin ? 'true' : 'false'}</h2>
      <form onSubmit={onSubmit}>
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
      </form>
    </LoginBlock>
  );
}
