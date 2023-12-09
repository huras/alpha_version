import React, { useContext } from 'react';
import { Offcanvas, ListGroup, Button, Badge } from 'react-bootstrap';
import { Trash, Pencil, Plus } from 'react-bootstrap-icons';
import AppContext from '../context/AppContext'; // Update the path as per your project structure

const EventListDrawer = ({ show, handleClose }) => {
  const { scenes, setScenes, currentScene, setCurrentEvent, currentEvent } = useContext(AppContext);

  const handleDelete = (index) => {
    const updatedEvents = scenes[currentScene].events.filter((_, i) => i !== index);
    const updatedScenes = scenes.map((scene, i) => {
      if (i === currentScene) {
        return { ...scene, events: updatedEvents };
      }
      return scene;
    });    

    //Check if the current event is the one being deleted
    if (index === currentEvent) {
      if (updatedScenes[currentScene].events.length > 0) {
        if (index <= updatedScenes[currentScene].events.length){
          setCurrentEvent(index);
        } else {
          setCurrentEvent(0);
        }
      } else {
        setCurrentEvent(undefined);
      }
    }

    setScenes(updatedScenes);
  };

  const handleEdit = (index) => {
    // Logic to handle edit
    setCurrentEvent(index);
    handleClose();
  };

  const handleAddEvent = () => {
    var newEvent = {
      // Define the structure of your new event here
      background: [], // Example structure
      characters_on_scene: [],
      dialog: {  },
    };

    //check if there are any events and clone the last one
    if (scenes[currentScene].events.length > 0) {
      newEvent = JSON.parse(JSON.stringify(scenes[currentScene].events[scenes[currentScene].events.length - 1]));
    }

    const updatedScenes = scenes.map((scene, i) => {
      if (i === currentScene) {
        return { ...scene, events: [...scene.events, newEvent] };
      }
      return scene;
    });

    setScenes(updatedScenes);
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="start">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Event List</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ListGroup>
          {scenes[currentScene].events.map((event, index) => (
            <ListGroup.Item key={index} className="d-flex">
              <div
                style={{
                  backgroundImage: `url('${(event.background.length == 0) ? '' : event.background[0].image}')`,
                  width: 'calc(960px * 0.28)',
                  height: 'calc(536px * 0.28)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}>
                <div className="character-pivot">
                  {event.characters_on_scene.map(character => (
                    <img key={character.id} src={character.image} alt="Character" />
                  ))}
                </div>
              </div>
              <div className="d-flex flex-column justify-content-start align-items-center ms-2">
                <Badge bg="secondary" className="mb-1">#{index + 1}</Badge>
                <Button variant="danger" size="sm" className="mt-1" onClick={() => handleDelete(index)}>
                  <Trash size={16} />
                </Button>
                <Button variant="primary" size="sm" className="mt-1" onClick={() => handleEdit(index)}>
                  <Pencil size={16} />
                </Button>
              </div>
            </ListGroup.Item>
          ))}
          <Button onClick={handleAddEvent} className="mt-2">
            <Plus size={16} /> Add New Event
          </Button>
        </ListGroup>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default EventListDrawer;
