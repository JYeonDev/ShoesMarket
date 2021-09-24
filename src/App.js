/* eslint-disable */

import React, { useContext, useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import "./App.css";
import data from "./data";
import Detail from "./Components/Detail";
import axios from "axios";

import { Link, Route, Switch } from "react-router-dom";
import Cart from "./Components/Cart";

let stockContext = React.createContext();

function App() {
  let [shoes, setShoes] = useState(data);
  let [stock, setStock] = useState([10, 11, 12]);

  return (
    <div className="App">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Shoes Market</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/detail">
                Detail
              </Nav.Link>
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">More deets</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Dank memes
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Switch>
        <Route exact path="/">
          <div className="jumbotron">
            <h1>20% Season Off</h1>
            <p>this is jumbotron</p>
            <button>Click me!</button>
          </div>
          <stockContext.Provider value={stock}>
            <div className="container">
              {shoes.map((a, i) => {
                return <Card shoes={a} i={i} key={i} />;
              })}
            </div>
          </stockContext.Provider>
          <button
            className="btn btn-primary"
            onClick={() => {
              axios
                .get("https://codingapple1.github.io/shop/data2.json")
                .then((result) => {
                  setShoes([...shoes, ...result.data]);
                })
                .catch(() => {
                  console.log("실패");
                });
            }}
          >
            더보기
          </button>
        </Route>
        <Route path="/detail/:id">
          <Detail shoes={shoes} stock={stock} setStock={setStock} />
        </Route>

        <Route path="/cart">
          <Cart></Cart>
        </Route>

        <Route path="/:id">
          <div>아무거나 적었을때 이거 보여주세요</div>
        </Route>
      </Switch>
    </div>
  );
}

function Card(props) {
  let stock = useContext(stockContext);

  return (
    <div className="col-md-4">
      <img
        src={
          "https://codingapple1.github.io/shop/shoes" + (props.i + 1) + ".jpg"
        }
        width="100%"
      />
      <h4>{props.shoes.title}</h4>
      <p>
        {props.shoes.content} & {props.shoes.price}
      </p>
      {stock[props.i]}
    </div>
  );
}

export default App;
