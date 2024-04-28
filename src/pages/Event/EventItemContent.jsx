import React from 'react';
import { ListGroup, Button, Badge } from 'react-bootstrap';
import { Trash, Pencil } from 'react-bootstrap-icons';

const EventListItem = ({ event, onEdit, onDelete }) => {
  return (
    <ListGroup.Item key={event.id} className="d-flex">
      <div className="d-flex flex-column justify-content-start align-items-center mx-2">
        <Badge bg="secondary" className="mb-1">#{event.id}</Badge>
        <Button variant="danger" size="sm" className="mt-1" onClick={() => onDelete(event.id)}>
          <Trash size={16} />
        </Button>
        <Button variant="primary" size="sm" className="mt-1" onClick={() => onEdit(event.id)}>
          <Pencil size={16} />
        </Button>
      </div>

      <div
        style={{
          backgroundImage: `url('${event.Backgrounds.length === 0 ? '' : event.Backgrounds[0].image}')`,
          width: 'calc(960px * 0.28)',
          height: 'calc(536px * 0.28)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}>
        <div className="character-pivot">
          {event.Characters.map(character => (
            <img key={character.id} src={character.image} alt="Character" style={{ maxWidth: '100px' }} />
          ))}
        </div>
      </div>

      {event.dialogText && (
        <div className="d-flex flex-column justify-content-start align-items-start ms-2">
          <pre className="text vn-window">
            {event.dialogText}
          </pre>
        </div>
      )}
    </ListGroup.Item>
  );
};

export default EventListItem;
