import React, { useState } from 'react';
import { Carousel, Form, Button, Container, Row, Col } from 'react-bootstrap';
import CarouselSelect from './Genre';
import FantasyForm from './FantasyCharacterForm';
import { CheckCircleFill } from 'react-bootstrap-icons';

const StorySetupForm = () => {

    const [genre, setGenre] = useState(null);
    const [subgenre, setSubgenre] = useState(null);

    const renderSubgenreForm = (genre) => {
        switch (genre.value) {
            case 'adventure':
                return !subgenre ? (
                    <>
                        <h1 className='text-center' style={{marginTop: '2rem', marginBottom: '2rem'}}>Select Fantasy Sub Genre:</h1>
                        <Form.Group controlId="formGenre">
                            <Form.Label>Fantasy Genres:</Form.Label>
                            <CarouselSelect options={[
                                {
                                    'label': 'Epic Fantasy', 
                                    'img': '/img/form/genre/epic_adventure.webp', 
                                    value: 'epic_adventure',
                                    'description': "Heroic quests in a fantastical world with magical elements, mythical creatures, and epic battles. Example: The Lord of the Rings."
                                },
                                {
                                    'label': 'Isekai', 
                                    'img': '/img/form/genre/isekai.webp', 
                                    value: 'op_isekai',
                                    'description': 'Characters embark on a grand quest or mission in a new world, often involving treasure hunts, battling monsters, or discovering hidden secrets. Example: Konosuba: God’s Blessing on This Wonderful World!'
                                }, 
                                {
                                    'label': 'Sci-Fi', 
                                    'img': '/img/form/genre/sci_fi.webp', 
                                    value: 'sci_fi',
                                    'description': "Adventures involving futuristic technology, space exploration, and often extraterrestrial life. Example: Star Wars."
                                }, 
                                {
                                    'label': 'Post-Apocalyptic', 
                                    'img': '/img/form/genre/post_apocaliptic.webp', 
                                    value: 'post_apocaliptic',
                                    'description': "Survival in a world destroyed by a catastrophe, focusing on rebuilding or escaping. Example: Mad Max."
                                },
                                // {
                                //     'label': 'Space Opera', 
                                //     'img': '/img/form/genre/space_opera.webp', 
                                //     value: 'space_opera',
                                //     'description': "Grand tales of adventure set in outer space, often featuring large-scale conflicts and complex characters. Example: Dune."
                                // },
                                {
                                    'label': 'Cyberpunk', 
                                    'img': '/img/form/genre/cyberpunk.webp', 
                                    value: 'cyberpunk',
                                    'description': "Adventures in a dystopian future with advanced technology, cybernetic enhancements, and societal issues. Example: Blade Runner."
                                }, // 
                                {
                                    'label': 'Superhero Adventure', 
                                    'img': '/img/form/genre/superhero.webp', 
                                    value: 'superhero',
                                    'description': "Stories of individuals with extraordinary powers taking on grand challenges to save the world. Example: The Avengers."
                                }, // 
                            
                        ]} onSetOption={setSubgenre} />
                        </Form.Group>
                    </>
                ) : (
                    <>
                        <h3 className='text-center' style={{marginTop: '2rem', marginBottom: '2rem'}}> 
                            <CheckCircleFill color='green' size={32}  /> 
                            {`Selected subgenre: "${subgenre.label}"`} 
                        </h3>
                    </>
                )
            default:
                return <h1>Not implemented yet</h1>
        }
    }

    const renderCharacterCreationForm = (genre, subgenre) => {
        switch (genre.value) {
            case 'adventure':                
                return <FantasyForm subgenre={subgenre}/>
            default:
                return <h1>Not implemented yet</h1>
        }
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col sm={12} md={9} lg={9}>
                    {!genre ? (
                        <>
                            <h1 className='text-center' style={{marginTop: '2rem', marginBottom: '2rem'}}>Select Your Story Genre:</h1>
                            <Form.Group controlId="formGenre">
                                <Form.Label>Genres:</Form.Label>
                                <CarouselSelect options={[
                                    { 'label': 'Adventure', 'img': '/img/form/genre/adventure.webp', value: 'adventure' },
                                    { 'label': 'Action', 'img': '/img/form/genre/action.webp', value: 'action' },
                                    { 'label': 'Horror', 'img': '/img/form/genre/horror.webp', value: 'horror' },
                                ]} onSetOption={setGenre} />
                            </Form.Group>
                        </>
                    ) : (
                        <>
                            <h3 className='text-center' style={{marginTop: '2rem', marginBottom: '2rem'}}> <CheckCircleFill color='green' size={32}  /> {`Selected genre: "${genre.label}"`} </h3>
                        </>
                    )}

                    {genre && (renderSubgenreForm(genre))}

                    {(genre && subgenre && (renderCharacterCreationForm(genre, subgenre)))}

                    <Button variant="primary" type="submit" disabled={true}>
                        Finish
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default StorySetupForm;
