from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware

from db import get_db, get_entries
from bson.objectid import ObjectId

app = FastAPI()
db = get_db()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/notes")
def get_notes():
    notes = db['notes']

    return get_entries(notes)


@app.post("/notes")
def add_notes(data=Body()):
    notes = db['notes']
    notes.insert_one({"body": data})

    return get_entries(notes)


@app.get("/notes/{note_id}")
def get_note(note_id):
    notes = db['notes']
    notes.find_one({'_id': ObjectId(note_id)})

    return get_entries(notes)


@app.put("/notes/{note_id}")
def update_note(note_id, data=Body()):
    notes = db['notes']
    notes.update_one({'_id': ObjectId(note_id)}, {"$set": {"body": data}}, upsert=False)

    return get_entries(notes)


@app.delete("/notes/{note_id}")
def delete_note(note_id):
    notes = db['notes']
    notes.delete_one({'_id': ObjectId(note_id)})

    return get_entries(notes)


if __name__ == '__main__':
    print(db['notes'])


# uvicorn main:app --reload
