import styled from '@emotion/styled';
import Link from 'next/link';
import { MdOutlineArrowForward, MdAdd } from 'react-icons/md';

const ListsBlock = styled.div`
  padding: 20px;

  ul {
    display: flex;
    flex-wrap: wrap;
    max-width: 750px;
    margin: 0 auto;

    li {
      text-align: center;
      width: 20%;
      padding: 20px;
      margin-bottom: 20px;

      a {
        display: block;

        img {
          vertical-align: top;
          width: 100%;
        }

        .img {
          position: relative;
          overflow: hidden;
          display: block;
          width: 100%;
          border-radius: 10%;
          border: 1px solid transparent;
          transition: border 0.2s;

          img {
            border-radius: 10%;
            transition: scale 0.3s;
          }

          .over-box {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(0, 0, 0, 0.6);
            opacity: 0;
            transition: opacity 0.2s;

            .icon {
              display: inline-block;
              padding: 10px;
              background-color: rgba(255, 255, 255, 0.6);
              border-radius: 50%;
            }
          }
        }

        .title {
          display: inline-block;
          padding: 10px 0 0;
          font-size: 13px;
          color: #ddd;
          transition: color 0.2s;
        }
      }

      a:hover {
        .img {
          border: 1px solid #fff;

          img {
            scale: 1.1;
          }

          .over-box {
            opacity: 1;
          }
        }

        .title {
          color: #fff;
        }
      }

      &.add {
        a {
          position: relative;
          padding: 100% 0 0 0;

          .img {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #ddd;

            .add {
              width: 2rem;
              height: 2rem;
              color: #ddd;
              transition: all 0.2s;
            }
          }

          &:hover {
            .img {
              border: 1px solid #fff;
            }

            .add {
              width: 3rem;
              height: 3rem;
              color: #fff;
            }
          }
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
    padding: 30px 15px;

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
            <Link href={`/review/${list.name}/7/1`}>
              <a>
                <span className="img">
                  <img src={list.appStore?.icon} alt={list.name} />
                  <span className="over-box">
                    <span className="icon">
                      <MdOutlineArrowForward color="#000" />
                    </span>
                  </span>
                </span>
                <span className="title">{list.appStore?.title}</span>
              </a>
            </Link>
          </li>
        ))}
        <li className="add">
          <Link href="/admin/add">
            <a>
              <span className="img">
                <MdAdd className="add" />
              </span>
            </a>
          </Link>
        </li>
      </ul>
    </ListsBlock>
  );
};

export default Lists;
