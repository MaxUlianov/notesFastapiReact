import React, {useState, useEffect} from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

const Note = () => {
    let navigate = useNavigate()
    let params = useParams()
    let noteId = params.id

    // let noteItem = dummy.find((note) => note.id === noteId)

    let getNote = async () => {
        let response = await fetch(`/notes/${noteId}`)
        let data = await response.json()  
        setNote(data)
    }

    let [note, setNote] = useState(null)
    useEffect(() => {
        if(noteId !== 'add') getNote()
    }, [noteId])

    let submitData = async (e) => {
        e.preventDefault()

        let url = '/notes'
        let method = 'POST'

        if (noteId !== 'add'){
            url = `/notes/${params.id}`
            method = 'PUT'
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
        <div>
            <Link to={'/'}>Go Back</Link>{noteId !== 'add' && (<button onClick={deleteNote}>Delete</button>)}
            <textarea onChange={(e) => {setNote({...note, "body":e.target.value})}} 
            value={note?.body} 
            placeholder="Add note...">
            </textarea>
            <button onClick={submitData}>Save</button>

        </div>
    )
}

export default Note