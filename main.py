from flask import Flask, request, jsonify
from flask_cors  import CORS
import models

app = Flask(__name__)
CORS(app)

import mail

app = Flask(__name__)
app.config['MAIL_SERVER']='smtp.netcomplusve.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'fhernandez@netcomplusve.com'
app.config['MAIL_PASSWORD'] = 'j2b*c*fE1223'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

mail.configure(app)

# 
@app.route('/mail')
def index():
    mail.send_email('hsabatino1@gmail.com', 'Hola', '<b>¡Hola, mundo!</b>')
    return "Correo enviado"

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
        list2dic['type']='Computador'
        # print(list2dic)
        resultados.append(list2dic)

    ##* Celulares *##
    result = models.obtener_telefonos(id)

    claves = ['id','entities_id', 'name', 'date_mod', 'contact', 'contact_num', 'user_tech_id', 'group_id_tech','comment', 'serial', 'other_serial' ]
    for objetos in result:
        list2dic = dict(zip(claves, objetos)) #convertimos la tupla result y la lista claves en un diccionario
        list2dic['type']='Celular'
        # print(list2dic)
        resultados.append(list2dic)

    ##* Impresoras *##
    result = models.obtener_impresoras(id)

    claves = ['id','entities_id','is_recursive', 'name', 'date_mod', 'contact', 'contact_num', 'user_tech_id', 'group_id_tech', 'serial', 'other_serial'   ]
    for objetos in result:
        list2dic = dict(zip(claves, objetos)) #convertimos la tupla result y la lista claves en un diccionario
        list2dic['type']='Impresora'
        # print(list2dic)
        resultados.append(list2dic)

    ##* Monitores *##
    result = models.obtener_monitores(id)

    claves = ['id','entities_id', 'name', 'date_mod', 'contact', 'contact_num', 'user_tech_id', 'group_id_tech', 'comment', 'serial', 'other_serial']
    for objetos in result:
        list2dic = dict(zip(claves, objetos)) #convertimos la tupla result y la lista claves en un diccionario
        list2dic['type']='Monitor'
        # print(list2dic)
        resultados.append(list2dic)

    ##* Equipos de red *##
    result = models.obtener_equipos_de_red(id)

    claves = ['id','entities_id', 'is_recursive', 'name', 'ram', 'serial', 'other_serial']
    for objetos in result:
        list2dic = dict(zip(claves, objetos)) #convertimos la tupla result y la lista claves en un diccionario
        list2dic['type']='Equipo de Red'
        # print(list2dic)
        resultados.append(list2dic)

    ##* Perifericos *##
    result = models.obtener_perifericos(id)

    claves = ['id','entities_id', 'name', 'date_mod', 'contact', 'contact_num', 'user_tech_id', 'group_id_tech', 'comment', 'serial', 'other_serial']
    for objetos in result:
        list2dic = dict(zip(claves, objetos)) #convertimos la tupla result y la lista claves en un diccionario
        list2dic['type']='Dispositivo periférico'
        # print(list2dic)
        resultados.append(list2dic)


    ##* Racks *##
    result = models.obtener_racks(id)

    claves = ['id', 'name', 'comment', 'entities_id', 'is_recursive', 'location',  'serial', 'other_serial']
    for objetos in result:
        list2dic = dict(zip(claves, objetos)) #convertimos la tupla result y la lista claves en un diccionario
        list2dic['type']='Rack'
        # print(list2dic)
        resultados.append(list2dic)

    ##* PDUs *##
    result = models.obtener_pdus(id)

    claves = ['id', 'name', 'entities_id', 'is_recursive', 'location',  'serial', 'other_serial']
    for objetos in result:
        list2dic = dict(zip(claves, objetos)) #convertimos la tupla result y la lista claves en un diccionario
        list2dic['type']='PDU'
        # print(list2dic)
        resultados.append(list2dic)

    ##* Gabinetes / Enclosures *##
    result = models.obtener_gabinetes(id)

    claves = ['id', 'name', 'entities_id', 'is_recursive', 'location',  'serial', 'other_serial']
    for objetos in result:
        list2dic = dict(zip(claves, objetos)) #convertimos la tupla result y la lista claves en un diccionario
        list2dic['type']='Gabinetes'
        # print(list2dic)
        resultados.append(list2dic)

    ##* Equipos Pasivos *##
    result = models.obtener_equipos_pasivos(id)

    claves = ['id', 'name', 'entities_id', 'is_recursive', 'location',  'serial', 'other_serial']
    for objetos in result:
        list2dic = dict(zip(claves, objetos)) #convertimos la tupla result y la lista claves en un diccionario
        list2dic['type']='Equipos pasivos'
        # print(list2dic)
        resultados.append(list2dic)

    # ##* Puntos de venta *##
    # #! La tabla no existia en copia de BD
    # result = models.obtener_puntos_de_ventas(id)

    # claves = ['id','entities_id', 'name', 'date_mod', 'contact', 'contact_num', 'user_tech_id', 'group_id_tech', 'comment', 'serial', 'other_serial']
    # for objetos in result:
    #     list2dic = dict(zip(claves, objetos)) #convertimos la tupla result y la lista claves en un diccionario
    #     list2dic['type']='Punto de venta'
    #     # print(list2dic)


    return  jsonify(resultados)


if __name__ == '__main__':
    with app.app_context():
        app.run(host="localhost", port="5000", debug=True)
