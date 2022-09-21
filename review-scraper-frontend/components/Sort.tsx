import styled from '@emotion/styled';

const SortBlock = styled.div`
  position: sticky;
  top: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  background-color: #222;

  .info {
    text-align: center;
    width: 100px;

    img {
      vertical-align: top;
      width: 100%;
      border-radius: 10%;
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05), 0 1px 1px rgba(0, 0, 0, 0.1);
    }
    span {
      display: inline-block;
      padding: 10px 0 0;
      font-size: 13px;
    }
  }

  .btns {
    padding-left: 8px;
  }

  .score-box {
    display: flex;
    padding-bottom: 4px;
  }

  .days-box {
    display: flex;
    padding-top: 4px;
  }

  label {
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

    &:hover span {
      color: #fff;
      border: 1px solid #fff;
    }

    &:hover + label span {
      border-left: 1px solid #fff;
    }

    input:checked + span {
      color: #fff;
      background-color: #000;
    }

    &:not(:last-child) span {
      border-right: none;
    }
  }

  @media (hover: hover) {
    label:hover span {
      color: #fff;
      border: 1px solid #fff;
    }

    label:hover + label span {
      border-left: 1px solid #fff;
    }
  }
`;

const scores: string[] = ['1', '2', '3', '4', '5'];
const days: string[] = ['7', '15', '30', '90', '180'];

type SortProps = {
  detail: any;
  selectedScore: string[];
  selectedDay: string;
  changeScore: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeDays: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Sort = ({
  detail,
  selectedScore,
  selectedDay,
  changeScore,
  changeDays,
}: SortProps) => {
  const { icon, title } = detail.appStore;

  return (
    <SortBlock>
      <div className="info">
        <img src={icon} alt={title} />
      </div>
      <div className="btns">
        <div className="score-box">
          {scores.map((score) => {
            const findScore = selectedScore.find(
              (selectScore) => score === selectScore,
            );
            return (
              <label title={`별점${score}`} key={score}>
                <input
                  type="checkbox"
                  name="score"
                  value={score}
                  onChange={changeScore}
                  checked={findScore === score}
                />
                <span>{`별점${score}`}</span>
              </label>
            );
          })}
        </div>
        <div className="days-box">
          {days.map((day) => (
            <label title={`${day}일`} key={day}>
              <input
                type="radio"
                name="days"
                value={day}
                onChange={changeDays}
                checked={day === selectedDay}
              />
              <span>{`${day}일`}</span>
            </label>
          ))}
        </div>
      </div>
    </SortBlock>
  );
};

export default Sort;
