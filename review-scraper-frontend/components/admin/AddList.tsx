import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteCookie } from 'cookies-next';
import { getLists, signout, scrapStart } from '../../lib/api';
import useUser from '../../store/modules/userHook';
import styled from '@emotion/styled';
import AddForm from './AddForm';
import Button from '../common/Button';
import IconLoading from '../common/IconLoading';

const AddListBlock = styled.div`
  padding: 20px;
  max-width: 350px;
  margin: 0 auto;
  background-color: #333;
  border-radius: 5px;
  transition: all 0.2s;
  box-shadow: 0px 0px 3px 0px #000;

  h2 {
    text-align: center;
    padding-bottom: 20px;
    font-size: 16px;
    color: #fff;
  }

  .icon {
    margin-left: 5px;
  }

  .field {
    margin-top: 15px;

    &:first-of-type {
      margin-top: 0;
    }
  }

  .scrap-list {
    padding: 30px 0 10px;

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
        font-size: 12px;
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
  const { mutate, isLoading } = useMutation(
    ['scrapStart'],
    () => scrapStart(),
    {
      onSuccess: (data) => {
        console.log('성공 data:', data);
      },
      onError: (ctx: any) => {
        console.log('실패 ctx:', ctx);
      },
    },
  );

  const onLogout = () => {
    refetchSignout();
    logout();
    deleteCookie('userId');
  };

  const onScrapStart = () => {
    mutate();
  };

  return (
    <AddListBlock>
      <h2>Administrator</h2>
      <div className="field">
        <Button onClick={onLogout}>로그아웃</Button>
      </div>
      <div className="field">
        <Button onClick={onScrapStart}>
          스크랩 시작
          {isLoading && (
            <span className="icon">
              <IconLoading />
            </span>
          )}
        </Button>
      </div>
      <AddForm />
      <ul className="scrap-list">
        {lists?.map((list: any) => {
          return (
            <li key={list._id}>
              <p>name: {list.name}</p>
              <p>googlePlayAppId: {list.googlePlayAppId}</p>
              <p>appStoreId: {list.appStoreId}</p>
            </li>
          );
        })}
      </ul>
    </AddListBlock>
  );
};

export default AddList;
