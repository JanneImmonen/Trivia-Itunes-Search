import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Table } from "react-bootstrap";

const API_URL = "https://itunes.apple.com/search";

function AlbumSearch() {
  const [albums, setAlbums] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          term: searchTerm,
          entity: "album",
          limit: 10,
        },
      });
      setAlbums(response.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Container>
      <h1>Album Search</h1>
      <Form>
        <Form.Group controlId="search">
          <Form.Label>Search</Form.Label>
          <Form.Control
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search for an album"
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSearch}>
          Search
        </Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Album</th>
            <th>Artist</th>
            <th>Release Date</th>
          </tr>
        </thead>
        <tbody>
          {albums.map((album, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{album.collectionName}</td>
              <td>{album.artistName}</td>
              <td>{new Date(album.releaseDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
export default AlbumSearch;
