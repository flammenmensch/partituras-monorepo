import React from 'react';
import { Link } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import ErrorNotification from '../ErrorNotification/ErrorNotification';
import SheetMusicCard from '../SheetMusicCard/SheetMusicCard';

const GET_RANDOM = gql`
  query Query($count: Int!) {
    getRandom(count: $count) {
      items {
        _id,
        title,
        genre,
        cover { source }
      }
    }
  }
`;

interface Props {
  count?: number;
}

const RandomSheets: React.FC<Props> = (props) => {
  const {loading, error, data} = useQuery(GET_RANDOM, {variables: {count: props.count}});

  if (loading) {
    return <>Loading</>;
  }

  if (error) {
    return <ErrorNotification error={error} />
  }

  const result = data.getRandom;

  return (
    <>
      <h3 className="subtitle is-4">Random sheet music</h3>
      <ul className="columns">
        {result.items.map((item: any) => (
          <li key={item._id} className="column">
            <Link to={`/partitura/${item._id}`}>
              <SheetMusicCard
                title={item.title}
                genre={item.genre}
                cover={item.cover?.source}
              />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

RandomSheets.defaultProps = {
  count: 5
};

export default RandomSheets;
