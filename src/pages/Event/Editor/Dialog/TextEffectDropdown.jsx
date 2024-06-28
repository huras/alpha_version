import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap';

export const effects = {
    shaky:{
        name: 'shaky', // .text-animation-shaky
        delayBetweenCharacters: 0.06
    },
    impact: {
        name: 'impact', // text-animation-impact
        delayBetweenCharacters: 0.1
    }
}

function TextEffectDropdown({word, editMode, setEffect}) {
    const [effectSelected, setEffectSelected] = useState(word.effect);

    const wordContent = <span className='dialog-text-word'>{word.word.split('').map((char, index) => {
        const className = `${effectSelected ? `text-animation-${effectSelected}` : ''}`;
        const styles = {
            ...(effectSelected ? { animationDelay: `${index * effects[effectSelected]?.delayBetweenCharacters}s` } : {}),
            ...(index === word.word.length - 1 ? { marginRight: 0 } : {})
        };
        return (
            <span
                className={className + ' ' + 'dialog-text-char'}
                key={`${word.word}_${char}_${index}_edit`}
                style={styles}
            >
                {char}
            </span>
        );
    })}</span>;

    const handleEffectChange = (effect) => {
        setEffectSelected(effect);
        setEffect(effect);
    }
    

    return (
        <>
            {editMode ?
                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        {wordContent && wordContent}
                    </Dropdown.Toggle>
                
                    <Dropdown.Menu>
                        <Dropdown.Item href="#" onClick={() => handleEffectChange(null)}>None</Dropdown.Item>
                        <Dropdown.Item href="#" onClick={() => handleEffectChange('shaky')}>Fear</Dropdown.Item>
                        <Dropdown.Item href="#" onClick={() => handleEffectChange('impact')}>Impacting</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                : 
                wordContent
            }
        </>
      );
}

export default TextEffectDropdown