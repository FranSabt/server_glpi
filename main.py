from flask import Flask, request, jsonify
import models
app = Flask(__name__)

# Enpoint Muestra todos los Usuarios
@app.route("/user", methods=["GET"])
def get_user():
    resultados = []
    result = models.obtener_registros()
    claves = ['id', 'name', 'password', 'password_last_update', 'phone',  'phone2', 'mobile', 'realname', 'firstname', 'locations_id', 'language', 'use_mode', 'list_limit', 'is_active', 'comment']
    for objetos in result:
        list2dic = dict(zip(claves, objetos)) #convertimos la tupla result y la lista claves en un diccionario
        resultados.append(list2dic)

    print(result)
    return jsonify({"data":resultados})



if __name__ == '__main__':
    with app.app_context():
        app.run(host="localhost", port="5000", debug=True)
