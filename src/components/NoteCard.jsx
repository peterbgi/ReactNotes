import {useRef, useEffect} from 'react'
import Trash from '../icons/Trash'

const NoteCard = ({note}) => {
    const position = JSON.parse(note.position);
    const colors = JSON.parse(note.colors);
    const body = JSON.parse(note.body);

    const textAreaRef = useRef(null);

const autoGrow = (textAreaRef) => {
  const {current} = textAreaRef;

    current.style.height = "auto"; // Reset the height
    current.style.height = current.scrollHeight + "px"; // Set the new height
};

useEffect(() => {
  autoGrow(textAreaRef);
}, [])

  return (
    <div  className='card'
    style={{
      backgroundColor: colors.colorBody,
      left: `${position.x}px`,
      top: `${position.y}px`,
  }}>
    <div
      className="card-header" 
      style={{ backgroundColor: colors.colorHeader }}>
            <Trash />
        </div> 
    <div className="card-body">
      <textarea
      ref={textAreaRef} 
       style={{ color: colors.colorText }}
       defaultValue={body}
       onInput={() => {
        autoGrow(textAreaRef)
       }}
      >

       </textarea>
    </div>
  </div>
  )
}

export default NoteCard
