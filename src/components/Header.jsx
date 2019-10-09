import React from 'react';

const Header = () => {
  
  return (
    <div className="header" style={{ backgroundImage: `url("img/background.jpg")` }}>
      <h3>Game Of Thrones</h3>    
      <h4>Clicky Game</h4>    
      <h5>Click on an image to earn points</h5>
      <h5>but you can't click on the same image more than once!</h5>
    </div>
  );
}

export default Header;