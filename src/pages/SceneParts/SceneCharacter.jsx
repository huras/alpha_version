import React, { useContext, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ChatDotsFill } from 'react-bootstrap-icons';
import CharacterDialogerGPT from '../../gpt/CharacterDialogerGPT';
import AppContext from '../../context/AppContext'; // Update the path as per your project structure

var dialoger = undefined;

const SceneCharacter = ({ character }) => {
    const { scenes, setScenes, currentScene, currentEvent, characters } = useContext(AppContext);
    const [showModal, setShowModal] = useState(false);
    const [textInput, setTextInput] = useState('');

    if ( !dialoger && character ) {
        dialoger = new CharacterDialogerGPT({
            character,
            dialog: [
                {
                    "role": "assistant",
                    "content": `\{
                        speaker: ${character.fullname},
                        text: ["Você parece perdido."]
                    \}`,
                    
                },
            ],
            setting: `${character.fullname} found the protagonist in the middle of the deep woods. She is acompanie by two of ther female guards.`
        });
    }

    const handleCharacterClick = () => {
        setShowModal(true);
    };

    const handleTextChange = (e) => {
        setTextInput(e.target.value);
    };

    const handleSend = () => {
        dialoger.talk(textInput);
        setShowModal(false);
        setTextInput('');
    };

    return (
        <>
            <div className="character-div">
                <img key={character.id} src={character.image} alt="Character" />
                <ChatDotsFill className='chat-btn' size={32} color='white' onClick={handleCharacterClick} />
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Talk to {character.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Enter your message</Form.Label>
                            <Form.Control as="textarea" rows={3} value={textInput} onChange={handleTextChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSend}>
                        Send
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default SceneCharacter;
