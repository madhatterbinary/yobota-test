import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

import {
  RED_PLAYER,
  YELLOW_PLAYER,
  GAME_IS_DRAW,
  RED_PLAYER_WON,
  YELLOW_PLAYER_WON,
  GAME_IS_ON
} from "../../Consts/const";

import Panel from "../Panel/Panel.jsx";
import "./game.css";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1,
    textAlign: "center"
  },
  bar: {
    backgroundColor: "#2196f3"
  },
  bootstrapRoot: {
    boxShadow: "none",
    textTransform: "uppercase",
    fontSize: 16,
    padding: "6px 12px",
    border: "1px solid",
    backgroundColor: "#2196f3",
    borderColor: "#007bff",
    color: "#fff",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:hover": {
      backgroundColor: "#007bff",
      borderColor: "#0062cc"
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#007bff",
      borderColor: "#005cbf"
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)"
    }
  }
});

class Game extends React.PureComponent {
  handleColumnSelected = column => {
    this.setState((prevState, props) => {
      let status;

      const panel = this.clonePanel(prevState.panel);
      const row = this.getDiscRow(panel, column);
      const currentPlayer =
        prevState.currentPlayer === RED_PLAYER ? YELLOW_PLAYER : RED_PLAYER;
      panel[row][column] = prevState.currentPlayer;

      const win = this.trackWin(
        panel,
        row,
        column,
        prevState.currentPlayer,
        props.length
      );
      if (win) {
        status =
          prevState.currentPlayer === RED_PLAYER
            ? RED_PLAYER_WON
            : YELLOW_PLAYER_WON;
      } else {
        status = this.trackDraw(panel, props.rows, props.columns);
      }

      return { panel, currentPlayer, status };
    });
  };

  trackDraw(panel, rows, columns) {
    return panel.reduce(
      (acc, row) => acc + row.reduce((acc, cell) => acc + Boolean(cell), 0),
      0
    ) ===
      rows * columns
      ? GAME_IS_DRAW
      : GAME_IS_ON;
  }

  trackWin(panel, row, column, player, length) {
    let i;
    let win = 0;
    win += this.trackWinColumn(panel, row, column, player, length);
    for (i = column; i > column - length; i--) {
      win += this.trackWinRow(panel, row, i, player, length);
    }
    for (i = column; i > column - length; i--) {
      win += this.trackWinDiagonalLeft(
        panel,
        row + i - column,
        i,
        player,
        length
      );
    }
    for (i = column; i > column - length; i--) {
      win += this.trackWinDiagonalRight(
        panel,
        row - i + column,
        i,
        player,
        length
      );
    }
    return Boolean(win);
  }

  trackWinDiagonalLeft(panel, row, column, player, length) {
    let suite = 0;
    for (let i = column; i < column + length; i++) {
      suite += panel[row + i - column] && panel[row + i - column][i] === player;
    }
    return suite === length;
  }

  trackWinDiagonalRight(panel, row, column, player, length) {
    let suite = 0;
    for (let i = column; i < column + length; i++) {
      suite += panel[row - i + column] && panel[row - i + column][i] === player;
    }
    return suite === length;
  }

  trackWinColumn(panel, row, column, player, length) {
    let suite = 0;
    for (let i = row; i < row + length; i++) {
      suite += panel[i] && panel[i][column] === player;
    }
    return suite === length;
  }

  trackWinRow(panel, row, column, player, length) {
    let suite = 0;
    for (let i = column; i < column + length; i++) {
      suite += panel[row] && panel[row][i] === player;
    }
    return suite === length;
  }

  clonePanel(panel) {
    return panel.map(row => [...row]);
  }

  componentWillMount() {
    console.log("componentWillMountcomponentWillMount");
    const panel = this.generatePanel(this.props.rows, this.props.columns);
    this.setState({
      panel,
      currentPlayer: RED_PLAYER,
      status: GAME_IS_ON
    });
  }
  componentDidMount() {
    console.log("componentDidMountcomponentDidMount");
  }

  generatePanel(rows, columns) {
    const panel = [];
    for (let i = 0; i < rows; i++) {
      panel[i] = [];
      for (let j = 0; j < columns; j++) {
        panel[i][j] = null;
      }
    }
    return panel;
  }

  getDiscRow(panel, column) {
    let row = panel.length - 1;
    while (panel[row][column]) {
      row--;
    }
    return row;
  }
  handleGameReset = () => {
    this.props.onGameReset();
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="Game">
        <Panel
          panel={this.state.panel}
          onColumnSelected={this.handleColumnSelected}
          status={this.state.status}
        />
        <div className="game-message">
          {this.state.status === GAME_IS_ON && (
            <p>
              playing now :
              <span
                className="game-disc"
                style={{ backgroundColor: this.state.currentPlayer }}
              />
            </p>
          )}
          {this.state.status === RED_PLAYER_WON && <p>RED PLAYER WON!</p>}
          {this.state.status === YELLOW_PLAYER_WON && <p>YELLOW PLAYER WON!</p>}
          {this.state.status === GAME_IS_DRAW && <p>GAME IS DRAW</p>}
        </div>
        {this.state.status === RED_PLAYER_WON && (
          <div className="app-buttons">
            <Button
              color="primary"
              onClick={this.handleGameReset}
              className={classes.bootstrapRoot}
            >
              clear game
            </Button>
          </div>
        )}
        {this.state.status === YELLOW_PLAYER_WON && (
          <div className="app-buttons">
            <Button
              color="primary"
              onClick={this.handleGameReset}
              className={classes.bootstrapRoot}
            >
              clear game
            </Button>
          </div>
        )}
      </div>
    );
  }
}

Game.propTypes = {
  columns: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  rows: PropTypes.number.isRequired,
  onGameReset: PropTypes.func.isRequired
};

Game.defaultProps = {};

export default withStyles(styles)(Game);
