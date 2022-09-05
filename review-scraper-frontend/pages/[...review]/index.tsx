import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';

export default function Review({ reviews, day, score }: any) {
  // const [day, setDay] = useState<string>('7');
  // const [score, setScore] = useState<string>('1');
  console.log('reviews:', reviews);
  console.log('day:', day);
  console.log('score:', score);

  return (
    <div>
      <div className="score-box">
        <label title="별점1">
          <input type="checkbox" name="score" value="1" />
          <span>별점1</span>
        </label>
        <label title="별점2">
          <input type="checkbox" name="score" value="2" />
          <span>별점2</span>
        </label>
        <label title="별점3">
          <input type="checkbox" name="score" value="3" />
          <span>별점3</span>
        </label>
        <label title="별점4">
          <input type="checkbox" name="score" value="4" />
          <span>별점4</span>
        </label>
        <label title="별점5">
          <input type="checkbox" name="score" value="5" />
          <span>별점5</span>
        </label>
      </div>

      <div className="date-box">
        <label title="7일">
          <input type="radio" name="date" value="7" checked={true} />
          <span>7일</span>
        </label>
        <label title="15일">
          <input type="radio" name="date" value="15" />
          <span>15일</span>
        </label>
        <label title="30일">
          <input type="radio" name="date" value="30" />
          <span>30일</span>
        </label>
        <label title="90일">
          <input type="radio" name="date" value="90" />
          <span>90일</span>
        </label>
        <label title="180일">
          <input type="radio" name="date" value="180" />
          <span>180일</span>
        </label>
      </div>

      <p>hello~~</p>
      {reviews.map(({ _id, name, os, review }: any) => (
        <div key={_id}>
          <hr />
          <p>name: {name}</p>
          <p>name: {os}</p>
          <p>name: {os === 'googlePlay' ? review.userName : review.author}</p>
          <p>name: {os === 'googlePlay' ? review.text : review.comment}</p>
        </div>
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const [name, day, score] = params?.review as Array<string>;

  let url = `http://localhost:3000/api/review/day/${name}`;
  if (day) {
    url += `/${day}`;
  }
  if (score) {
    url += `/${score}`;
  }
  const { data: reviews } = await axios.get(url);

  return {
    props: { reviews, day, score },
  };
};
