import React, { useState } from 'react';
import SceneEditorNavbar from './SceneEditorNavbar';
import EventListDrawer from './EventListDrawer';
import SingleEventEditor from './SingleEventEditor';
import BackgroundDrawer from './BackgroudDrawer';
import EventCharactersDrawer from './EventCharactersDrawer';

export const SceneEditor = () => {
  const [showEventListDrawer, setShowEventListDrawer] = useState(false);
  const [showBackgroundDrawer, setShowBackgroundDrawer] = useState(false);
  const [showEventCharactersDrawer, setShowEventCharactersDrawer] = useState(false);

  const handleEventListDrawer = (status) => {
    setShowEventListDrawer(status);
  };

  const handleBackgroundDrawer = (status) => {
    setShowBackgroundDrawer(status);
  }

  const handleEventCharactersDrawer = (status) => {
    setShowEventCharactersDrawer(status);
};


  return (
    <div>
      <SceneEditorNavbar 
        toggleEventListDrawer={() => handleEventListDrawer(true)} 
        toggleBackgroundDrawer={() => handleBackgroundDrawer(true)} 
        toggleEventCharactersDrawer={() => handleEventCharactersDrawer(true)} 
      />
      <EventListDrawer show={showEventListDrawer} handleClose={() => handleEventListDrawer(false)} />
      <BackgroundDrawer show={showBackgroundDrawer} handleClose={() => handleBackgroundDrawer(false)} />
      <EventCharactersDrawer show={showEventCharactersDrawer} handleClose={() => handleEventCharactersDrawer(false)} />
      <SingleEventEditor></SingleEventEditor>
    </div>
  );
};
