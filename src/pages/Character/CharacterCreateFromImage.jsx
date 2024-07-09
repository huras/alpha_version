import React, { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import DBAPI from '../../services/db';

const CharacterCreateFromImage = ({ onCharacterGenerated }) => {
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async () => {
        if (!image) return;

        setIsLoading(true);
        try {
            const response = await DBAPI.post('/character/generate_by_image', { image });
            setIsLoading(false);
            if (response.data) {
                onCharacterGenerated(response.data);
            }
        } catch (error) {
            console.error('Error generating character:', error);
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Form.Group>
                <Form.Label>Upload Image</Form.Label>
                <Form.Control type="file" onChange={handleImageChange} />
            </Form.Group>
            <Button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Generate Character'}
            </Button>
            {image && <img src={image} alt="Preview" style={{ marginTop: '10px', maxWidth: '100%' }} />}
        </div>
    );
};

export default CharacterCreateFromImage;
