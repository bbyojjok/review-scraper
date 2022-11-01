import React from 'react';
import Head from 'next/head';

type SeoProps = {
  title: string;
  url: string;
};

const Seo = ({ title, url }: SeoProps) => {
  return (
    <Head>
      <title>{`${title} | REVIEW-SCRAPER`}</title>
      <meta
        name="viewport"
        content="user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width"
      />
      <meta
        name="description"
        content="커머스 앱 리뷰 모아보기. 평점 및 일자를 조회해서 리뷰를 확인해보세요."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://review.stlee.kr${url}`} />
      <meta property="og:title" content={`${title} | 앱 리뷰 스크래퍼`} />
      <meta
        property="og:image"
        content="https://review.stlee.kr/logo_white.png"
      />
      <meta
        property="og:description"
        content="커머스 앱 리뷰 모아보기. 평점 및 일자를 조회해서 리뷰를 확인해보세요."
      />
      <meta property="og:site_name" content="stlee" />
      <meta property="og:locale" content="ko-KR" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
    </Head>
  );
};

export default React.memo(Seo);
