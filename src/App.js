import React, { Component } from 'react';
import RunningLine from './components/RunningLine';
import { Game } from './Game';

class App extends Component {
  constructor () {
    super();
    this.conunter = 0;

    this.drowField = this.drowField.bind(this);
    this.onKeyPressed = this.onKeyPressed.bind(this);

    this.game = new Game();

    this.activeColor = "#111";
    this.passiveColor = "#ddd";

    document.addEventListener("keydown", this.onKeyPressed.bind(this));

    const gameField = this.game.field;
    const colors = this.drowField(gameField);
    this.state = {colors: colors};
  }

  componentDidMount() {
    const self = this;
    const step = () => {
      self.game.next();
      const colors = self.drowField(this.game.field);
      self.setState({colors: colors});
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }


  render() {
    return (
      <svg width="1000" height="400" version="1.1"
        viewBox="0 0 1000 400" preserveAspectRatio="none">
        <RunningLine colors={this.state.colors}/>
      </svg>
    );
  }
  drowField(gameField) {
    const colors = [];
    for (let i = 0; i < this.game.width; i++) {
      const colorColumn = [];
      for (let j = 0; j < this.game.height; j++) {
        colorColumn.push(gameField[i][j] >= 1 ? this.activeColor : this.passiveColor);
      }
      colors.push(colorColumn);
    }
    return colors;
  }
  onKeyPressed(e) {
    switch (e.code) {

      case 'ArrowUp':
        this.game.snakeDirection = 'up';
        break;

      case 'ArrowDown':
        this.game.snakeDirection = 'down';
        break;

      case 'ArrowLeft':
        this.game.snakeDirection = 'left';
        break;

      case 'ArrowRight':
        this.game.snakeDirection = 'right';
        break;

      default:
        break;
    }
  }
}

export default App;
