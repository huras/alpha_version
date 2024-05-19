import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { Stars } from 'react-bootstrap-icons';
import TextEffectDropdown, { effects } from './TextEffectDropdown';

function DialogEditor({event, scene, setDialog}) {

    const saveDialog = () => {
        // Save dialog
        setDialog(
            tempText.split(' ').map(word => {
                return {
                    word,
                    effect: dialogText?.find(w => w.word === word)?.effect || null
                }
            })
        )
    }

    const setEffect = (index, effect) => {
        const newDialog = [...dialogText];
        newDialog[index].effect = effect;
        setDialog(newDialog);
    }

    const [ editMode, setEditMode ] = useState(false);
    const [ editTextEffectsMode, setEditTextEffectsMode ] = useState(false);
    const [tempText, setTempText] = useState('');

    var dialogText = event.dialogText;
    if (typeof dialogText === 'string') dialogText = JSON.parse(dialogText);
    if (!tempText && dialogText) setTempText(dialogText.map(word => word.word).join(' '));

    return <> {
        dialogText && (
            !editMode ? (
                <pre className="text vn-window w-100" onClick={() => setEditMode(true)} >
                    {
                        dialogText.map((word, index) => 
                            <TextEffectDropdown 
                                key={`${word.word}_${index}_view`} 
                                word={word} 
                                editMode={editMode}  
                                setEffect={(effect) => setEffect(index, effect)}
                            /> 
                        )
                    }
                </pre>
            ) : (
                <div className="w-100">
                    <div className="d-flex justify-content-between my-1">
                        <Button variant="warning" size="sm" className="mt-1" onClick={() => { 
                            setEditTextEffectsMode(!editTextEffectsMode);
                        }}>
                            <Stars size={16} />
                        </Button>
                        <button className="btn btn-primary" onClick={() => {
                            setEditMode(false)
                            saveDialog()
                        }}>x</button>
                    </div>
                    <div className='w-100 d-flex justify-content-start align-items-start'>
                        {
                            editTextEffectsMode ?
                            dialogText.map((word, index) => 
                                <TextEffectDropdown key={`${word.word}_${index}`} word={word} editMode={editTextEffectsMode} setEffect={(effect) => setEffect(index, effect)}/> 
                            )
                            :
                            <textarea
                                className="vn-window w-100"
                                value={tempText}
                                onChange={(e) => {
                                    setTempText(e.target.value);
                                }}
                            />
                        }
                    </div>
                </div>
            )
        )}
    </>
}

export default DialogEditor