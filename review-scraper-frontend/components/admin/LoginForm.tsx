import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { signin } from '../../lib/api';
import { setCookie } from 'cookies-next';
import useUser from '../../store/modules/userHook';
import styled from '@emotion/styled';
import IconLoading from '../common/IconLoading';

const StyledInput = styled.input``;

const LoginFormBlock = styled.div`
  padding: 20px;
  max-width: 750px;
  margin: 0 auto;
`;

const LoginForm = () => {
  const [loginData, setLoginData] = useState<any>({
    username: '',
    password: '',
  });

  const { isLoggedin, login } = useUser();

  const { mutate, isLoading, isError } = useMutation(['signin'], signin, {
    onSuccess: (data) => {
      const { username } = loginData;
      login({ userId: username });
      setCookie('userId', username);
    },
    onError: (e: any) => {
      console.log('로그인에러 에러내용 알려주기', e.response.data);
    },
  });

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
    mutate(loginData);
  };

  return (
    <LoginFormBlock>
      <form onSubmit={onSubmit}>
        <div>{`isLoading: ${isLoading}`}</div>
        <div>{`isError: ${isError}`}</div>

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
        <button>로그인{isLoading && <IconLoading />}</button>
        <p>## 로그인 상태 isLoggedin: {isLoggedin ? 'true' : 'false'}</p>
      </form>
    </LoginFormBlock>
  );
};

export default LoginForm;
