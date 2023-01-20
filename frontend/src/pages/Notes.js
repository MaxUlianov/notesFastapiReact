import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import ListItem from '..components/ListItem'

let dummy = [{"id":"1", "body":"Start app" }, {"id":"2", "body":"Learn js" }, {"id":"3", "body":"Read manga lol"}]

const Notes = () => {
    let [notes, setNotes] = useState(dummy)

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