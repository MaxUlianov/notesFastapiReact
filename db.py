from pymongo import MongoClient
from decouple import config

db_user = config('MONGO_USER')
db_password = config('MONGO_PASS')


def get_db():
    CONNECTION_STRING = config('CONNECTION_STRING')
    client = MongoClient(CONNECTION_STRING)

    return client['testnotes']


def get_entries(collection):
    return [note for note in collection.find()]


if __name__ == '__main__':
    db = get_db()

    print(get_entries(db['notes']))
