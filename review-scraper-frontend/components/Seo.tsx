import Head from 'next/head';

type SeoProps = {
  title: string;
  url: string;
};

const Seo = ({ title, url }: SeoProps) => {
  return (
    <Head>
      <title>{`${title} | REVIEW-SCRAPER`}</title>
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://review.stlee.kr${url}`} />
      <meta property="og:title" content={`${title} | 앱 리뷰 스크래퍼`} />
      <meta
        property="og:image"
        content="https://review.stlee.kr/logo_black.png"
      />
      <meta
        property="og:description"
        content="커머스 앱 리뷰 모아보기. 평점 요일별로 조회해서 리뷰를 확인해보세요."
      />
      <meta property="og:site_name" content="stlee" />
      <meta property="og:locale" content="ko-KR" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
    </Head>
  );
};

export default Seo;
