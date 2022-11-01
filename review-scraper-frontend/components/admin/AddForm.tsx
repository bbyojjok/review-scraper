import { useCallback, useState } from 'react';
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

  .icon {
    margin-left: 5px;
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
      setScrapData({ name: '', googlePlayAppId: '', appStoreId: '' });
    },

    onError: (ctx: any) => {
      const { error } = ctx.response.data;

      if (error === 'exist') {
        setError((state: any) => ({
          ...state,
          name: '이미 등록된 name 입니다.',
        }));
      }

      if (error === 'googlePlayAppId validation failed') {
        setError((state: any) => ({
          ...state,
          googlePlayAppId: '유효하지 않는 googlePlayAppId 입니다.',
        }));
      }

      if (error === 'appStoreId validation failed') {
        setError((state: any) => ({
          ...state,
          appStoreId: '유효하지 않는 appStoreId 입니다.',
        }));
      }

      if (ctx.response?.data?.details[0]?.type === 'number.base') {
        setError((state: any) => ({
          ...state,
          appStoreId: '유효하지 않는 appStoreId 입니다.',
        }));
      }
    },
  });

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setScrapData((state: any) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
    setError((state: any) => ({
      ...state,
      [e.target.name]: null,
    }));
  }, []);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
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
    },
    [scrapData],
  );

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
