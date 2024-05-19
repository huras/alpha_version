import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap';

export const effects = {
    shaky:{
        name: 'shaky',
        delayBetweenCharacters: 0.5
    },
    impact: {
        name: 'impact',
        delayBetweenCharacters: 0.1
    }
}

function TextEffectDropdown({word, editMode}) {
    const [effectSelected, setEffectSelected] = useState(word.effect);

    const wordContent = <span className='dialog-text-word'>{word.word.split('').map((char, index) => {
        const className = `${effectSelected ? `text-animation-${effectSelected}` : ''}`;
        const styles = {
            ...(effectSelected ? { animationDelay: `${index * effects[effectSelected]?.delayBetweenCharacters}s` } : {}),
            ...(index === word.word.length - 1 ? { marginRight: 0 } : {})
        };
        return (
            <span
                className={className}
                key={`${word.word}_${char}_${index}_edit`}
                style={styles}
            >
                {char}
            </span>
        );
    })}</span>;
    

    return (
        <>
            {editMode ?
                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        {wordContent && wordContent}
                    </Dropdown.Toggle>
                
                    <Dropdown.Menu>
                        <Dropdown.Item href="#" onClick={() => setEffectSelected(null)}>None</Dropdown.Item>
                        <Dropdown.Item href="#" onClick={() => setEffectSelected('shaky')}>Fear</Dropdown.Item>
                        <Dropdown.Item href="#" onClick={() => setEffectSelected('impact')}>Impacting</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                : 
                wordContent
            }
        </>
      );
}

export default TextEffectDropdown