import {useRef, useEffect, useState} from 'react'
import { setNewOffset, autoGrow, setZIndex, bodyParser } from '../util';
import Trash from '../icons/Trash'
import { db } from '../appwrite/databases';

const NoteCard = ({note}) => {
   const [position, setPositon] = useState(JSON.parse(note.position));
    const colors = JSON.parse(note.colors);
    const body = bodyParser(note.body);


    let mouseStartPos = { x: 0, y: 0 };
 
    const cardRef = useRef(null);

    const textAreaRef = useRef(null);



const mouseUp = () => {
  document.removeEventListener("mousemove", mouseMove);
  document.removeEventListener("mouseup", mouseUp);

  const newPosition = setNewOffset(cardRef.current);
  saveData('position', newPosition);

};

const saveData = async (key, value) => {
  const playload = { [key]: JSON.stringify(value) };

  try {
    await db.notes.update(note.$id, playload)
  } catch (error) {
    console.error(error);
  }
};

 


const mouseDown = (e) => {
  mouseStartPos.x = e.clientX;
  mouseStartPos.y = e.clientY;

  document.addEventListener("mousemove", mouseMove);
  document.addEventListener("mouseup", mouseUp);

  setZIndex(cardRef.current);
};


const mouseMove = (e) => {
  let mouseMoveDir = {
    x: mouseStartPos.x - e.clientX,
    y: mouseStartPos.y - e.clientY,
  };


  mouseStartPos.x = e.clientX;
  mouseStartPos.y = e.clientY;

  const newSetPosition = setNewOffset(cardRef.current, mouseMoveDir);
  setPositon(newSetPosition);


  setPositon({
    x: cardRef.current.offsetLeft - mouseMoveDir.x,
    y: cardRef.current.offsetTop - mouseMoveDir.y,
  });
};

useEffect(() => {
  autoGrow(textAreaRef);
}, [])

  return (
    <div 
      ref={cardRef}
     className='card'
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
    }}>
    <div
      className="card-header" 
      style={{ backgroundColor: colors.colorHeader }}
      onMouseDown={mouseDown}>
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
       onFocus={() => {
        setZIndex(cardRef.current);
       }}
      >

       </textarea>
    </div>
  </div>
  )
}

export default NoteCard
