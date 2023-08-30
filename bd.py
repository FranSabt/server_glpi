import pymysql

def conexion():

    return pymysql.connect(host='localhost', user='root', password='7448280', db='glpi')

