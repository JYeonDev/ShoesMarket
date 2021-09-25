import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { Nav } from "react-bootstrap";
import "./Detail.scss";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";

let Box = styled.div`
  padding: 20px;
  font
`;

let Title = styled.h4`
  font-size: 25px;
  color: ${(props) => props.color};
`;

function Detail(props) {
  let [alert, setAlert] = useState(true);
  let [value, setValue] = useState("");

  let [tab, setTab] = useState(0);
  let [on, off] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => {
      setAlert(false);
      return () => {
        clearTimeout(alert);
      };
    }, 2000);
  }, []);

  let { id } = useParams();
  let searchItem = props.shoes.find(function (item) {
    return item.id == id;
  });
  let history = useHistory();
  return (
    <div className="container">
      <Box>
        <Title className="red">상세페이지</Title>
      </Box>

      {/* {value}
      <input
        onChange={(e) => {
          setValue(e.target.value);
        }}
      /> */}

      {alert === true ? (
        <div className="my-alert2">
          <p>재고가 얼마 남지 않았습니다</p>
        </div>
      ) : null}

      <div className="row">
        <div className="col-md-6">
          <img
            src="https://codingapple1.github.io/shop/shoes1.jpg"
            width="100%"
            alt="이미지"
          />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{searchItem.title}</h4>
          <p>{searchItem.content}</p>
          <p>{searchItem.price}원</p>

          <Info stock={props.stock}></Info>

          <button
            className="btn btn-danger"
            onClick={() => {
              props.setStock(10);
              props.dispatch({
                type: "항목추가",
                payload: { id: searchItem.id, name: searchItem.title, quan: 1 },
              });
              history.push("/cart");
            }}
          >
            주문하기
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              history.goBack();
            }}
          >
            뒤로가기
          </button>
        </div>
      </div>

      <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link
            eventKey="link-0"
            onClick={() => {
              off(false);
              setTab(0);
            }}
          >
            Active
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            onClick={() => {
              off(false);
              setTab(1);
            }}
          >
            Option 2
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <CSSTransition in={on} classNames="wow" timeout={1000}>
        <TabContent tab={tab} off={off} />
      </CSSTransition>
    </div>
  );
}

function TabContent(props) {
  useEffect(() => {
    props.off(true);
  });
  if (props.tab === 0) {
    return <div>0번째 내용입니다.</div>;
  } else if (props.tab === 1) {
    return <div>1번째 내용입니다.</div>;
  }
}

function Info(props) {
  return <p>재고 : {props.stock}</p>;
}

function 왜안돼(state) {
  console.log(state);
  return {
    state: state.reducer,
    alert: state.reducer2,
  };
}
export default connect(왜안돼)(Detail);
