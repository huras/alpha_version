import React, { useContext } from 'react';
import { Offcanvas, ListGroup, Button, Badge } from 'react-bootstrap';
import { Trash, Pencil, Plus } from 'react-bootstrap-icons';
import AppContext from '../context/AppContext'; // Update the path as per your project structure
import EventListItem from './Event/EventItemContent';

const EventListDrawer = ({ show, handleClose }) => {
  const { scenes, setScenes, currentSceneID, setCurrentEventID, events } = useContext(AppContext);

  const handleDelete = (eventId) => {
    const updatedEvents = events.filter(event => event.id !== eventId);
    setScenes(scenes.map(scene => {
      if (scene.id === currentSceneID) {
        return { ...scene, events: updatedEvents };
      }
      return scene;
    }));

    // Check if the current event is the one being deleted
    if (eventId === setCurrentEventID) {
      setCurrentEventID(null);
    }
  };

  const handleEdit = (eventId) => {
    setCurrentEventID(eventId);
    handleClose();
  };

  const handleAddEvent = () => {
    // Logic to add a new event
    var newEvent = {
      // Define the structure of your new event here
      // Example structure
      id: Math.max(...events.map(e => e.id)) + 1, // Assuming numeric IDs
      background: [],
      Characters: [],
      dialog: {},
      ChildEvents: [],
      ParentEvents: [],
      parentEvent: null
    };

    setScenes(scenes.map(scene => {
      if (scene.id === currentSceneID) {
        return { ...scene, events: [...scene.events, newEvent] };
      }
      return scene;
    }));
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="start" className="custom-offcanvas">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Event List</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ListGroup>
          {events.map((event, index) => (
              <EventListItem
                key={event.id}
                event={event}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
          
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