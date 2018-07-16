import React from "react";
import Game from "../Game/Game.jsx";
import "./app.css";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

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
  }
});

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      config: {
        columns: 7,
        length: 4,
        rows: 6
      },
      play: true
    };
  }
  onGameReset = () => {
    this.setState(
      {
        play: false
      },
      () => {
        this.setState({
          play: true
        });
      }
    );
  };

  handleGameStart = () => {
    this.setState({
      play: true
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar className={classes.bar} position="static">
          <Toolbar>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              CONNECT 4
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="app">
          {this.state.play && (
            <div>
              <Game {...this.state.config} onGameReset={this.onGameReset} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
