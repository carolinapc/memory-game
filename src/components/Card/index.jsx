import React from 'react';
import './style.css';

const Card = props => {
  const { faceFront, faceBack, key, revealed } = props.card;
  const { onCardClick } = props;

  const getCardClass = () => revealed ? "flip-box-inner is-flipped" : "flip-box-inner";

  return (
    <div className="flip-box">
      <div onClick={() => onCardClick(props.card)} className={getCardClass()}>
        <div className="flip-box-front">
          <img
          src={faceFront}
          alt={key}
          />
        </div>
        <div className="flip-box-back">
          <img
          src={faceBack}
          alt={key}
          />
        </div>
      </div>
    </div>
  );
}
 
export default Card;