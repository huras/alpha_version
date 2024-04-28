import React from 'react';
import { ListGroup, Button, Badge } from 'react-bootstrap';
import { Trash, Pencil, Person, ChatFill, ImageAlt, PeopleFill } from 'react-bootstrap-icons';

const EventListItem = ({ event, onEdit, onDelete }) => {
  return (
    <ListGroup.Item key={event.id} className="d-flex py-3">
      <div className="d-flex flex-column justify-content-start align-items-center mx-2">
        <Badge bg="dark" className="mb-1">#{event.id}</Badge>

        <Button variant="primary" size="sm" className="mt-3" onClick={() => {}}>
          <ImageAlt size={16} />
        </Button>
        <Button variant="primary" size="sm" className="mt-1" onClick={() => {}}>
          <PeopleFill size={16} />
        </Button>
        <Button variant="primary" size="sm" className="mt-1" onClick={() => {}}>
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

      {event.dialogText && (
        <div className="d-flex flex-column justify-content-start align-items-start ms-2 px-2" style={{flex: 1}}>
          <pre className="text vn-window w-100">
            {event.dialogText}
          </pre>
        </div>
      )}

    <div className="d-flex flex-column justify-content-start align-items-center mx-1">
        <Button variant="danger" size="sm" onClick={() => onDelete(event.id)}>
          <Trash size={16} />
        </Button>
    </div>
    </ListGroup.Item>
  );
};

export default EventListItem;
