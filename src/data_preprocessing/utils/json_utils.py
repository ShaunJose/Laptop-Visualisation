import json

def write_to_file(filename, data):

    with open(filename, 'w') as filepath:
        json.dump(data, filepath)
