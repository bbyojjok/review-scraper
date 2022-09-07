import styled from '@emotion/styled';

const SortBlock = styled.div`
  position: sticky;
  top: 50px;

  background-color: #eee;

  & > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .info {
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
      color: #393e46;
    }
  }

  .score-box {
  }

  .days-box {
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
      height: 50px;
      font-size: 12px;
    }

    input:checked + span {
      background-color: skyblue;
    }

    input:focus-visible + span {
      outline: 1px solid;
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
  console.log(detail);

  return (
    <SortBlock>
      <div className="info">
        <img src={detail.appStore.icon} alt={detail.appStore.title} />
        <span>{detail.appStore.title}</span>
      </div>

      <div>
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
      <div>
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
    </SortBlock>
  );
};

export default Sort;
