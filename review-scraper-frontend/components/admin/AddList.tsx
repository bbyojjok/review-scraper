import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteCookie } from 'cookies-next';
import { getLists, signout, scrapStart } from '../../lib/api';
import useUser from '../../store/modules/userHook';
import styled from '@emotion/styled';
import AddForm from './AddForm';
import Button from '../common/Button';

const AddListBlock = styled.div`
  padding: 20px;
  max-width: 350px;
  margin: 0 auto;
  background-color: #333;
  transition: all 0.2s;
  box-shadow: 0px 0px 3px 0px #000;

  h2 {
    text-align: center;
    padding-bottom: 20px;
    font-size: 16px;
    color: #fff;
  }

  & > .field {
    margin-top: 15px;

    &:first-of-type {
      margin-top: 0;
    }
  }

  .scrap-list {
    padding-top: 30px;
    li {
      padding: 10px;
      margin-top: 15px;
      background-color: #444;
      border-radius: 5px;
      transition: all 0.2s;
      border: 1px solid transparent;

      &:first-of-type {
        margin-top: 0;
      }

      p {
        font-size: 13px;
      }
    }
  }

  @media (hover: hover) {
    &:hover {
      box-shadow: 0px 0px 10px 2px #000;
    }

    .scrap-list li:hover {
      border: 1px solid #fff;
    }
  }
`;

const AddList = () => {
  const { logout } = useUser();
  const { refetch: refetchSignout } = useQuery(['signout'], signout, {
    enabled: false,
  });

  const { data: lists } = useQuery(['lists'], () => getLists());
  const { mutate } = useMutation(['scrapStart'], () => scrapStart(), {
    onSuccess: (data) => {
      console.log('성공 data:', data);
    },
    onError: (e: any) => {
      console.log('실패 e:', e);
    },
  });

  const onLogout = () => {
    refetchSignout();
    logout();
    deleteCookie('userId');
  };

  const onScrapStart = () => {
    mutate();
  };

  console.log(lists);

  return (
    <AddListBlock>
      <h2>Administrator</h2>
      <div className="field">
        <Button onClick={onLogout}>로그아웃</Button>
      </div>
      <div className="field">
        <Button onClick={onScrapStart}>스크랩 시작</Button>
      </div>
      <AddForm />
      <ul className="scrap-list">
        {lists?.map((list: any) => {
          return (
            <li key={list._id}>
              <p>{list.name}</p>
              <p>{list.appStoreId}</p>
              <p>{list.googlePlayAppId}</p>
            </li>
          );
        })}
      </ul>
    </AddListBlock>
  );
};

export default AddList;
