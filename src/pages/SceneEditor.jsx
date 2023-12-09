import React, { useState } from 'react';
import SceneEditorNavbar from './SceneEditorNavbar';
import EventListDrawer from './EventListDrawer';
import SingleEventEditor from './SingleEventEditor';
import BackgroundDrawer from './BackgroudDrawer';

export const SceneEditor = () => {
  const [showEventListDrawer, setShowEventListDrawer] = useState(false);
  const [showBackgroundDrawer, setShowBackgroundDrawer] = useState(false);

  const handleEventListDrawer = (status) => {
    setShowEventListDrawer(status);
  };

  const handleBackgroundDrawer = (status) => {
    setShowBackgroundDrawer(status);
  }

  return (
    <div>
      <SceneEditorNavbar toggleEventListDrawer={() => handleEventListDrawer(true)} toggleBackgroundDrawer={() => handleBackgroundDrawer(true)} />
      <EventListDrawer show={showEventListDrawer} handleClose={() => handleEventListDrawer(false)} />
      <BackgroundDrawer show={showBackgroundDrawer} handleClose={() => handleBackgroundDrawer(false)} />
      <SingleEventEditor></SingleEventEditor>
    </div>
  );
};
