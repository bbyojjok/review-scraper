import { useState } from 'react';
import styled from '@emotion/styled';
import IconLoading from '../common/IconLoading';
import InputBox from '../common/InputBox';
import Button from '../common/Button';

const AddFormBlock = styled.div``;

const AddForm = () => {
  const [scrapData, setScrapData] = useState<any>({
    name: '',
    appStoreId: '',
    googlePlayAppId: '',
  });
  const [error, setError] = useState<any>({
    name: null,
    appStoreId: null,
    googlePlayAppId: null,
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value;
    setScrapData((state: any) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('#TODO 서브밋 로직 적용해야됨!!');
  };

  return (
    <AddFormBlock>
      <div>스크랩 리스트 추가하기</div>
      <form onSubmit={onSubmit}>
        <div className="filed">
          <InputBox
            type="text"
            name="name"
            value={scrapData.name}
            placeholder="name"
            error={error.name}
            onChange={onChange}
          />
        </div>
        <div className="filed">
          <InputBox
            type="text"
            name="appStoreId"
            value={scrapData.appStoreId}
            placeholder="appStoreId"
            error={error.appStoreId}
            onChange={onChange}
          />
        </div>
        <div className="filed">
          <InputBox
            type="text"
            name="googlePlayAppId"
            value={scrapData.googlePlayAppId}
            placeholder="googlePlayAppId"
            error={error.googlePlayAppId}
            onChange={onChange}
          />
        </div>
        <div className="filed">
          <Button>
            Login
            {/* {isLoading && (
              <span className="icon">
                <IconLoading />
              </span>
            )} */}
          </Button>
        </div>
      </form>
    </AddFormBlock>
  );
};

export default AddForm;
