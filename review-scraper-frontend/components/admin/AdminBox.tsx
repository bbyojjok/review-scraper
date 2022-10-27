import React from 'react';
import styled from '@emotion/styled';

const AdminBoxBlock = styled.div`
  padding: 40px 20px;
`;

type AdminBoxProps = {
  children: React.ReactNode;
};

const AdminBox = (props: AdminBoxProps) => {
  return <AdminBoxBlock>{props.children}</AdminBoxBlock>;
};

export default AdminBox;
