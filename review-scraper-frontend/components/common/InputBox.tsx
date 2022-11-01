import React from 'react';
import styled from '@emotion/styled';

const InputBlock = styled.div`
  width: 100%;
  border-radius: 4px;
  transition: all 0.2s;

  input {
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    height: 100%;
    font-size: 14px;
    color: #333;
    border-radius: 5px;

    &:focus-visible {
      outline: none;
    }
  }

  &.error {
  }
`;

const ErrorMessage = styled.div`
  color: #ffa4a4;
  font-size: 13px;
  padding: 5px 0 10px;

  animation-name: smooth;
  animation-duration: 0.2s;
  animation-iteration-count: 1;

  @keyframes smooth {
    0% {
      opacity: 0;
      transform: translateY(-10%);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

type InputBoxProps = {
  type: string;
  name: string;
  value: string;
  placeholder?: string;
  error?: string | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const InputBox = ({
  type,
  name,
  value,
  placeholder,
  error,
  onChange,
  onKeyDown,
}: InputBoxProps) => {
  return (
    <>
      <InputBlock className={`${error && 'error'}`}>
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={onKeyDown}
          autoComplete="off"
        />
      </InputBlock>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  );
};

export default React.memo(InputBox);
