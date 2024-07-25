import Controls from '../components/Controls'
import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";
import NoteCard from '../components/NoteCard.jsx'

function NotesPage() {
    const { notes, setNotes } = useContext(NoteContext);

  return (
    <div>
        {notes.map((note) => (
            <NoteCard note={note} key={note.$id} />
        ))}
        <Controls />
    </div>
  )
}

export default NotesPage
