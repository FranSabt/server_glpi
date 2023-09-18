from bd import conexion
from datetime import datetime

##################################################################
##               BUSQUEDA DE USUARIOS EN BD GLPI                ##
##################################################################

def obtener_registros():
    con = conexion()
    registros = []
    with con.cursor() as cursor:
        cursor.execute("SELECT * FROM glpi_users ORDER BY firstname")
    registros = cursor.fetchall()
    con.close()

    return registros


##################################################################
##                 OBTENCION DE MATERIALES ASIGNADOS            ##
##################################################################

"""
    Cada función es única para cada tabla de la BD de GLPI.

    Dado que no se usa un ORM como tal, se deben diseñar las consultas, 
    es recomendable verificar con una IA.

    Además, se regresan los valores encontrados pero no con su "key", 
    los "keys" se están asignando en la función que llama a 
    las se encuentran aquí.
"""

def obtener_impresoras(id):
    print(f"id == {id}")
    con = conexion()
    registros = []
    with con.cursor() as cursor:
        #print(f"SELECT * FROM glpi_users WHERE id={id}")
        cursor.execute(f"SELECT * FROM glpi_printers WHERE users_id_tech = {id}")
    registros = cursor.fetchall()
    con.close()
    # #print(registros)
    return registros

def obtener_telefonos(id):
    con = conexion()
    registros = []
    with con.cursor() as cursor:
        cursor.execute(f"SELECT * FROM glpi_phones WHERE users_id_tech = {id}")
    registros = cursor.fetchall()
    con.close()
    # #print(registros)
    return registros

def obtener_computadoras(id):
    con = conexion()
    registros = []
    with con.cursor() as cursor:
        cursor.execute(f"SELECT * FROM glpi_computers WHERE users_id_tech = {id}")
    registros = cursor.fetchall()
    con.close()
    #print(registros)
    return registros

def obtener_monitores(id):
    con = conexion()
    registros = []
    with con.cursor() as cursor:
        cursor.execute(f"SELECT * FROM glpi_monitors WHERE users_id_tech = {id}")
    registros = cursor.fetchall()
    con.close()
    #print(registros)
    return registros

def obtener_equipos_de_red(id):
    con = conexion()
    registros = []
    with con.cursor() as cursor:
        cursor.execute(f"SELECT * FROM glpi_networkequipments WHERE users_id_tech = {id}")
    registros = cursor.fetchall()
    con.close()
    #print(registros)
    return registros

def obtener_perifericos(id):
    con = conexion()
    registros = []
    with con.cursor() as cursor:
        cursor.execute(f"SELECT * FROM glpi_peripherals WHERE users_id_tech = {id}")
    registros = cursor.fetchall()
    con.close()
    #print(registros)
    return registros

def obtener_puntos_de_ventas(id):
    con = conexion()
    registros = []
    with con.cursor() as cursor:
        cursor.execute(f"SELECT * FROM glpi_plugin_genericobject WHERE users_id_tech = {id}")
    registros = cursor.fetchall()
    con.close()
    #print(registros)
    return registros

def obtener_racks(id):
    con = conexion()
    registros = []
    with con.cursor() as cursor:
        cursor.execute(f"SELECT * FROM glpi_racks WHERE users_id_tech = {id}")
    registros = cursor.fetchall()
    con.close()
    #print(registros)
    return registros

def obtener_pdus(id):
    con = conexion()
    registros = []
    with con.cursor() as cursor:
        cursor.execute(f"SELECT * FROM glpi_pdus WHERE users_id_tech = {id}")
    registros = cursor.fetchall()
    con.close()
    #print(registros)
    return registros

def obtener_gabinetes(id):
    con = conexion()
    registros = []
    with con.cursor() as cursor:
        cursor.execute(f"SELECT * FROM glpi_enclosures WHERE users_id_tech = {id}")
    registros = cursor.fetchall()
    con.close()
    #print(registros)
    return registros


def obtener_equipos_pasivos(id):
    con = conexion()
    registros = []
    with con.cursor() as cursor:
        cursor.execute(f"SELECT * FROM glpi_passivedcequipments WHERE users_id_tech = {id}")
    registros = cursor.fetchall()
    con.close()
    #print(registros)
    return registros

##################################################################
##              ENVIAR  MATERIALES ASIGNADOS TABLAS             ##
##################################################################


def crear_orden_asignacion(data):
    usuario_asignado = data.get('usuario_asignado')
    user_id_tech = data.get('user_id_tech')
    date = datetime.now().strftime('%Y-%m-%d')

    conn = conexion()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO orden_de_asignacion (usuario_asignado, user_id_tech, date) VALUES (%s, %s, %s)", (usuario_asignado, user_id_tech, date))
    conn.commit()  # confirmar la transacción

    id = cursor.lastrowid  # obtener el ID de la última fila insertada

    cursor.execute("SELECT * FROM orden_de_asignacion WHERE id = %s", (id,))
    orden = cursor.fetchone()  # obtener los datos de la última fila insertada

    return [orden] # para poder iterar sobre los elementos encontrados


def asignar_equipos(data):
    orden_de_asignacion  = data.get('orden_de_asignacion')
    serial               = data.get('serial')
    etiqueta             = data.get('etiqueta')
    asignado             = True
    user                 = data.get('user')
    createat             = datetime.now().strftime('%Y-%m-%d')
    createby             = data.get('createby')
    updateat             = datetime.now().strftime('%Y-%m-%d')
    updateby             = data.get('updateby')


    conn = conexion()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO equipos_asignados ( orden_de_asignacion, serial, etiqueta, asignado, user, createat, createby, updateat, updateby) VALUES ( %s, %s, %s, %s, %s, %s, %s, %s, %s)", ( orden_de_asignacion, serial, etiqueta, asignado, user, createat, createby, updateat, updateby))
    conn.commit()  # confirmar la transacción

    id = cursor.lastrowid  # obtener el ID de la última fila insertada

    cursor.execute("SELECT * FROM equipos_asignados WHERE id = %s", (id,))
    orden = cursor.fetchone()  # obtener los datos de la última fila insertada

    return [orden]
