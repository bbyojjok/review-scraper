import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import styled from '@emotion/styled';
import IconLoading from '../common/IconLoading';
import InputBox from '../common/InputBox';
import Button from '../common/Button';
import { addList } from '../../lib/api';

const AddFormBlock = styled.div`
  margin-top: 30px;
  padding: 30px 0;
  border-top: 1px solid #222;
  border-bottom: 1px solid #222;

  .field {
    margin-top: 15px;

    &:first-of-type {
      margin-top: 0;
    }
  }
`;

const AddForm = () => {
  const [scrapData, setScrapData] = useState<any>({
    name: '',
    googlePlayAppId: '',
    appStoreId: '',
  });
  const [error, setError] = useState<any>({
    name: null,
    googlePlayAppId: null,
    appStoreId: null,
  });

  const { mutate, isLoading, isError } = useMutation(['addList'], addList, {
    onSuccess: (data) => {
      console.log('성공?!');
      setScrapData({ name: '', googlePlayAppId: '', appStoreId: '' });
    },
    onError: (e: any) => {
      const { error } = e.response.data;

      // 유호성검사
      console.log('실패 error:', e.response.data.details[0]);

      console.log(e);

      if (error === 'exist') {
        setError((state: any) => ({
          ...state,
          name: '이미 등록된 name 입니다.',
        }));
      }

      // if (error === 'worng password') {
      //   setError((state: any) => ({
      //     ...state,
      //     password: 'password이 잘못되었습니다.',
      //   }));
      // }
    },
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScrapData((state: any) => ({
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

    if (scrapData.name === '') {
      setError((state: any) => ({
        ...state,
        name: 'name을 입력해주세요.',
      }));
      return;
    }

    if (scrapData.googlePlayAppId === '') {
      setError((state: any) => ({
        ...state,
        googlePlayAppId: 'googlePlayApp ID를 입력해주세요.',
      }));
      return;
    }

    if (scrapData.appStoreId === '') {
      setError((state: any) => ({
        ...state,
        appStoreId: 'appStore ID를 입력해주세요.',
      }));
      return;
    }

    const { name, appStoreId, googlePlayAppId } = scrapData;
    mutate({ name, appStoreId: parseInt(appStoreId, 10), googlePlayAppId });
  };

  return (
    <AddFormBlock>
      <form onSubmit={onSubmit}>
        <div className="field">
          <InputBox
            type="text"
            name="name"
            value={scrapData.name}
            placeholder="name"
            error={error.name}
            onChange={onChange}
          />
        </div>
        <div className="field">
          <InputBox
            type="text"
            name="googlePlayAppId"
            value={scrapData.googlePlayAppId}
            placeholder="googlePlayAppId"
            error={error.googlePlayAppId}
            onChange={onChange}
          />
        </div>
        <div className="field">
          <InputBox
            type="text"
            name="appStoreId"
            value={scrapData.appStoreId}
            placeholder="appStoreId"
            error={error.appStoreId}
            onChange={onChange}
          />
        </div>
        <div className="field">
          <Button>
            스크랩 리스트 추가하기
            {isLoading && (
              <span className="icon">
                <IconLoading />
              </span>
            )}
          </Button>
        </div>
      </form>
    </AddFormBlock>
  );
};

export default AddForm;
