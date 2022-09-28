import styled from '@emotion/styled';
import Link from 'next/link';
import { MdOutlineArrowForward, MdAdd } from 'react-icons/md';

const ListItemBlock = styled.li`
  text-align: center;
  width: 20%;
  padding: 20px;

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
      transition: all 0.2s;

      img {
        border-radius: 10%;
        transition: all 0.3s;
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
        border-radius: 10%;
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
    }
  }

  @media (hover: hover) {
    & {
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
    }

    &.add {
      a:hover {
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

  @media (max-width: 700px) {
    & {
      width: 25%;
    }
  }

  @media (max-width: 550px) {
    & {
      width: 33.3%;
    }
  }

  @media (max-width: 400px) {
    & {
      width: 50%;
    }
  }
`;

type ListItemProps = {
  icon?: string;
  name?: string;
  title?: string;
};

const ListItem = ({ icon, name, title }: ListItemProps) => {
  const href = name ? `/review/${name}/7/12345` : '/admin/add';
  return (
    <>
      {name ? (
        <ListItemBlock>
          <Link href={href}>
            <a>
              <span className="img">
                <img src={icon} alt={name} />
                <span className="over-box">
                  <span className="icon">
                    <MdOutlineArrowForward color="#000" />
                  </span>
                </span>
              </span>
              <span className="title">{title}</span>
            </a>
          </Link>
        </ListItemBlock>
      ) : (
        <ListItemBlock className="add">
          <Link href={href}>
            <a>
              <span className="img">
                <MdAdd className="add" />
              </span>
            </a>
          </Link>
        </ListItemBlock>
      )}
    </>
  );
};

export default ListItem;