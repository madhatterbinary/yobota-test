import React from "react";
import PropTypes from "prop-types";

import { GAME_IS_ON } from "../../Consts/const";

import Cell from "../Cell/Cell.jsx";
import Column from "../Column/Column.jsx";
import Disc from "../Disc/Disc.jsx";
import "./panel.css";

function Panel({ panel, onColumnSelected, status }) {
  return (
    <div className="panel">
      <div className="panel-container">
        {panel.map((row, rowIndex) =>
          row.map(
            (cell, columnIndex) =>
              cell && (
                <Disc
                  cell={cell}
                  column={columnIndex}
                  key={`${rowIndex}-${columnIndex}`}
                  row={rowIndex}
                />
              )
          )
        )}
        <div className="panel-table">
          <div className="panel-head">
            <div className="panel-row">
              {panel[0].map((column, columnIndex) => (
                <div className="panel-cell" key={columnIndex}>
                  <Column
                    column={columnIndex}
                    display={!column && status === GAME_IS_ON}
                    onColumnSelected={onColumnSelected}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="panel-body">
            {panel.map((row, rowIndex) => (
              <div className="panel-row" key={rowIndex}>
                {row.map((cell, columnIndex) => (
                  <div
                    className="panel-cell"
                    key={columnIndex}
                    id={`${rowIndex}-${columnIndex}`}
                  >
                    <Cell column={columnIndex} row={rowIndex} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Panel.propTypes = {
  panel: PropTypes.arrayOf(PropTypes.array),
  onColumnSelected: PropTypes.func.isRequired,
  status: PropTypes.string
};

Panel.defaultProps = {};

export default Panel;
