import styled from '@emotion/styled';
import Seo from '../../components/Seo';

const AddBlock = styled.div`
  padding: 20px;
`;

export default function Add() {
  return (
    <>
      <Seo title="Add" />
      <AddBlock>
        <h2>[# TODO] 리뷰 스크랩할 사이트 추가 페이지</h2>
      </AddBlock>
    </>
  );
}
