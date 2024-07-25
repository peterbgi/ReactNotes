import {useState, useEffect} from 'react'
import { databases } from '../appwrite/config.js';
import { db } from "../appwrite/databases"
import NoteCard from '../components/NoteCard.jsx'

function NotesPage() {

    const [notes, setNotes] = useState([]);


    useEffect(() => {
        init()
    }, [])

    const init = async () => {
        const response = await db.notes.list()
        setNotes(response.documents);
    }


  return (
    <div>
        {notes.map((note) => (
            <NoteCard note={note} key={note.$id} setNotes={setNotes} />
        ))}
    </div>
  )
}

export default NotesPage
