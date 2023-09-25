import pymysql

def conexion():

    return pymysql.connect(host='localhost', user='fran', password='7448280', db='glpi')

