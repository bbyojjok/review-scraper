import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import Seo from '../../components/Seo';

const AddBlock = styled.div`
  padding: 20px;
`;

export default function Add() {
  const router = useRouter();

  return (
    <>
      <Seo title="Add" url={router.asPath} />
      <AddBlock>
        <h2>[# TODO] 리뷰 스크랩할 사이트 추가 페이지</h2>
      </AddBlock>
    </>
  );
}
