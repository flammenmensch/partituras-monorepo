import React from 'react';

interface Props {
  cover?: string;
  title: string;
  genre: string;
}

const SheetMusicCard = (props: Props) => (
  <div className="card is-small">
    <div className="card-image">
      <figure className="image is-3by4">
        {props.cover
          ? <img src={props.cover} alt={props.title}/>
          : <img src="https://via.placeholder.com/150x200?text=No+Cover" alt={props.title}/>
        }
      </figure>
    </div>
    <div className="card-content">
      <p className="title is-5">{props.title}</p>
      <p className="subtitle is-capitalized">{props.genre}</p>
    </div>
  </div>
);

export default SheetMusicCard;
