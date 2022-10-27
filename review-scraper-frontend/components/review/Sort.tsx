import Image from 'next/image';
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
  max-width: 750px;
  margin: 0 auto;
  background-color: #222;

  .info {
    overflow: hidden;
    flex: 1;
    text-align: center;
    max-width: 100px;
    width: 100%;
    border-radius: 10%;
    transition: all 0.2s;
    box-shadow: 0px 0px 3px 0px #000;

    img {
      vertical-align: top;
      width: 100%;
    }
    span {
      display: inline-block;
      vertical-align: middle;
      padding: 10px 0 0;
      font-size: 13px;
    }
  }

  .btns {
    padding-left: 8px;

    .score-box {
      margin-bottom: 4px;
    }

    .days-box {
      margin-top: 4px;
    }

    & > div {
      display: flex;
      transition: all 0.2s;
      box-shadow: 0px 0px 3px 0px #000;
    }
  }

  @media (hover: hover) {
    .info:hover {
      box-shadow: 0px 0px 5px 0px #000;
    }

    .btns > div {
      box-shadow: 0px 0px 5px 0px #000;
    }
  }
`;

const scores: string[] = ['1', '2', '3', '4', '5'];
const days: string[] = ['7', '30', '60', '90', '180'];

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
        <Image src={icon} alt={title} width={256} height={256} />
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
