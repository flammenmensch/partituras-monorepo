import React from 'react';
import { gql } from 'apollo-boost';
import { useRouteMatch } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import ErrorNotification from '../../components/ErrorNotification/ErrorNotification';
import DownloadButton from '../../components/DownloadButton/DownloadButton';

interface RouteParams {
  id: string;
}

const GET_PARTITURA = gql`
  query GetPartitura($id: ID!) {
    getById(id: $id) {
      title,
      genre,
      scores {
        url
      }
      source {
        url
      }
    }
  }
`;

const Partitura = () => {
  const router = useRouteMatch<RouteParams>();
  const id = router.params.id;
  const {loading, error, data} = useQuery(GET_PARTITURA, {variables: { id }});

  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <ErrorNotification error={error}/>;
  }

  const result = data.getById;

  return (
    <section className="section">
      <div className="container">
        <div className="level">
          <div className="level-left">
            <h1 className="title is-capitalized">
              {result.title}&nbsp;
              <span className="tag is-info is-normal is-capitalized">
                {result.genre}
              </span>
            </h1>
          </div>
          <div className="level-right">
            <DownloadButton id={id}/>
            <a className="button" target="_blank" href={result.source.url}>
              Original source
            </a>
          </div>
        </div>
        <div className="tabs">
          <ul>
            <li className="is-active"><a>Sheet music</a></li>
            <li><a>Lyrics</a></li>
            <li><a>Audio</a></li>
          </ul>
        </div>

        <ul>
          {result.scores.map((page: { url: string }, index: number) => (
            <li key={index}>
              <img alt={`Page no.${index}`} src={page.url}/>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Partitura;
