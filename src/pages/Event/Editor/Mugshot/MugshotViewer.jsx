import React from 'react'

function MugshotViewer({character}) {

    const createMugshotStyle = (character) => {
        
        var mugshotData = createMugshotData(character?.mugshot);
        if(typeof mugshotData === 'string') mugshotData = JSON.parse(mugshotData);

        // Calculate the size based on the scale
        const maxWidth = 100; // Replace with the actual width of the parent container
        const zoom = maxWidth / 100;
        
        const size = (1 / mugshotData?.scale) * (maxWidth * zoom);

        return {
            backgroundImage: `url('${character?.image}')`,
            backgroundPosition: `${mugshotData?.x * 100}% ${mugshotData?.y * 100}%`,
            transform: `scale(${mugshotData?.scale})`,
            transformOrigin: '0% 100%',
            width: `${size}px`,
            height: `${size}px`
        };
    }

    var mugshotStyle = createMugshotStyle(character);

  return (
    <div className="mugshot-placeholder" style={{ display: (hasMugshot) ? 'block' : 'none' }} onClick={() => {setShowCharacterModal(true)}}>
        <div className="mugshot" style={mugshotStyle}></div>
    </div>
  )
}

export default MugshotViewer