import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import TriviaSearch from "./TriviaSearch";
import ItunesSearch from "./ItunesSearch";
import { Container, Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Container>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand as={Link} to="/">
            React App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/trivia">
                Trivia Search
              </Nav.Link>
              <Nav.Link as={Link} to="/itunes">
                iTunes Search
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes>
          <Route path="/trivia" element={<TriviaSearch />} />
          <Route path="/itunes" element={<ItunesSearch />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
