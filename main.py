from fastapi import FastAPI, Body
from db import db, query

app = FastAPI()


@app.get("/notes")
def get_notes():
    notes = db.all()
    return notes


@app.post("/notes")
def add_notes(data=Body()):
    db.insert(data['body'])
    notes = db.all()
    return notes


@app.get("/notes/{id}")
def get_note(note_id):
    note = db.get(doc_id=note_id)

    return note


@app.put("/notes/{id}")
def update_note(note_id, data=Body()):

    db.update(data['body'], doc_ids=note_id)
    notes = db.all()
    return notes


@app.delete("/notes/{id}")
def delete_note(note_id):
    db.remove(doc_ids=note_id)
    notes = db.all()
    return notes
