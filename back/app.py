import json
import re
import string
from random import choice, randint
import uuid

from flask import Flask

app = Flask(__name__)

DECK = []

masts = 'ABCDEF'
nominals = '12345678'
colors = ['card-green', 'card-blue', 'card-red', 'card-violet']


def generate_default_collection():
    global DECK
    global colors
    DECK = [(choice(string.ascii_uppercase),
            choice(string.digits),
            choice(colors)) for c in range(20)]


def generate_collection(amount):
    return [(choice(string.ascii_uppercase),
            choice(string.digits),
            choice(colors)) for c in range(int(amount))]


@app.route('/default_collection')
def default_collection():
    return json.dumps(DECK)


@app.route('/generate/<amount>')
def generate_new_collection(amount):
    return json.dumps({str(uuid.uuid4()): generate_collection(amount)})

@app.route('/generate_multiple/<rule>')
def generate_multiple(rule):
    match = re.match('(\d+)\s?\-\s?(\d+)', rule)
    if not match or not len(match.groups()) == 2:
        raise ValueError('Rule is not conforming (\d+)\-(d+) regex!' )

    min_col = match.groups()[0]
    max_col = match.groups()[1]

    cols = {}
    for u in range(0, randint(int(min_col), int(max_col))):
        cols[str(uuid.uuid4())] = generate_collection(randint(5, 15))
    return json.dumps(cols)

if __name__ == '__main__':
    generate_default_collection()
    app.run(debug=True, port=5001)
