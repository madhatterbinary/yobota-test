import React from "react";
import PropTypes from "prop-types";

import "./disc.css";

class Disc extends React.PureComponent {
  componentDidMount() {
    setTimeout(
      () => this.setState({ top: `${(this.props.row + 1) * 41 + 1}px` }),
      0
    );
  }

  constructor(props) {
    super(props);
    this.state = { top: "0px" };
  }

  render() {
    console.log(this.state.top);
    const styles = {
      backgroundColor: this.props.cell,
      left: `${this.props.column * 41 + 1}px`,
      top: this.state.top
    };
    return <div className="disc" style={styles} />;
  }
}

Disc.propTypes = {
  cell: PropTypes.string.isRequired,
  column: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired
};

Disc.defaultProps = {};

export default Disc;
