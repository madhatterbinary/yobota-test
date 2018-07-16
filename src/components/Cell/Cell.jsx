import React from "react";
import PropTypes from "prop-types";

import "./cell.css";

function Cell({ column, row }) {
  return (
    <div className="cell">
      <div className="cell-mask" />
    </div>
  );
}

Cell.propTypes = {
  column: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired
};

Cell.defaultProps = {};

export default Cell;
