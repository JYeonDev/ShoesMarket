import React from "react";
import { Table } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import { connect } from "react-redux";

function Cart(props) {
  return (
    <div>
      <div>
        <Table responsive="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Table heading</th>
              <th>Table heading</th>
              <th>Table heading</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Table cell</td>
              <td>{props.state[0].id}</td>
              <td>{props.state[0].name}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}

function 왜안돼(state) {
  return {
    state: state,
  };
}
export default connect(왜안돼)(Cart);
