import React from 'react';

const Score = (props) => {
  const { score, attempts, status, guessed } = props;

  let getStatusClass = () => {
    if (guessed) {
      return "text-white correct-click";
    }
    else {
      return "text-white incorrect-click";
    }
  }

  return ( 
    <>
    <div className="bg-dark sticky-top shadow-sm">
      <div className="score">
        <span className="text-white">
          Score: <span>{score}</span>
        </span>
        <span className="text-white">
          Attempts: <span>{attempts}</span>
        </span>
      </div>
      <div className="status">
          <span className={getStatusClass()}>{status}</span>
      </div>
    </div>
    </>
   );
}
 
export default Score;