import React, { useContext } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { List, ListUl, Images, PeopleFill, CaretLeftSquare, CaretRightSquare, ChatFill } from 'react-bootstrap-icons';
import AppContext from '../context/AppContext'; // Update the path as per your project structure

const SceneEditorNavbar = ({ toggleEventListDrawer, toggleBackgroundDrawer }) => {

  const { scenes, setScenes, currentScene ,currentEvent ,setCurrentEvent,hasValidCurrentEvent } = useContext(AppContext);

  const scene = scenes[currentScene];
  const events = scene.events;

  const toggleDialog = () => {
    const event = events[currentEvent];

     if ((!event.dialog.text && event.dialog.text !== '') || event.dialog.show === false) {
      event.dialog.show = true;
      if(!event.dialog.text){
        event.dialog.text = 'Text here';
      }
      if(!event.dialog.speaker){
        event.dialog.speaker = false;
      }
    } else {
      event.dialog.show = false;
    }

    scenes[currentScene].events[currentEvent] = event;

    setScenes([...scenes]);
  }

  return (
    <Navbar expand="lg" variant="dark" bg="dark" className='my-navbar'>
      <Container fluid>
        <Button variant="outline-secondary" onClick={toggleEventListDrawer}>
          <ListUl color="white"  />
        </Button>
        <div className='d-flex'>
          {
            ( ((currentScene !== undefined && currentEvent !== undefined && (scenes && scenes[currentScene] && scenes[currentScene].events && scenes[currentScene].events[currentEvent]))) ) 
              &&
            <div className="mx-2">
              <Button variant="outline-secondary" className="mx-1" onClick={toggleBackgroundDrawer}>
                <Images color="white" />
              </Button>
              <Button variant="outline-secondary" className="mx-1">
                <PeopleFill color="white" />
              </Button>
              <Button variant="outline-secondary" className="mx-1" onClick={toggleDialog}>
                <ChatFill color="white" />
              </Button>
            </div>
          }
          
          <div className="mx-2">
            <Button variant="outline-secondary" className="mx-1" onClick={() => setCurrentEvent(currentEvent - 1)} disabled={currentEvent === 0}>
              <CaretLeftSquare color="white" />
            </Button>
            <span className="mx-1" style={{ color: 'white' }}>
              {((currentEvent === undefined) ? '-' : (currentEvent + 1)) }/{events.length}
            </span>
            <Button variant="outline-secondary" className="mx-1" onClick={() => setCurrentEvent(currentEvent + 1)} disabled={currentEvent === events.length - 1}>
              <CaretRightSquare color="white" />
            </Button>
          </div>
          
        </div>
        {/* <Navbar.Toggle aria-controls="event-list" />
        <Navbar.Collapse id="navbarContent">
        </Navbar.Collapse> */}
      </Container>
    </Navbar>
  );
};

export default SceneEditorNavbar;
