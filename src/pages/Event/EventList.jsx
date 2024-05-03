import React, { useContext, useState } from 'react';
import { Offcanvas, ListGroup, Button, Badge } from 'react-bootstrap';
import { Trash, Pencil, Plus } from 'react-bootstrap-icons';
import AppContext from '../../context/AppContext'; // Update the path as per your project structure
import EventListItem from './EventItemContent';
import BackgroundDrawer from './Editor/BackgroudDrawer';
import EventItemContentEdit from './EventItemContentEdit';
import ProjectContext from '../../context/ProjectContext';

const EventList = ({ scene, project, setScene }) => {

  const { scenes, setScenes, saveScene } = useContext(ProjectContext);
  const [showBackgroudDrawer, setShowBackgroudDrawer] = useState(false);

  // const handleDelete = (eventId) => {
  //   // const updatedEvents = events.filter(event => event.id !== eventId);
  //   // setScenes(scenes.map(scene => {
  //   //   if (scene.id === currentSceneID) {
  //   //     return { ...scene, events: updatedEvents };
  //   //   }
  //   //   return scene;
  //   // }));

  //   // // Check if the current event is the one being deleted
  //   // if (eventId === setCurrentEventID) {
  //   //   setCurrentEventID(null);
  //   // }
  // };

  // const handleEdit = (eventId) => {
  //   // setCurrentEventID(eventId);
  //   // handleClose();
  // };

  // const handleAddEvent = () => {
  //   // Logic to add a new event
  //   // var newEvent = {
  //   //   // Define the structure of your new event here
  //   //   // Example structure
  //   //   id: Math.max(...events.map(e => e.id)) + 1, // Assuming numeric IDs
  //   //   background: [],
  //   //   Characters: [],
  //   //   dialog: {},
  //   //   ChildEvents: [],
  //   //   ParentEvents: [],
  //   //   parentEvent: null
  //   // };

  //   // setScenes(scenes.map(scene => {
  //   //   if (scene.id === currentSceneID) {
  //   //     return { ...scene, events: [...scene.events, newEvent] };
  //   //   }
  //   //   return scene;
  //   // }));
  // };

  return (
    <>
      {/* <BackgroundDrawer 
        show={showBackgroudDrawer} 
        handleClose={() => setShowBackgroudDrawer(false)} 
        setScene={setScene}
      /> */}
      

      <ListGroup>
        {scene.childEvents.map((event, index) => (
          <EventItemContentEdit
            key={event.id}
            event={event}
            scene={scene}
            setEvent={
              (updatedEvent) => {
                setScene((prevScene) => {
                  const updatedEvents = prevScene.childEvents.map((e, i) => {
                    if (i === index) {
                      return updatedEvent;
                    }
                    return e;
                  });

                  return { ...prevScene, childEvents: updatedEvents };
                });
              }
            }
          />

        ))}
        <Button onClick={() => {}} className="my-2">
          <Plus size={16} /> Add New Event
        </Button>
      </ListGroup>
    </>
  );
};



export default EventList;
