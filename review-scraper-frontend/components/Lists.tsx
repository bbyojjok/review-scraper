import styled from '@emotion/styled';
import Link from 'next/link';

const ListsBlock = styled.div`
  padding: 30px;

  ul {
    display: flex;
    flex-wrap: wrap;
    max-width: 750px;
    margin: 0 auto;

    li {
      text-align: center;
      width: 20%;
      padding: 10px;
      margin-bottom: 20px;

      a {
        display: block;

        img {
          vertical-align: top;
          width: 100%;
          border-radius: 10%;
          box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05),
            0 1px 1px rgba(0, 0, 0, 0.1);
          transition: box-shadow 0.3s;
        }

        .title {
          display: inline-block;
          padding: 10px 0 0;
          font-size: 13px;
          color: #393e46;
          transition: font-weight 0.3s;
        }
      }

      a:hover {
        img {
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.19),
            0 2px 6px rgba(0, 0, 0, 0.23);
        }

        .title {
          font-weight: 700;
        }
      }
    }
  }

  @media (max-width: 700px) {
    ul li {
      width: 25%;
    }
  }

  @media (max-width: 550px) {
    ul li {
      width: 33.3%;
    }
  }

  @media (max-width: 400px) {
    ul li {
      width: 50%;
    }
  }
`;

type ListsProps = {
  lists?: any;
};

const Lists = ({ lists }: ListsProps) => {
  return (
    <ListsBlock>
      <ul>
        {lists.map((list: any) => (
          <li key={list.name}>
            <Link href={`/${list.name}/15/1`}>
              <a>
                <img src={list.appStore?.icon} alt={list.name} />
                <span className="title">{list.appStore?.title}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </ListsBlock>
  );
};

export default Lists;
