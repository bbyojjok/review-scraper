import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

type ReviewProps = {
  reviews: any;
  name: string;
  day: string;
  score: string[];
};

const scores: string[] = ['1', '2', '3', '4', '5'];
const days: string[] = ['7', '15', '30', '90', '180'];

export default function Review({
  reviews,
  name: selectedName,
  day: selectedDay,
  score: selectedScore,
}: ReviewProps) {
  const router = useRouter();
  const [name, day, score] = router.query.review as string[];

  console.log(selectedName, selectedDay, selectedScore);
  console.log(reviews);

  useEffect(() => {
    if (!day || !score) {
      router.replace(`/${name}/${selectedDay}/${selectedScore}`);
    }
  }, []);

  const scoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (selectedScore.join('') === val) {
      return;
    }

    let url = `/${name}/${day}/`;
    const findScore = selectedScore.find((score) => score === val);
    if (findScore) {
      url += selectedScore
        .filter((score) => score !== findScore)
        .sort()
        .join('');
    } else {
      url += selectedScore.concat(val).sort().join('');
    }
    router.push(url);
  };

  const dateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    router.push(`/${name}/${e.target.value}/${score}`);
  };

  return (
    <div>
      <div>
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
                  onChange={scoreChange}
                  checked={findScore === score}
                />
                <span>{`별점${score}`}</span>
              </label>
            );
          })}
        </div>
        <div className="date-box">
          {days.map((day) => (
            <label title={`${day}일`} key={day}>
              <input
                type="radio"
                name="date"
                value={day}
                onChange={dateChange}
                checked={day === selectedDay}
              />
              <span>{`${day}일`}</span>
            </label>
          ))}
        </div>
      </div>

      <p>[{selectedName}] 리뷰 리스트</p>

      <div>
        {reviews.googlePlay.length === 0 && (
          <div>googlePlay 리뷰가 없습니다</div>
        )}
        {reviews.googlePlay.map(({ _id, name, os, review }: any) => (
          <div key={_id}>
            <hr />
            <p>name: {name}</p>
            <p>name: {os}</p>
            <p>name: {review.userName}</p>
            <p>name: {review.text}</p>
          </div>
        ))}
      </div>
      <div>
        {reviews.appStore.length === 0 && <div>appStore 리뷰가 없습니다</div>}
        {reviews.appStore.map(({ _id, name, os, review }: any) => (
          <div key={_id}>
            <hr />
            <p>name: {name}</p>
            <p>name: {os}</p>
            <p>name: {review.author}</p>
            <p>name: {review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const [name, day = '7', score = '1'] = params?.review as Array<string>;

  let url = `http://localhost:3000/api/review/day/${name}`;
  if (day) {
    url += `/${day}`;
  }
  if (score) {
    url += `/${score}`;
  }

  const { data: googlePlay } = await axios.get(`${url}/googlePlay`);
  const { data: appStore } = await axios.get(`${url}/appStore`);

  return {
    props: {
      reviews: { googlePlay, appStore },
      name,
      day,
      score: score.split(''),
    },
  };
};
