import React from 'react'
import TextEffectDropdown from './TextEffectDropdown'
import { CaretDownFill } from 'react-bootstrap-icons'

function DialogViewer({dialog, hasNextDialogArrow = false, onclick = () => {}}) {

    function isJSON(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    var dialogText = dialog;
    if (typeof dialogText === 'string') { 
        if(isJSON(dialog)){
            dialogText = JSON.parse(dialog);
        } else {
            dialogText = dialog.split(' ').map(word => {
                return {
                    word,
                    effect: null
                }
            });
        }
    }

  return (
    <pre className="text vn-window w-100 dialogsss" onClick={onclick} >
        {   dialog &&
            ( dialogText ? dialogText : []).map((word, index) => 
                <span key={`${word.word}_${index}_view`} >
                    <TextEffectDropdown 
                        word={word} 
                        editMode={false}
                        setEffect={() => {}}
                    />
                    {(['.', ':', '?']).includes(word.word[word.word.length - 1])  ? <br  /> : ''}
                </span>
            )
        }
        {
            hasNextDialogArrow && <CaretDownFill className="hasNextDialogArrow" size={32} color={'#fff'} />
        }
    </pre>
  )
}

export default DialogViewer