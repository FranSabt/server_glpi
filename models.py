from bd import conexion
from collections import namedtuple


def obtener_registros():
    con = conexion()
    registros = []
    with con.cursor() as cursor:
        cursor.execute("SELECT * FROM glpi_users")
    registros = cursor.fetchall()
    con.close()

    return registros


def obtener_x_id(id):
    con = conexion()
    registros = []
    with con.cursor() as cursor:
        cursor.execute("SELECT * FROM user WHERE id=%s", id)
    registros = cursor.fetchone()
    con.close()
    return registros


def creacion_usuario(nombre, correo):
    con = conexion()
    with con.cursor() as cursor:
        cursor.execute("INSERT INTO user(username, email) VALUES(%s, %s)", (nombre, correo))
    con.commit()
    con.close()