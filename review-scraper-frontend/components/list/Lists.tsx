import styled from '@emotion/styled';
import ListItem from './ListItem';

const ListsBlock = styled.div`
  padding: 20px;
  max-width: 750px;
  margin: 0 auto;

  ul {
    display: flex;
    flex-wrap: wrap;
  }
`;

type ListsProps = {
  lists?: any;
};

const Lists = ({ lists }: ListsProps) => {
  return (
    <ListsBlock>
      <ul>
        {lists?.map((list: any) => {
          const { name, appStore } = list;
          const { icon, title } = appStore;
          return <ListItem key={name} icon={icon} name={name} title={title} />;
        })}
        <ListItem />
      </ul>
    </ListsBlock>
  );
};

export default Lists;
