import React, { Component } from 'react';

import { keys } from 'lodash';
import LevelSelector from './components/minesweeper-level-selector.js';
import MinesweeperGame from './components/minesweeper-game.js';
import ScoreBoard from './components/scoreboard.js';
import { Modal, Button } from "react-bootstrap";
import MinesweeperGameModel from './model/minesweeper-game-model.js';
import MouseModel from './model/mouse-model.js';
import './css/minesweeper.css';

class App extends React.Component {
  //itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

  constructor(props) {
    super();
    this.setEventHandlers = this.setEventHandlers.bind(this);
    this.onDifficultySelected = this.onDifficultySelected.bind(this);
    this.onDifficultyCustomSelected = this.onDifficultyCustomSelected.bind(this);
    this.onPublishScore = this.onPublishScore.bind(this);

    this.itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
		localStorage.setItem('items', JSON.stringify(this.itemsArray));

    var defaultLevel = "easy";
    var game = new MinesweeperGameModel(this.levelsAvailable()[defaultLevel]);
    var mouse = new MouseModel();
    this.setEventHandlers(mouse, game);
    this.state = {
      game: game,
      status: game.status,
      mouse: mouse,
      selectedLevel: defaultLevel,
      tablerefresh: false,
      scores: { "easy":{}, "medium":{}, "hard":{}, "customize":{}},
    };
  }

  setEventHandlers(mouse, game){
    mouse.addEventHandler({
      mouseUp: game.onMouseUp,
      mouseDown: game.onMouseDown,
      mouseOut: game.onMouseOut,
      mouseOver: game.onMouseOver,
      onStateChanged: (eventName, e, sender) => { 
        this.setState({ mouse: sender });
      },
    });
    mouse.addEventHandler({
      mouseDown: (eventName, e, sender) => {
        if (!this.state.game.isGameOver()){
          this.state.game.header.smileyButton.setOoh();
        }
      },
      mouseUp: (eventName, e, sender) => {
        if (!this.state.game.isGameOver()){
          this.state.game.header.smileyButton.setSmile();
        } else {

        }
      },
    });
    game.addEventHandler({
      onStateChanged: (eventName, e, sender) => {
        this.setState({game: sender, status: sender.status});
        if (sender.status === 'lost' || sender.status === 'win') {
          this.setState({game: sender, status: sender.status, tablerefresh:true});
        } else {
          this.setState({game: sender, status: sender.status});
        }
      },
    });
  }

  levelsAvailable(){
    return {
      "easy": {
        "mines":10,
        "width": 9,
        "height": 9
      },
      "medium": {
        "mines": 40,
        "width": 16,
        "height": 16
      },
      "hard" : {
        "mines" :99,
        "width": 30,
        "height": 16
      },
      "customize" : {
        "mines" :10,
        "width": 80,
        "height": 30
      }
    };
  }

  onDifficultySelected(dif){
    this.setState({ selectedLevel: dif });
    this.state.game.restartGame(
      this.levelsAvailable()[dif]
    );
  }

  onDifficultyCustomSelected(dif, setting) {
    this.setState({ selectedLevel: dif });
    this.state.game.restartGame(setting);
  }

  onPublishScore() {

    let item = {};
    let spenttime = ''+this.state.game.header.timeCounter.getNthDigit(1)+
                        this.state.game.header.timeCounter.getNthDigit(2)+
                        this.state.game.header.timeCounter.getNthDigit(3);
    
    item.start = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit'})
                        .format(this.state.game.header.timeCounter.getStartTime());
    item.end = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit'})
                        .format(this.state.game.header.timeCounter.getEndTime());
    item.diff = this.state.selectedLevel;
    item.total = parseInt(spenttime, 10);
    item.status = this.state.game.status;
    this.itemsArray.push(item);
    localStorage.setItem('items', JSON.stringify(this.itemsArray));

    this.state.game.publishGame();
    this.setState({status: 'publish', tablerefresh:false});    
  }

  calcStyle(settings){
    var fieldWidth = 16, borderWidth = 10;
    return {
      "width": fieldWidth * settings.width + 2 * borderWidth,
      "height": fieldWidth * settings.height
    }
  }

  render() {
    const { game, mouse, selectedLevel, tablerefresh } = this.state;
    return (
      <div>
        <div className="row-minesweeper" >
          <div className="row-minesweeper nav-item bg-dark">
            <LevelSelector choices={keys(this.levelsAvailable())} 
                selectedChoice={selectedLevel}
                innitGameCallback={this.onDifficultySelected} 
                innitCustomGameCallback={this.onDifficultyCustomSelected} />
          </div>
          <div className="row-minesweeper z100 game-pane text-center">
            <MinesweeperGame game={game} mouse={mouse} />
          </div>
          <div className="row-minesweeper text-center">
            <ScoreBoard
              scores = {tablerefresh}
            />
          </div>
        </div>  
        <Modal show={this.state.status === 'lost'} centered={true} onHide={this.onPublishScore}>
					<Modal.Header><Modal.Title>Game Fail</Modal.Title></Modal.Header>
					<Modal.Body>Press button 😣 to start over.</Modal.Body>
					<Modal.Footer><Button variant="danger" onClick={this.onPublishScore}>Confirm</Button></Modal.Footer>
				</Modal>
        <Modal show={this.state.status === 'win'} centered={true} onHide={this.onPublishScore}>
					<Modal.Header><Modal.Title>Game Success</Modal.Title></Modal.Header>
					<Modal.Body>Press button 😎 to start over.</Modal.Body>
					<Modal.Footer><Button variant="success" onClick={this.onPublishScore}>Confirm</Button></Modal.Footer>
				</Modal>
      </div>  
    );
  } 
}

export default App;
