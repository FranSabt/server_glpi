from bd import conexion


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
    # print(registros)
    return registros

def obtener_telefonos(id):
    con = conexion()
    registros = []
    with con.cursor() as cursor:
        cursor.execute(f"SELECT * FROM glpi_phones WHERE users_id_tech = {id}")
    registros = cursor.fetchall()
    con.close()
    # print(registros)
    return registros

def obtener_computadoras(id):
    con = conexion()
    registros = []
    with con.cursor() as cursor:
        cursor.execute(f"SELECT * FROM glpi_computers WHERE users_id_tech = {id}")
    registros = cursor.fetchall()
    con.close()
    print(registros)
    return registros