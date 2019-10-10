import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Score from './components/Score';
import Card from './components/Card';
import dbCards from './cards.json';
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'animate.css';
import './App.css';


class App extends React.Component {

  defaultStatus = "10 seconds";
  maxScore = 10;
  countInterval;
  time = 10;

  state = {
    cardsClicked: [],
    cards: dbCards,
    score: 0,
    attempts: 0,
    status: this.defaultStatus,
    started: false
  }
  
  constructor() {
    super();
    
    //add mirror cards
    let newCards = [...dbCards, ...dbCards];
    
    //add unique key for all cards
    newCards = newCards.map((card, index) => {
      card = JSON.parse(JSON.stringify(card)); //create a new object for each card
      card.key = `key-${index}`;
      return card;
    });
    
    //shuffle the cards list and update them on the state
    this.shuffleArray(newCards);
    this.state.cards = newCards;

  }
  
  shuffleArray = array => {
    for(let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }


  onCardClick = (cardClicked) => {
    let { cards, cardsClicked, attempts, score, status, paused } = this.state;

    if (!cardClicked.revealed && !paused) {
      cardsClicked.push(cardClicked);

      if (cardsClicked.length <= 2) {
        //revealed the card
        cards.map(card => {
          if (cardClicked.key === card.key && !card.revealed) {
            card.revealed = true;
          }
          return card;
        });
        
        status = "Click on the other card";

        //update the state
        this.setState({ cards, status });

      }

      //if there are 2 cards revealed
      if (cardsClicked.length === 2) {
        attempts++;    
  
        //check if they have same id
        if (cardsClicked[0].id === cardsClicked[1].id) {
          score++;
          cards.map(card => {
            if (card.key === cardsClicked[0].key || card.key === cardsClicked[0].key) {
              card.guessed = true;
            }
            return card;
          });
          
          cardsClicked = [];
          if (score === this.maxScore) {
            status = "You WON!!";

            setTimeout(() => {
              this.setState({ cards, cardsClicked, score, attempts, status });
            }, 2000);
          }
          else {
            status = "You've found the same card!";
            this.setState({ cards, cardsClicked, score, attempts, status });
          }
        }
        else {
          status = "Wrong card!";
          setTimeout(() => {
            cards.map(card => {
              if (card.key === cardsClicked[0].key || card.key === cardsClicked[1].key) {
                card.revealed = false;
              }
              return card;
            });

            cardsClicked = [];
            this.setState({ cards, cardsClicked, score, attempts, status });
    
          }, 1000);
        }
      }
    }
  }

  countDown = () =>{
    if(this.time > 0){
      this.time--;
      this.setState({ status: `${this.time} seconds` });
    }
    else{
      clearInterval(this.countInterval);
      this.time = 10;
      this.setState({ status: "Play!"});
    }
  }

  start = () => {
    let cards = this.state.cards.map(card => {
      card.guessed = false;
      card.revealed = true;
      return card;
    });

    this.shuffleArray(cards);
    
    this.setState({
      cards,
      cardsClicked: [],
      status: this.defaultStatus,
      score: 0,
      attempts: 0,
      started: true,
      paused: true
    });  

    this.countInterval = setInterval(this.countDown, 1000);

    setTimeout(() => {
      cards = this.state.cards.map(card => {
        card.revealed = false;
        return card;
      });      
      this.setState({ cards, paused: false });
    },10000);
    
  }

  render() {
    const { started, score, attempts, status, cards, guessed } = this.state;

    const getContent = () => {

      if (score !== this.maxScore && started) {
        return (
          <div className="wrap-card">
          {cards.map(card => {
            return (
              <Card
              key={card.key}
              card={card}
              onCardClick={this.onCardClick}
              />
              );
            })}
          </div>
        );
      } else if(started) {
        return (
          <div className="victory">
            <h4>YOU WON!!</h4>
            <h4>CONGRATULATIONS!</h4>
            <button className="btn btn-dark" onClick={this.start}>Play Again</button>
          </div>
        );
      }
      else {
        return (
          <div className="victory">
            <h4>You have 10 seconds to memorize the cards position.</h4>
            <h4>Find all the pairs.</h4>
            <h4>Good Luck!</h4>
            <button className="btn btn-dark" onClick={this.start}>Start!</button>
          </div>
        );
      }
    }
    
    return (
      <>
        <Header />
        <Score score={score} attempts={attempts} status={status} guessed={guessed} />
        <main>
          {getContent()}
        </main>
        <Footer />
      </>
    );
  }
}

export default App;
