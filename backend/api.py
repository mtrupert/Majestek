from mysql import connector
import flask
from flask import jsonify
from flask import request

# from the 3368 class
app = flask.Flask(__name__) 
app.config["DEBUG"] = True 

@app.route('/', methods=['GET'])
def page_get():
    return "Page Got"
    
@app.route('/post', methods=['POST'])
def page_post():

    request_data = request.get_json()
    test = request_data['test']

    conn = create_connection(db.host, db.admin, db.pw, db.db_name)

    # create the executable statement for mysql
    insert_statement = "INSERT INTO test(test) VALUES ('%s')" % ('test')

    # execute the statement, had to check class for proper syntax
    execute_query(conn, insert_statement)

    return 'Page Post'

@app.route('/put', methods=['PUT'])
def page_update():

    request_data = request.get_json()
    update = request_data['update_name']
    new_data = request_data['new_data']

    conn = create_connection(db.host, db.admin, db.pw, db.db_name)

    # create the executable statement for mysql
    update_statement = "UPDATE test SET ('%s')" % ('new_data')

    # execute the statement, had to check class for proper syntax
    execute_query(conn, insert_statement)

    return 'Page Updated'




@app.route('/delete', methods=["DELETE"])
def page_delete():
    request_data = request.get_json()
    for_delete = request_data['name']
    delete_token = request_data['token']
    
    admin_token = '101'


    if delete_token == admin_token:
        conn = create_connection(db.host, db.admin, db.pw, db.db_name)

        # create the executable statement for mysql, https://www.w3schools.com/sql/sql_delete.asp
        delete_statement = "DELETE FROM test WHERE name=('%s')" % (for_delete)

        # execute the statement, had to check class for proper syntax
        execute_query(conn, delete_statement)
        conn.commit()
        return "Dropped"
    else:
        return "Not Authorized"


app.run()