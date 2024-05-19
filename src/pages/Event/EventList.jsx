import React, { useContext, useState } from 'react';
import { Offcanvas, ListGroup, Button, Badge } from 'react-bootstrap';
import { Trash, Pencil, Plus } from 'react-bootstrap-icons';
import AppContext from '../../context/AppContext'; // Update the path as per your project structure
import EventListItem from './EventItemContent';
import BackgroundDrawer from './Editor/BackgroudDrawer';
import EventItemContentEdit from './EventItemContentEdit';
import ProjectContext from '../../context/ProjectContext';
import axios from 'axios';

const EventList = ({ scene }) => {
  const [showBackgroudDrawer, setShowBackgroudDrawer] = useState(false);
  const { project, setProject } = useContext(ProjectContext);

  const handleDelete = (eventId) => {
    if(confirm('Are you sure you want to delete this event?') === false) return;
    
    axios.delete(`http://localhost:8080/event/${eventId}`).then(response => {
      console.log(response.data);
      setProject((prevProject) => {
        const updatedProject = {
          ...prevProject,
          scenes: prevProject.scenes.map((s) => {
            if (s.id === scene.id) {
              return { ...s, childEvents: s.childEvents.filter((e) => e.id !== eventId) };
            }
            return s;
          })
        };
        return updatedProject;
      });
    }).catch(error => {
      console.error(error);
    });
    
    // const updatedEvents = events.filter(event => event.id !== eventId);
    // setScenes(scenes.map(scene => {
    //   if (scene.id === currentSceneID) {
    //     return { ...scene, events: updatedEvents };
    //   }
    //   return scene;
    // }));

    // // Check if the current event is the one being deleted
    // if (eventId === setCurrentEventID) {
    //   setCurrentEventID(null);
    // }
  };

  // const handleEdit = (eventId) => {
  //   // setCurrentEventID(eventId);
  //   // handleClose();
  // };

  const handleAddEvent = () => {
    // Logic to add a new event
    axios.post(`http://localhost:8080/event/fresh`, {
      parentScene: scene.id,
      order: scene?.childEvents?.length + 1
    }).then(response => {
      console.log(response.data);
      setProject((prevProject) => {
        const updatedProject = {
          ...prevProject,
          scenes: prevProject.scenes.map((s) => {
            if (s.id === scene.id) {
              return { ...s, childEvents: [...s.childEvents, response.data] };
            }
            return s;
          })
        };
        return updatedProject;
      });
    }).catch(error => {
      console.error(error);
    });

    // var newEvent = {
    //   // Define the structure of your new event here
    //   // Example structure
    //   id: null,
    //   background: [],
    //   Characters: [],
    //   dialog: {},
    //   ChildEvents: [],
    //   ParentEvents: [],
    //   parentEvent: null
    // };

    // setScenes(scenes.map(scene => {
    //   if (scene.id === currentSceneID) {
    //     return { ...scene, events: [...scene.events, newEvent] };
    //   }
    //   return scene;
    // }));
  };

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
            handleDelete={handleDelete}
          />

        ))}
        <Button onClick={handleAddEvent} className="my-2">
          <Plus size={16} /> Add New Event
        </Button>
      </ListGroup>
    </>
  );
};



export default EventList;
