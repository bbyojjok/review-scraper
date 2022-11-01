import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import useUser from '../../store/modules/userHook';
import { removeCookies } from 'cookies-next';
import wrapper from '../../store';
import { check } from '../../lib/api';
import { loginAction } from '../../store/modules/user';
import Seo from '../../components/common/Seo';
import LoginForm from '../../components/admin/LoginForm';
import AdminBox from '../../components/admin/AdminBox';

const Admin = () => {
  const router = useRouter();
  const { isLoggedin, login, logout } = useUser();

  const { refetch: refetchCheck } = useQuery(['check'], check, {
    onSuccess: ({ username: userId }) => {
      login({ userId });
      router.replace('/admin/add');
    },
    onError: (ctx) => {
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
  }, [isLoggedin]);

  return (
    <>
      <Seo title="Admin" url={router.asPath} />
      <AdminBox>{isLoggedin || <LoginForm />}</AdminBox>
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
