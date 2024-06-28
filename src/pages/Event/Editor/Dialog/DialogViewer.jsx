import React from 'react'
import TextEffectDropdown from './TextEffectDropdown'
import { CaretDownFill } from 'react-bootstrap-icons'

function DialogViewer({dialog, hasNextDialogArrow = false, onclick = () => {}}) {
  return (
    <pre className="text vn-window w-100" onClick={onclick} >
        {   dialog &&
            ( (typeof dialog === 'string') ? JSON.parse(dialog) : []).map((word, index) => 
                <TextEffectDropdown 
                    key={`${word.word}_${index}_view`} 
                    word={word} 
                    editMode={false}
                    setEffect={() => {}}
                /> 
            )
        }
        {
            hasNextDialogArrow && <CaretDownFill className="hasNextDialogArrow" size={18} color={'#fff'} />
        }
    </pre>
  )
}

export default DialogViewer