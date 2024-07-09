import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';

const CharacterCreatorEditor = ({ mode = 'create', character_id = {}, onSave }) => {
  const parseJSONIfNeeded = (data, defaultValue) => {
    if (typeof data === 'string') {
      try {
        return JSON.parse(data);
      } catch (e) {
        // console.error('Failed to parse JSON', e);
        return defaultValue;
      }
    } else if (typeof data === 'object' && data !== null) {
      return data;
    }
    return defaultValue;
  };

  const [characterDetails, setCharacterDetails] = useState({
    fullname: character.fullname || '',
    alignment: character.alignment || '',
    family: character.family || '',
    race: character.race || '',
    age: character.age || '',
    image: character.image || '',
    mugshot: parseJSONIfNeeded(character.mugshot, { scale: 0.5, x: 0.5, y: 0.5 }),
    neutral_traits: parseJSONIfNeeded(character.neutral_traits, []),
    negative_traits: parseJSONIfNeeded(character.negative_traits, []),
    known_characters: parseJSONIfNeeded(character.known_characters, []),
    skills: parseJSONIfNeeded(character.skills, []),
    short_backstory: character.short_backstory || '',
    core_memories: parseJSONIfNeeded(character.core_memories, {}),
    long_term_goals: parseJSONIfNeeded(character.long_term_goals, []),
    physical_appearance: parseJSONIfNeeded(character.physical_appearance, {}),
    personality_traits: parseJSONIfNeeded(character.personality_traits, []),
    beliefs_values: parseJSONIfNeeded(character.beliefs_values, {}),
    relationships: parseJSONIfNeeded(character.relationships, {}),
    fears_vulnerabilities: parseJSONIfNeeded(character.fears_vulnerabilities, {}),
    unique_abilities_powers: parseJSONIfNeeded(character.unique_abilities_powers, []),
    hobbies_interests: parseJSONIfNeeded(character.hobbies_interests, []),
    quirks_habits: parseJSONIfNeeded(character.quirks_habits, []),
  });

  useEffect(() => {
    if (character) {
      setCharacterDetails({
        fullname: character.fullname || '',
        alignment: character.alignment || '',
        family: character.family || '',
        race: character.race || '',
        age: character.age || '',
        image: character.image || '',
        mugshot: parseJSONIfNeeded(character.mugshot, { scale: 0.5, x: 0.5, y: 0.5 }),
        neutral_traits: parseJSONIfNeeded(character.neutral_traits, []),
        negative_traits: parseJSONIfNeeded(character.negative_traits, []),
        known_characters: parseJSONIfNeeded(character.known_characters, []),
        skills: parseJSONIfNeeded(character.skills, []),
        short_backstory: character.short_backstory || '',
        core_memories: parseJSONIfNeeded(character.core_memories, {}),
        long_term_goals: parseJSONIfNeeded(character.long_term_goals, []),
        physical_appearance: parseJSONIfNeeded(character.physical_appearance, {}),
        personality_traits: parseJSONIfNeeded(character.personality_traits, []),
        beliefs_values: parseJSONIfNeeded(character.beliefs_values, {}),
        relationships: parseJSONIfNeeded(character.relationships, {}),
        fears_vulnerabilities: parseJSONIfNeeded(character.fears_vulnerabilities, {}),
        unique_abilities_powers: parseJSONIfNeeded(character.unique_abilities_powers, []),
        hobbies_interests: parseJSONIfNeeded(character.hobbies_interests, []),
        quirks_habits: parseJSONIfNeeded(character.quirks_habits, []),
      });
    }
  }, [character]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCharacterDetails(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(characterDetails);
  };

  return (
    <div className="w-100">
      <Row className="mb-3">
        <Col>
          <Form.Group>
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="fullname"
              value={characterDetails.fullname}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Alignment</Form.Label>
            <Form.Control
              type="text"
              name="alignment"
              value={characterDetails.alignment}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group>
            <Form.Label>Family</Form.Label>
            <Form.Control
              type="text"
              name="family"
              value={characterDetails.family}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Race</Form.Label>
            <Form.Control
              type="text"
              name="race"
              value={characterDetails.race}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group>
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="text"
              name="age"
              value={characterDetails.age}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={characterDetails.image}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Card className="w-100">
            <Card.Img variant="top" src={characterDetails.image} />
            <Card.Body>
              <Card.Title>Mugshot</Card.Title>
              <Form.Group>
                <Form.Label>Scale</Form.Label>
                <Form.Control
                  type="number"
                  name="mugshotScale"
                  value={characterDetails.mugshot.scale}
                  onChange={(e) => setCharacterDetails(prevState => ({
                    ...prevState,
                    mugshot: { ...prevState.mugshot, scale: parseFloat(e.target.value) }
                  }))}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>X</Form.Label>
                <Form.Control
                  type="number"
                  name="mugshotX"
                  value={characterDetails.mugshot.x}
                  onChange={(e) => setCharacterDetails(prevState => ({
                    ...prevState,
                    mugshot: { ...prevState.mugshot, x: parseFloat(e.target.value) }
                  }))}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Y</Form.Label>
                <Form.Control
                  type="number"
                  name="mugshotY"
                  value={characterDetails.mugshot.y}
                  onChange={(e) => setCharacterDetails(prevState => ({
                    ...prevState,
                    mugshot: { ...prevState.mugshot, y: parseFloat(e.target.value) }
                  }))}
                />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Add additional fields as needed for traits, skills, memories, etc. */}
      <Row className="mb-3">
        <Col>
          <Button variant="secondary" onClick={() => setCharacterDetails(character)}>Reset</Button>
        </Col>
        <Col>
          <Button variant="primary" onClick={handleSave}>Save</Button>
        </Col>
      </Row>
    </div>
  );
};

export default CharacterCreatorEditor;
