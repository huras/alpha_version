import React, { useContext, useState, useEffect } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { ListUl, Images, PeopleFill, CaretLeftSquare, CaretRightSquare, ChatFill, MusicNoteBeamed } from 'react-bootstrap-icons';
import AppContext from '../context/AppContext'; // Update the path as per your project structure
import { Link } from 'react-router-dom';

const SceneEditorNavbar = ({ toggleEventListDrawer, toggleBackgroundDrawer, toggleEventCharactersDrawer }) => {
  const { scenes, currentSceneID, currentEventID, setCurrentEventID } = useContext(AppContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [branchSelection, setBranchSelection] = useState({});

  // Function to get the next event ID
  const getNextEventId = (eventId) => {
    const event = scenes.find(e => e.id === eventId);
    if (!event) return null;

    if (event.childChoices?.length > 0) {
      const branchIndex = branchSelection[eventId] || 0;
      return event.childChoices[branchIndex]?.RelatedEventId;
    } else {
      //finds current event id and gets next in the list if present
      const index = scenes.findIndex(e => e.id === eventId);
      return scenes[index + 1]?.id;
    }
  };

  // Update the total pages and current page when the current event ID changes
  useEffect(() => {
    let count = 0;
    let currentId = currentEventID;
    while (currentId != null) {
      count++;
      currentId = getNextEventId(currentId);
    }
    setTotalPages(count);
    setCurrentPage(scenes.findIndex(event => event.id === currentEventID) + 1);
  }, [currentEventID, scenes]);

  const navigateEvent = (direction) => {
    let newIndex = events.findIndex(event => event.id === currentEventID) + direction;
    newIndex = Math.max(0, Math.min(newIndex, events.length - 1));
    setCurrentEventID( Number.parseInt(events[newIndex]?.id) );
  };

  const toggleDialog = () => {
    // if (currentEvent) {
    //   // Clone the current event to avoid direct state mutation
    //   const updatedEvent = { ...currentEvent };

    //   // Logic to toggle dialog visibility and content
    //   if (!updatedEvent.dialog || !updatedEvent.dialog.text || updatedEvent.dialog.show === false) {
    //     updatedEvent.dialog = {
    //       ...updatedEvent.dialog,
    //       show: true,
    //       text: updatedEvent.dialog && updatedEvent.dialog.text ? updatedEvent.dialog.text : 'Text here',
    //       speaker: updatedEvent.dialog && updatedEvent.dialog.speaker ? updatedEvent.dialog.speaker : false
    //     };
    //   } else {
    //     updatedEvent.dialog.show = false;
    //   }

    //   // Update the event in the scenes array
    //   const updatedEvents = events.map(evt => evt.id === currentEventID ? updatedEvent : evt);
    //   const updatedScene = { ...scene, events: updatedEvents };
    //   const updatedScenes = scenes.map(scn => scn.id === currentSceneID ? updatedScene : scn);

    //   setScenes(updatedScenes);
    // }
  };

  return (
    <Navbar expand="lg" variant="dark" bg="dark" className='my-navbar'>
      <Container fluid>
        <Button variant="outline-secondary" onClick={toggleEventListDrawer}>
          <ListUl color="white" />
        </Button>
        <div className='d-flex'>
          {/* Link sending back to /scenes/:sceneId */}
          <Link to={`/scenes/${currentSceneID}`} className='btn btn-outline-secondary mx-2'>
            Back to Scene
          </Link>
          {currentEventID != null && (
            <div className="mx-2">
              <Button variant="outline-secondary" className="mx-1" onClick={toggleBackgroundDrawer}>
                <Images color="white" />
              </Button>
              <Button variant="outline-secondary" className="mx-1" onClick={toggleEventCharactersDrawer}>
                <PeopleFill color="white" />
              </Button>
              <Button variant="outline-secondary" className="mx-1" onClick={toggleDialog}>
                <ChatFill color="white" />
              </Button>
              <Button variant="outline-secondary" className="mx-1">
                <MusicNoteBeamed color="white" />
              </Button>
            </div>
          )}

          <div className="mx-2">
            <Button variant="outline-secondary" className="mx-1" onClick={() => navigateEvent(-1)} disabled={currentPage <= 1}>
              <CaretLeftSquare color="white" />
            </Button>
            <span className="mx-1" style={{ color: 'white' }}>
              {currentPage} / {totalPages}
            </span>
            <Button variant="outline-secondary" className="mx-1" onClick={() => navigateEvent(1)} disabled={currentPage >= totalPages}>
              <CaretRightSquare color="white" />
            </Button>
          </div>
        </div>
      </Container>
    </Navbar>
  );
};

export default SceneEditorNavbar;
