from bd import conexion

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

def obtener_impresoras(id):
    print(f"id == {id}")
    con = conexion()
    registros = []
    with con.cursor() as cursor:
        print(f"SELECT * FROM glpi_users WHERE id={id}")
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