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

def obtener_cosumibles(id):
    con = conexion()
    registros = []
    with con.cursor() as cursor:
        cursor.execute(f"SELECT * FROM glpi_consumableitems WHERE users_id_tech = {id}")
    registros = cursor.fetchall()
    con.close()
    #print(registros)
    return registros

##################################################################
##              ENVIAR  MATERIALES ASIGNADOS TABLAS             ##
##################################################################

def validar_equipos(data):
    for element in data:
        serial = element.get('serial')
        other_serial = element.get('other_serial')
        if serial and serial != 'consumible' and serial != 'sin serial':
            print("Serial")
            print(element)
            print('*****')
            conn = conexion()
            cursor = conn.cursor()
            print("CONEXION CREADA")
            print(" ")
            cursor.execute("SELECT * FROM equipos_asignados WHERE serial = %s AND asignado = %s", (serial, 1))
            registro = cursor.fetchall()
            print('Registro')
            print(registro)
            conn.close()
            if registro:
                element['validado'] = False
                continue
            else:  
                element['validado'] = True
                continue

        if other_serial and other_serial != 'sin etiqueta':
            print("Etiqueta")
            print(element)
            print('*****')
            conn = conexion()
            cursor = conn.cursor()
            print("CONEXION CREADA")
            print(" ")
            cursor.execute(f"SELECT * FROM equipos_asignados WHERE etiqueta = '{other_serial}'")
            registro = cursor.fetchall()
            conn.close()
            if registro:
                element['validado'] = False
                continue

            else:  
                element['validado'] = True
                continue
            
        # if serial == 'consumible':
        else:
            element['validado'] = True

    return data


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
    id = 0
    for equip in data:
        orden_de_asignacion  = equip.get('orden_de_asignacion')
        user                 = equip.get('user')
        serial               = equip.get('serial') or 'sin serial'
        etiqueta             = equip.get('other_serial') or 'sin etiqueta'
        cantidad             = equip.get('cantidad') or 1
        tipo                 = equip.get('type') or 1
        asignado             = True
        createat             = datetime.now().strftime('%Y-%m-%d')
        createby             = equip.get('createby') or 999
        updateat             = datetime.now().strftime('%Y-%m-%d')
        updateby             = equip.get('updateby') or 999

        conn = conexion()
        cursor = conn.cursor()


        # Verificar si existe una entrada con el mismo serial
        existe_serial = None
        if serial != 'sin serial':
            cursor.execute("SELECT * FROM equipos_asignados WHERE serial = %s", (serial,))
            existe_serial = cursor.fetchone()

        # Verificar si existe una entrada con la misma etiqueta
        existe_etiqueta = None
        if etiqueta != 'sin etiqueta':
            cursor.execute("SELECT * FROM equipos_asignados WHERE etiqueta = %s", (etiqueta,))
            existe_etiqueta = cursor.fetchone()

        if not existe_serial and not existe_etiqueta:
            
            cursor.execute("INSERT INTO equipos_asignados ( orden_de_asignacion, user, serial, etiqueta, cantidad, asignado, tipo, create_at, create_by, update_at, update_by) VALUES ( %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", ( orden_de_asignacion, user, serial, etiqueta, cantidad, asignado,  tipo, createat, createby, updateat, updateby))
            conn.commit()  # confirmar la transacción
            id = equip.get('orden_de_asignacion')  # obtener el ID de la última fila insertada

        elif existe_serial:
            # Si existe una entrada con el mismo serial o etiqueta, entonces actualizar los valores
            cursor.execute("UPDATE equipos_asignados SET user = %s, etiqueta = %s, orden_de_asignacion = %s, update_at = %s, update_by = %s, asignado = 1 WHERE serial = %s", (user, etiqueta, orden_de_asignacion, updateat, updateby, serial))
            conn.commit()  # confirmar la transacción
            id = equip.get('orden_de_asignacion')  # obtener el ID de la última fila insertada

        elif existe_etiqueta:
            # Si existe una entrada con el mismo serial o etiqueta, entonces actualizar los valores
            cursor.execute("UPDATE equipos_asignados SET user = %s, serial = %s, orden_de_asignacion = %s, update_at = %s, update_by = %s, asignado = 1 WHERE etiqueta = %s", (user, serial, orden_de_asignacion, updateat, updateby, etiqueta))
            conn.commit()  # confirmar la transacción
            id = equip.get('orden_de_asignacion')  # obtener el ID de la última fila insertada

        cursor.execute("SELECT * FROM equipos_asignados WHERE orden_de_asignacion = %s", (id,))
        orden = cursor.fetchone()  # obtener los datos de la última fila insertada

    return [orden]

def liberar_equipo(data):
    serial = data.get('serial')
    other_serial = data.get('other_serial')
    conn = conexion()
    cursor = conn.cursor()
    
    if serial and serial != 'consumible' and serial != 'sin serial':
        cursor.execute("SELECT * FROM equipos_asignados WHERE serial = %s", (serial,))
        registro_actual = cursor.fetchone()
        if registro_actual:
            cursor.execute("UPDATE equipos_asignados SET asignado = 0 WHERE serial = %s", (serial,))
            conn.commit()
            if cursor.rowcount > 0:
                data['asignado'] = 0
                data['validado'] = True

    
    if other_serial and other_serial != 'sin etiqueta':
        cursor.execute("SELECT * FROM equipos_asignados WHERE etiqueta = %s", (other_serial,))
        registro_actual = cursor.fetchone()
        if registro_actual:
            cursor.execute("UPDATE equipos_asignados SET asignado = 0 WHERE etiqueta = %s", (other_serial,))
            conn.commit()
            if cursor.rowcount > 0:
                data['asignado'] = 0
                data['validado'] = True

    conn.close()
    print(data)
    
    return data



