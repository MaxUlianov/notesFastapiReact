from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from db import db, query

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/notes")
def get_notes():
    notes = db.all()
    return notes


@app.post("/notes")
def add_notes(data=Body()):
    db.insert(data)
    notes = db.all()
    return notes


@app.get("/notes/{note_id}")
def get_note(note_id):
    note = db.get(doc_id=note_id)

    return note


@app.put("/notes/{note_id}")
def update_note(note_id, data=Body()):

    db.update(data, doc_ids=note_id)
    notes = db.all()
    return notes


@app.delete("/notes/{note_id}")
def delete_note(note_id):
    db.remove(doc_ids=note_id)
    notes = db.all()
    return notes


if __name__ == '__main__':
    print(db.all())
