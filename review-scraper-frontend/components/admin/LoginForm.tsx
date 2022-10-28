import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { signin } from '../../lib/api';
import { setCookie } from 'cookies-next';
import useUser from '../../store/modules/userHook';
import styled from '@emotion/styled';
import IconLoading from '../common/IconLoading';
import InputBox from '../common/InputBox';
import Button from '../common/Button';

const LoginFormBlock = styled.div`
  padding: 30px 20px;
  max-width: 350px;
  margin: 0 auto;
  background-color: #333;
  border-radius: 5px;
  text-align: center;
  transition: all 0.2s;
  box-shadow: 0px 0px 3px 0px #000;

  h2 {
    padding-bottom: 20px;
    font-size: 16px;
    color: #fff;
  }

  .field {
    margin-top: 15px;

    &:first-of-type {
      margin-top: 0;
    }
  }

  .icon {
    margin-left: 5px;
  }

  @media (hover: hover) {
    &:hover {
      box-shadow: 0px 0px 10px 2px #000;
    }
  }
`;

const LoginForm = () => {
  const [loginData, setLoginData] = useState<any>({
    username: '',
    password: '',
  });
  const [error, setError] = useState<any>({
    username: null,
    password: null,
  });

  const { login } = useUser();
  const { mutate, isLoading } = useMutation(['signin'], signin, {
    onSuccess: (data) => {
      const { username } = loginData;
      login({ userId: username });
      setCookie('userId', username);
    },
    onError: (ctx: any) => {
      const { error } = ctx.response.data;
      if (error === 'worng username') {
        setError((state: any) => ({
          ...state,
          username: 'username이 잘못되었습니다.',
        }));
      }
      if (error === 'worng password') {
        setError((state: any) => ({
          ...state,
          password: 'password이 잘못되었습니다.',
        }));
      }
    },
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((state: any) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
    setError((state: any) => ({
      ...state,
      [e.target.name]: null,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loginData.username === '') {
      setError((state: any) => ({
        ...state,
        username: 'username을 입력해주세요.',
      }));
      return;
    }

    if (loginData.password === '') {
      setError((state: any) => ({
        ...state,
        password: 'password를 입력해주세요.',
      }));
      return;
    }

    mutate(loginData);
  };

  return (
    <LoginFormBlock>
      <h2>Administrator</h2>
      <form onSubmit={onSubmit}>
        <div className="field">
          <InputBox
            type="text"
            name="username"
            value={loginData.username}
            placeholder="username"
            error={error.username}
            onChange={onChange}
          />
        </div>
        <div className="field">
          <InputBox
            type="password"
            name="password"
            value={loginData.password}
            placeholder="password"
            error={error.password}
            onChange={onChange}
          />
        </div>
        <div className="field">
          <Button>
            Login
            {isLoading && (
              <span className="icon">
                <IconLoading />
              </span>
            )}
          </Button>
        </div>
      </form>
    </LoginFormBlock>
  );
};

export default LoginForm;
