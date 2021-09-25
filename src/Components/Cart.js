import React, { useEffect, memo } from "react";
import { Table } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import { connect, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

let Alert = styled.div`
  background-color: #ffe591;
  padding: 20px 0;
  margin: 0 30px;
  font-size: 18px;
  border-radius: 10px;
`;

function Cart(props) {
  let state = useSelector((state) => state);
  console.log(state);
  let dispatch = useDispatch();

  return (
    <div>
      <div>
        <Table responsive="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>상품명</th>
              <th>수량</th>
              <th>변경</th>
            </tr>
          </thead>
          <tbody>
            {state.reducer.map((a, i) => {
              return (
                <tr key={i}>
                  <td>{a.id}</td>
                  <td>{a.name}</td>
                  <td>{a.quan}</td>
                  <td>
                    <button
                      onClick={() => {
                        dispatch({
                          type: "수량증가",
                          data: a.id,
                        });
                      }}
                    >
                      +
                    </button>
                    <button
                      onClick={() => {
                        dispatch({ type: "수량감소", data: a.id });
                      }}
                    >
                      -
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      {props.alert === true ? (
        <Alert>
          <p>지금 구매하시면 신규할인 20%</p>
          <button
            onClick={() => {
              dispatch({ type: "alertClose" });
            }}
          >
            닫기
          </button>
        </Alert>
      ) : null}
      <Parent 이름="존박" 나이="20"></Parent>
    </div>
  );
}

/* function 왜안돼(state) {
  console.log(state);
  return {
    state: state.reducer,
    alert: state.reducer2,
  };
}
export default connect(왜안돼)(Cart);
 */

function Parent(props) {
  return (
    <div>
      <Child1 이름={props.이름}></Child1>
      <Child2 나이={props.나이}></Child2>
    </div>
  );
}

function Child1(props) {
  useEffect(() => {
    console.log("렌더링됨1");
  });
  return <div>1111</div>;
}

let Child2 = memo(function (props) {
  useEffect(() => {
    console.log("렌더링됨2");
  });
  return <div>2222</div>;
});

export default Cart;
