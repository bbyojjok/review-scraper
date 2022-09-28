import styled from '@emotion/styled';
import SortLabel from './SortLabel';

const SortBlock = styled.div`
  position: sticky;
  top: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #222;

  .info {
    flex: 1;
    text-align: center;
    max-width: 100px;
    width: 100%;

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
`;

const scores: string[] = ['1', '2', '3', '4', '5'];
const days: string[] = ['7', '15', '30', '60', '90'];

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
              <SortLabel
                key={score}
                type="checkbox"
                value={score}
                onChange={changeScore}
                checked={findScore === score}
              />
            );
          })}
        </div>
        <div className="days-box">
          {days.map((day) => (
            <SortLabel
              key={day}
              type="radio"
              value={day}
              onChange={changeDays}
              checked={day === selectedDay}
            />
          ))}
        </div>
      </div>
    </SortBlock>
  );
};

export default Sort;
