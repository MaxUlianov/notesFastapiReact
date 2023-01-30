import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import ListItem from '../components/ListItem'

let dummyData = [{"id":"1", "body":"Get milk" }, {"id":"2", "body":"Wash car" }, {"id":"3", "body":"Start coding"}]

const Notes = () => {
    let [notes, setNotes] = useState(dummyData)

    useEffect(() => { getNotes()}, [])

    let getNotes = async () => {
        let response = await fetch('/notes')
        let data = await response.json()
        setNotes(data)
    }

    return (
        <div className='notes'>

            <nav className="navbar has-background-white">
                <div class="navbar-brand">
                    <div class="navbar-item">
                        <div class="title is-5">Notes:</div>
                    </div>

                    <div class="navbar-item">
                        <div class="title is-5">{notes.length}</div>
                    </div>  
                </div>

                <div class="navbar-menu">
                    <div class="navbar-end">
                        <div class="navbar-item">
            
                            <div class="buttons">
                                <a class="button is-primary">
                                <strong>Login</strong>
                                </a>
                                <a class="button is-light">Sign Up</a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className='container'>
                <div class="navbar" Style="padding-left: 0rem; padding-right: 0rem;">
                    <div class="navbar-item" Style="padding-left: 0rem;">
                        <Link className="button is-primary is-outlined, title is-5" to={'/add'}>Add</Link>
                    </div>
                </div>

                <div class="block">
                    {notes.map((note) => (
                        <ListItem key={note.id} note={note}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Notes