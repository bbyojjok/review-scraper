import styled from '@emotion/styled';

const SortLabelBlock = styled.label`
  display: block;
  position: relative;
  cursor: pointer;

  input {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 46px;
    font-size: 12px;
    color: #666;
    border: 1px solid #666;
    transition: all 0.2s;
  }

  input:focus-visible + span {
    outline: 1px solid;
  }

  &:first-of-type span {
    border-radius: 10% 0 0 10%;
  }

  &:last-child span {
    border-radius: 0 10% 10% 0;
  }

  &:not(:last-child) span {
    border-right: none;
  }

  input:checked + span {
    color: #fff;
    background-color: #000;
  }

  @media (hover: hover) {
    &:hover {
      span {
        color: #fff;
        border: 1px solid #fff;
      }

      &:not(:last-child) span {
        border-right: none;
      }
    }

    &:hover + label span {
      border-left: 1px solid #fff;
    }
  }
`;

type SortLabelProp = {
  type: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SortLabel = ({ type, value, onChange, checked }: SortLabelProp) => {
  const isCheckbox = type === 'checkbox';
  const name = isCheckbox ? 'score' : 'days';
  const text = isCheckbox ? `별점${value}` : `${value}일`;

  return (
    <>
      <SortLabelBlock title={text} key={value}>
        <input
          type={type}
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
        />
        <span>{text}</span>
      </SortLabelBlock>
    </>
  );
};

export default SortLabel;
