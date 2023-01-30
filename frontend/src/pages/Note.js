import React, {useState, useEffect} from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

const Note = () => {
    let navigate = useNavigate()
    let params = useParams()
    let noteId = params.id

    let getNote = async () => {
        let response = await fetch(`/notes/${noteId}`)
        let data = await response.json()  
        setNote(data)
    };

    let [note, setNote] = useState(null)
    useEffect(() => {
        if(noteId !== 'add') getNote()
    }, [noteId]);

    let submitData = async (e) => {
        e.preventDefault()

        let url = '/notes'
        let method = 'POST'

        if (noteId !== 'add'){
            url = `/notes/${params.id}`
            method = 'PUT'
        }

        let noteBody = note?.body
            if (noteBody !== undefined){
            noteBody = String(noteBody).trim()
        }

        if(noteBody === '' || noteBody === undefined){
            alert('Note cannot be empty.')
            return 
        }

        await fetch(url, { method:method, headers:{
            'Content-Type':'application/json'},
            body:JSON.stringify({"body":note.body})
        })
        navigate('/')
    }

    let deleteNote = async (e) => {
        e.preventDefault()
        await fetch(`/notes/${params.id}`,
            { method:'DELETE'})
        navigate('/')
    }

    return (
        <div className="block">
            <div className="navbar" Style="margin-top: 1rem; margin-bottom: 1rem; padding-left: 0rem; padding-right: 0rem;">
                <div class="navbar-item" Style="padding-left: 0rem;">
                    <Link to={'/'}>
                        <div className="button is-primary is-outlined">Go Back</div>
                    </Link>
                </div>
                    
                <div className="navbar-end">
                    <div className="navbar-item" Style="padding-right: 0rem;">
                        {noteId !== 'add' && (<button className="button is-danger is-light" onClick={deleteNote}>Delete</button>)}
                    </div>
                </div>
            </div>

            <div className="field">

                <textarea class="textarea is-primary" onChange={(e) => {setNote({...note, "body":e.target.value})}} 
                value={note?.body} required
                placeholder="Write note...">
                </textarea>

                <button className="button is-primary" Style="margin-top: 1rem;" onClick={submitData}>Save</button>
            </div>

        </div>
    )
}

export default Note