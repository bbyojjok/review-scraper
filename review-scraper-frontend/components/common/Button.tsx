import React from 'react';
import styled from '@emotion/styled';

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  padding: 0.7rem 1rem;
  color: #fff;
  outline: none;
  cursor: pointer;
  text-align: center;
  background: #111;
  transition: all 0.2s;
  border: 1px solid transparent;

  &:hover {
    background: #000;
    border: 1px solid #fff;
    box-shadow: 0px 0px 5px 0px #000;
  }
`;

type ButtonProps = {
  children: React.ReactNode;

  onClick?: () => void;
};

const Button = (props: ButtonProps) => {
  return <StyledButton {...props} />;
};

export default Button;
