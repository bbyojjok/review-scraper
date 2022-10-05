import Head from 'next/head';

type SeoProps = {
  title: string;
};

const Seo = ({ title }: SeoProps) => {
  return (
    <Head>
      <title>{`${title} | REVIEW-SCRAPER`}</title>
    </Head>
  );
};

export default Seo;
