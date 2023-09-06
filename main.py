from flask import Flask, request, jsonify
from flask_cors  import CORS
import models

app = Flask(__name__)
CORS(app)

# Enpoint Muestra todos los Usuarios
@app.route("/users", methods=["GET"])
def get_user():
    resultados = []
    result = models.obtener_registros()
    claves = ['id', 'name', 'password', 'password_last_update', 'phone',  'phone2', 'mobile', 'realname', 'firstname', 'locations_id', 'language', 'use_mode', 'list_limit', 'is_active', 'comment', 'auths_id ', 'authtype','last_login', 'date_mod'  , 'date_sync' , 'is_deleted' ,  'profiles_id' , 'entities_id ' , 'usertitles_id', 'usercategories_id',  'date_format', 'number_format',  'names_format', 'csv_delimiter', 'is_ids_visible', 'use_flat_dropdowntree', 'use_flat_dropdowntree_on_search_result', 'show_jobs_at_login ', 'priority_1', 'priority_2' , 'priority_3', 'priority_4', 'priority_5', 'priority_6', 'followup_private', 'task_private', 'default_requesttypes_id', 'password_forget_token' , 'password_forget_token_date', 'user_dn', 'registration_number']
    for objetos in result:
        list2dic = dict(zip(claves, objetos)) #convertimos la tupla result y la lista claves en un diccionario
        print(list2dic)
        new_dict = { 'id':list2dic['id'],'name':list2dic['name'], 'realname': list2dic['realname'], 'fisrtname': list2dic['firstname'], 'registration_number': list2dic['registration_number'], 'comment': list2dic['comment']}
        print('--------------------------')
        print(new_dict)
        resultados.append(new_dict)

    #print(resultados)
    return jsonify({"data":resultados})

@app.route('/user-detail')
def saludo():
    id = request.args.get('id')
    resultados = []

    ##* Computadoras *##
    result = models.obtener_computadoras(id)

    claves = ['id','entities_id', 'name', 'serial', 'other_serial'  ]
    for objetos in result:
        list2dic = dict(zip(claves, objetos)) #convertimos la tupla result y la lista claves en un diccionario
        print(list2dic)
        resultados.append(list2dic)

    ##* Celulares *##
    result = models.obtener_telefonos(id)

    claves = ['id','entities_id', 'name', 'date_mod',   ]
    for objetos in result:
        list2dic = dict(zip(claves, objetos)) #convertimos la tupla result y la lista claves en un diccionario
        print(list2dic)
        resultados.append(list2dic)


    ##* Impresoras *##
    result = models.obtener_impresoras(id)

    claves = ['id','entities_id','is_recursive', 'name', 'date_mod',   ]
    for objetos in result:
        list2dic = dict(zip(claves, objetos)) #convertimos la tupla result y la lista claves en un diccionario
        print(list2dic)
        resultados.append(list2dic)



    return  jsonify(resultados)


if __name__ == '__main__':
    with app.app_context():
        app.run(host="localhost", port="5000", debug=True)
