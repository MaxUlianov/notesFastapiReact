import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import ListItem from '../components/ListItem'

const Notes = () => {
    let [notes, setNotes] = useState([])

    useEffect(() => { getNotes()}, [])

    let getNotes = async () => {
        let response = await fetch('/notes')
        let data = await response.json()
        setNotes(data)
    }

    return (
        <div>
            <Link to={'/add'}>Add</Link>
            <ul>
                {notes.map((note) => (
                    <li key={note.id}><ListItem note={note}/></li>
                ))}
            </ul>
        </div>
    )
}

export default Notes