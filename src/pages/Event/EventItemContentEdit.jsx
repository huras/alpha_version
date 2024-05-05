import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { ListGroup, Button, Badge, Modal } from 'react-bootstrap';
import { Trash, Pencil, Person, ChatFill, ImageAlt, PeopleFill } from 'react-bootstrap-icons';
import EventCharactersDrawer from './Editor/EventCharactersDrawer';
import DialogMugshotEditor from './Editor/DialogMugshotEditor';
import MugshotSelector from './Editor/Mugshot/MugshotSelector';
import ProjectContext from '../../context/ProjectContext';

const EventItemContentEdit = ({ event, scene }) => {
  const { project, setProject} = useContext(ProjectContext);
  const [showBackgroundModal, setShowBackgroundModal] = useState(false);
  const [showEventCharacterDrawer, setShowEventCharacterDrawer] = useState(false);

  return (
    <>
      {(showBackgroundModal && event) &&
        <ImageModal
          currentImages={event.event_backgrounds}
          images={project.backgrounds}
          onSelect={(selectedBgs) => {
            // Handle selected image
            setShowBackgroundModal(false);
            const updatedEvent = {
              ...event,
              event_backgrounds: selectedBgs
            };

            setProject((prevProject) => {
              const updatedProject = { 
                ...prevProject,
                scenes: prevProject.scenes.map((s) => {
                  if (s.id === scene.id) {
                    return { ...s, childEvents: s.childEvents.map((e) => {
                      if (e.id === event.id) {
                        return updatedEvent;
                      }
                      return e;
                    }) };
                  }
                  return s;
                })
              };
              return updatedProject;
            });
          }}
          onCancel={() => {
            // setShowBackgroundModal(false);
          }}
        />
      }

      {(showEventCharacterDrawer && event) && 
        <EventCharactersDrawer 
          scene={scene}
          event={event}
          onDecide={(selectedCharacters) => {
            setProject((prevProject) => {
              const updatedProject = {
                  ...prevProject,
                  scenes: prevProject.scenes.map((s) => {
                      if (s.id === scene.id) {
                          return { ...s, childEvents: s.childEvents.map((e) => {
                              if (e.id === event.id) {
                                  return { ...e, event_characters: selectedCharacters };
                              }
                              return e;
                          }) };
                      }
                      return s;
                  })
              };
              return updatedProject;
            });
            setShowEventCharacterDrawer(false);
          }}
          onCancel={() => {
            setShowEventCharacterDrawer(false);
          }}
          handleClose={() => setShowEventCharacterDrawer(false)} 
          currentCharacters={event.event_characters}
        />
      }

      <ListGroup.Item key={event.id} className="d-flex py-3">
        <div className="d-flex flex-column justify-content-start align-items-center mx-2">
          <Badge bg="dark" className="mb-1">#{event.order}</Badge>

          <Button variant="primary" size="sm" className="mt-3" onClick={() => {
            setShowBackgroundModal(!showBackgroundModal);
          }}>
            <ImageAlt size={16} />
          </Button>
          <Button variant="primary" size="sm" className="mt-1" onClick={() => {
            setShowEventCharacterDrawer(!showEventCharacterDrawer);
          }}>
            <PeopleFill size={16} />
          </Button>
          <Button variant="primary" size="sm" className="mt-1" onClick={() => { }}>
            <ChatFill size={16} />
          </Button>
        </div>

        <div
          style={{
            backgroundImage: `url('${event.event_backgrounds.length === 0 ? '' : event.event_backgrounds[0].image}')`,
            width: 'calc(960px * 0.35)',
            height: 'calc(536px * 0.35)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}>
          <div className="character-pivot">
            {event.event_characters.map(character => (
              <img key={character.id} src={character.image} alt="Character" style={{ maxWidth: '100px' }} />
            ))}
          </div>
        </div>
        
        {(event.dialogText || event.mugshot) && (
          <div className="d-flex flex-column justify-content-start align-items-start ms-2 px-2" style={{ flex: 1 }}>
            <div className="speaker vn-window">
                <MugshotSelector event={event}  scene={scene} />
            </div>
            {event.dialogText && (
              <pre className="text vn-window w-100">
                {event.dialogText}
              </pre>
            )}
          </div>
        )}

        <div className="d-flex flex-column justify-content-start align-items-center mx-1">
          <Button variant="danger" size="sm" onClick={() => onDelete(event.id)}>
            <Trash size={16} />
          </Button>
        </div>
      </ListGroup.Item>
    </>

  );
};

const ImageModal = ({ images, onSelect, onCancel, currentImages }) => {
  const [selectedImages, setSelectedImages] = useState(currentImages || []);

  const handleSelect = (image) => {
    if (selectedImages.includes(image)) {
      setSelectedImages(selectedImages.filter(img => img.id !== image.id));
    } else {
      // setSelectedImages([...selectedImages, image]);
      setSelectedImages([image]);
    }
  };

  return (
    <Modal
      show={true}
      onHide={onCancel}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Select an Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-wrap row">
          {images.map((image, index) => {
            const img_component = (<img
              src={image.image}
              alt={`Image ${index}`}
              className="img-thumbnail"
              style={{ cursor: 'pointer' }}
              onClick={() => handleSelect(image)}
            />);

            return !selectedImages.includes(image) ? (
              <Button key={`${image.id}_a`} className="col-6" variant='secondary'>
                {img_component}
              </Button>
            ) : (
              <Button
              key={`${image.id}_b`}
                className="col-6"
                variant="primary"
              >
                {img_component}
              </Button>
            );
          })}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => onSelect(selectedImages)}>
          Select
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Usage:
// <ImageModal
//   images={["image1.jpg", "image2.jpg", "image3.jpg"]}
//   onSelect={(selectedImage) => {
//     // Handle selected image
//   }}
//   onCancel={() => {
//     // Handle cancel
//   }}
// />


export default EventItemContentEdit;
