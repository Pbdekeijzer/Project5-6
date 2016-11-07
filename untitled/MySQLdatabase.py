import json
from flask import jsonify
import os
import mysql.connector


class MySQLdatabase:

    DatabaseConnection = mysql.connector.connect(user='u230389_0898958', password='00f1de2b', host='mysql762.cp.hostnet.nl', database='db230389_Project5_6')
    DatabaseConnection.close()

    @staticmethod
    def InsertQuery(INSERT_INTO, VALUES):
        MySQLdatabase.DatabaseConnection._open_connection()
        cursor = MySQLdatabase.DatabaseConnection.cursor(buffered=True)

        cursor.execute(("INSERT INTO "+INSERT_INTO+"VALUES "+VALUES))
        #emp_no = cursor.lastrowid          NOT SURE IF USEFULL OR NOT, should get id of insert or something #autoincrement
        MySQLdatabase.DatabaseConnection.commit()
        cursor.close()
        MySQLdatabase.DatabaseConnection.close()

    @staticmethod
    def DeleteQuery(query):
        MySQLdatabase.DatabaseConnection._open_connection()
        cursor = MySQLdatabase.DatabaseConnection.cursor(buffered=True)

        cursor.execute(query)
        #emp_no = cursor.lastrowid          NOT SURE IF USEFULL OR NOT, should get id of insert or something #autoincrement
        MySQLdatabase.DatabaseConnection.commit()
        cursor.close()
        MySQLdatabase.DatabaseConnection.close()

    @staticmethod
    def UpdateQuery(UPDATE, SET, WHERE):
        MySQLdatabase.DatabaseConnection._open_connection()
        cursor = MySQLdatabase.DatabaseConnection.cursor(buffered=True)

        cursor.execute(("UPDATE "+UPDATE+"SET "+SET+"WHERE "+WHERE))
        #emp_no = cursor.lastrowid          NOT SURE IF USEFULL OR NOT, should get id of insert or something #autoincrement
        MySQLdatabase.DatabaseConnection.commit()
        cursor.close()
        MySQLdatabase.DatabaseConnection.close()

    @staticmethod
    def SelectQuery(SELECT, FROM, WHERE):
        MySQLdatabase.DatabaseConnection._open_connection()
        cursor = MySQLdatabase.DatabaseConnection.cursor(buffered=True)

        cursor.execute(("SELECT "+SELECT+"FROM "+FROM+"WHERE "+WHERE))
        resultquery = cursor.fetchall()  

        MySQLdatabase.DatabaseConnection.commit()
        cursor.close()
        MySQLdatabase.DatabaseConnection.close()
        
        return resultquery

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

    @staticmethod
    def SelectAllQuery(SELECT, FROM):
        DatabaseConnection = mysql.connector.connect(user='u230389_0898958', password='00f1de2b', host='mysql762.cp.hostnet.nl', database='db230389_Project5_6')
        DatabaseConnection._open_connection()
        cursor = DatabaseConnection.cursor(buffered=True)

        cursor.execute(("SELECT "+SELECT+"FROM "+FROM))
        resultquery = cursor.fetchall()  

        DatabaseConnection.commit()
        cursor.close()
        DatabaseConnection.close()

        return resultquery

    



"""
user, password, host, database

DatabaseConnection = MySQLdatabase('u230389_0898958', '00f1de2b', 'mysql762.cp.hostnet.nl', 'db230389_Project5_6')
mysql.connector.connect(user='u230389_0898958', password='00f1de2b', host='mysql762.cp.hostnet.nl', database='db230389_Project5_6')

import mysql.connector
import MySQLdatabase



("INSERT INTO employees "
               "(first_name, last_name, hire_date, gender, birth_date) "
               "VALUES (%s, %s, %s, %s, %s)")
# Insert new employee
cursor.execute(add_employee, data_employee)
emp_no = cursor.lastrowid

# Make sure data is committed to the database
cnx.commit()

cursor.close()
cnx.close()

"""

a = MySQLdatabase()