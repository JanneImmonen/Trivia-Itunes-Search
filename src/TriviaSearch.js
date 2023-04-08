import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Table } from "react-bootstrap";

const API_URL = "https://opentdb.com/api.php?amount=10";
const API_CATEGORIES_URL = "https://opentdb.com/api_category.php";

function TriviaSearch() {
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        API_URL + (selectedCategory ? `&category=${selectedCategory}` : "")
      );
      setQuestions(response.data.results);

      const categoriesResponse = await axios.get(API_CATEGORIES_URL);
      setCategories(categoriesResponse.data.trivia_categories);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = () => {
    fetchData();
  };

  return (
    <Container>
      <h1>Trivia Question Search</h1>
      <Form>
        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" onClick={handleSearch}>
          Search
        </Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Question</th>
            <th>Category</th>
            <th>Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td dangerouslySetInnerHTML={{ __html: question.question }} />
              <td>{question.category}</td>
              <td>{question.difficulty}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default TriviaSearch;
