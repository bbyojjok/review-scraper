import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '.';
import { loginAction, LoginPayload, logoutAction } from './user';

// 커스텀 훅
export default function useUser() {
  const { isLoggedin } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const login = useCallback((data: any) => {
    dispatch(loginAction(data));
  }, []);

  const logout = useCallback(() => {
    dispatch(logoutAction());
  }, []);

  return { isLoggedin, login, logout };
}
