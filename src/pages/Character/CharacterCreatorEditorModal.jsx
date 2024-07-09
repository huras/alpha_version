import React, { useState } from 'react';
import { Modal, Tab, Tabs } from 'react-bootstrap';
import CharacterCreateFromImage from './CharacterCreateFromImage';
import CharacterCreatorEditor from './CharacterCreatorEditor';

const CharacterCreatorEditorModal = ({ show, handleClose }) => {
    const [key, setKey] = useState('createFromImage');
    const [generatedCharacter, setGeneratedCharacter] = useState(null);

    const handleCharacterGenerated = (character) => {
        setGeneratedCharacter(character);
        setKey('editCharacter');
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Character Creator</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs
                    id="character-creator-tabs"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                >
                    <Tab eventKey="createFromImage" title="Create from Image">
                        <CharacterCreateFromImage onCharacterGenerated={handleCharacterGenerated} />
                    </Tab>
                    <Tab eventKey="editCharacter" title="Edit Character" disabled={!generatedCharacter}>
                        {generatedCharacter && <CharacterCreatorEditor character={generatedCharacter} />}
                    </Tab>
                </Tabs>
            </Modal.Body>
        </Modal>
    );
};

export default CharacterCreatorEditorModal;
