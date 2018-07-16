import React from "react";
import PropTypes from "prop-types";

import "./column.css";

function Column({ column, display, onColumnSelected }) {
  if (display) {
    return (
      <button className="column" onClick={handleClik}>
        <svg className="column-image" viewBox="0 0 401.994 401.994" fill="#ccc">
          <polygon points="130.56,224.911 130.56,291.547 255.998,370.113 381.44,291.55 381.44,224.911 255.998,303.469 	" />
          <polygon points="255.998,220.448 130.56,141.887 130.56,208.526 255.998,287.089 381.44,208.526 381.44,141.887 	" />
        </svg>
      </button>
    );
  } else {
    return <div className="column column-placeholder" />;
  }

  function handleClik() {
    onColumnSelected(column);
  }
}

Column.propTypes = {
  column: PropTypes.number.isRequired,
  onColumnSelected: PropTypes.func.isRequired
};

Column.defaultProps = {};

export default Column;
