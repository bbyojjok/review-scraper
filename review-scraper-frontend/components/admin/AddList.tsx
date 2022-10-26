import styled from '@emotion/styled';
import useUser from '../../store/modules/userHook';
import { deleteCookie } from 'cookies-next';
import { useMutation, useQuery } from '@tanstack/react-query';
import { signout } from '../../lib/api';

const AddListBlock = styled.div`
  padding: 20px;
  max-width: 750px;
  margin: 0 auto;
`;

const AddList = () => {
  const { isLoggedin, logout } = useUser();

  const { refetch: refetchSignout } = useQuery(['signout'], signout, {
    enabled: false,
  });

  const onLogout = () => {
    refetchSignout();
    logout();
    deleteCookie('userId');
  };

  return (
    <AddListBlock>
      <h2>[# TODO] 리뷰 스크랩할 사이트 추가 페이지</h2>
      <p>isLoggedin: {`${isLoggedin}`}</p>
      <button onClick={onLogout}>로그아웃</button>
    </AddListBlock>
  );
};

export default AddList;
