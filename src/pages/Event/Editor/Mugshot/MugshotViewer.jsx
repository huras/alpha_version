import React from 'react'

function MugshotViewer({character}) {

  const createMugshotData = (mugshotData) => {
    if (mugshotData && typeof mugshotData === 'string') mugshotData = JSON.parse(mugshotData);
    return mugshotData;
}

    const customScale = 1.6;
    const createMugshotStyle = (character) => {
        
        var mugshotData = createMugshotData(character?.mugshot);
        if(typeof mugshotData === 'string') mugshotData = JSON.parse(mugshotData);

        // Calculate the size based on the scale
        const maxWidth = 100; // Replace with the actual width of the parent container
        const zoom = (maxWidth / 100) / customScale;
        
        
        const size = (1 / mugshotData?.scale) * (maxWidth * zoom) * customScale;

        return {
            backgroundImage: `url('${character?.image}')`,
            backgroundPosition: `${mugshotData?.x * 100}% ${mugshotData?.y * 100}%`,
            transform: `scale(${mugshotData?.scale * customScale})`,
            transformOrigin: '0% 100%',
            width: `${size}px`,
            height: `${size}px`
        };
    }

    var mugshotStyle = createMugshotStyle(character);

  return (
    <div className="mugshot-placeholder" style={{ display: (mugshotStyle) ? 'block' : 'none', width: `calc(100px * ${customScale})`, height: `calc(100px * ${customScale})` }} onClick={() => {setShowCharacterModal(true)}}>
        <div className="mugshot" style={mugshotStyle}></div>
    </div>
  )
}

export default MugshotViewer