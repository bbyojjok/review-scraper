import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import styled from '@emotion/styled';
import useUser from '../../store/modules/userHook';
import { deleteCookie } from 'cookies-next';
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { getLists, signout } from '../../lib/api';
import AddForm from './AddForm';

const AddListBlock = styled.div`
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
`;

const AddList = () => {
  const { isLoggedin, logout } = useUser();
  const { refetch: refetchSignout } = useQuery(['signout'], signout, {
    enabled: false,
  });

  const { data: lists } = useQuery(['lists'], () => getLists());

  const onLogout = () => {
    refetchSignout();
    logout();
    deleteCookie('userId');
  };

  console.log(lists);

  return (
    <AddListBlock>
      <h2>[# TODO] 리뷰 스크랩할 사이트 추가 페이지</h2>
      <p>isLoggedin: {`${isLoggedin}`}</p>
      <button onClick={onLogout}>로그아웃</button>

      <hr />
      <AddForm />
      <hr />

      <div>
        <h2>현재 리스트</h2>
        {lists?.map((list: any) => {
          return (
            <div key={list._id}>
              <hr />
              <p>{list.name}</p>
              <p>{list.appStoreId}</p>
              <p>{list.googlePlayAppId}</p>
            </div>
          );
        })}
      </div>
    </AddListBlock>
  );
};

export default AddList;
