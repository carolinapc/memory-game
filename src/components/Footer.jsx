import React from 'react';

class Footer extends React.Component {
  state = {
    btnAudioText: "Play/Pause Audio"
  };

  //controls the audio
  toggledAudio = () => {
    const player = document.getElementById("player");

    if (player.paused) {
      player.play();
      this.setState({btnAudioText: "Pause Audio"});
    }
    else {
      player.pause();
      this.setState({btnAudioText: "Play Audio"});
    }
  }

  render() {
    return ( 
      <footer className="bg-dark text-white p-2 mt-auto text-center">
        <audio controls style={{display: 'none'}} id="player" autoPlay>
          <source src="bgsound.mp3" type="audio/mpeg" />
        </audio>
        &copy; Carolina Cavalcanti <br/>
        <button className="btn btn-secondary" onClick={this.toggledAudio}>{this.state.btnAudioText}</button>
      </footer>
    );
  }
}
 
export default Footer;