import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import Seo from '../../components/common/Seo';
import LoginForm from '../../components/admin/LoginForm';
import useUser from '../../store/modules/userHook';
import { useQuery } from '@tanstack/react-query';
import { check } from '../../lib/api';
import wrapper from '../../store';
import { loginAction } from '../../store/modules/user';
import { removeCookies } from 'cookies-next';
import AddList from '../../components/admin/AddList';

const Admin = () => {
  const router = useRouter();
  const { isLoggedin, login, logout } = useUser();

  const { refetch: refetchCheck } = useQuery(['check'], check, {
    onSuccess: ({ username: userId }) => {
      login({ userId });
    },
    onError: (e) => {
      if (isLoggedin) {
        logout();
        removeCookies('userId');
      }
    },
    enabled: false,
  });

  useEffect(() => {
    if (isLoggedin) {
      refetchCheck();
    }
  }, []);

  return (
    <>
      <Seo title="Admin" url={router.asPath} />
      {isLoggedin ? <AddList /> : <LoginForm />}
    </>
  );
};

export default Admin;

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
      return {
        props: {},
      };
    },
  );
