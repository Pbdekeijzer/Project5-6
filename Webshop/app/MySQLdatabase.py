import json
import os

import mysql.connector
from flask import jsonify


class MySQLdatabase:

    DatabaseConnection = mysql.connector.connect(user='u230389_0898958', password='00f1de2b', host='mysql762.cp.hostnet.nl', database='db230389_Project5_6')
    DatabaseConnection.close()

    @staticmethod
    def ExcecuteSafeSelectQuery(Query, *args):
        DatabaseConnection = mysql.connector.connect(user='u230389_0898958', password='00f1de2b',
                                                     host='mysql762.cp.hostnet.nl', database='db230389_Project5_6')
        DatabaseConnection._open_connection()
        cursor = DatabaseConnection.cursor(buffered=True)

        cursor.execute(Query, args)
        resultquery = cursor.fetchall()

        DatabaseConnection.commit()
        cursor.close()
        DatabaseConnection.close()

        return resultquery

    @staticmethod
    def ExecuteSafeInsertQuery(query, *args):
        try:
            DatabaseConnection = mysql.connector.connect(user='u230389_0898958', password='00f1de2b',
                                                     host='mysql762.cp.hostnet.nl', database='db230389_Project5_6')
            DatabaseConnection._open_connection()
            cursor = DatabaseConnection.cursor(buffered=True)
            cursor.execute(query, args)
            DatabaseConnection.commit()
            cursor.close()
            DatabaseConnection.close()
            return True
        except:
            return False





















    @staticmethod
    def UpdateQuery(query):
        try:
            MySQLdatabase.DatabaseConnection._open_connection()
            cursor = MySQLdatabase.DatabaseConnection.cursor(buffered=True)

            cursor.execute(query)
            # emp_no = cursor.lastrowid          NOT SURE IF USEFULL OR NOT, should get id of insert or something #autoincrement
            MySQLdatabase.DatabaseConnection.commit()
            cursor.close()
            MySQLdatabase.DatabaseConnection.close()
            return True;
        except:
            return False;



    @staticmethod
    def ExecuteInsertQuery(query):
        DatabaseConnection = mysql.connector.connect(user='u230389_0898958', password='00f1de2b', host='mysql762.cp.hostnet.nl', database='db230389_Project5_6')
        DatabaseConnection._open_connection()
        cursor = DatabaseConnection.cursor(buffered=True)
        cursor.execute(query)
        DatabaseConnection.commit()
        cursor.close()
        DatabaseConnection.close()

    @staticmethod
    def ExecuteQuery(query):
        DatabaseConnection = mysql.connector.connect(user='u230389_0898958', password='00f1de2b', host='mysql762.cp.hostnet.nl', database='db230389_Project5_6')
        DatabaseConnection._open_connection()
        cursor = DatabaseConnection.cursor(buffered=True)
        cursor.execute(query)
        resultquery = cursor.fetchall()  
        DatabaseConnection.commit()
        cursor.close()
        DatabaseConnection.close()
        return resultquery

a = MySQLdatabase()
