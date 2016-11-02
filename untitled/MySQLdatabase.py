import json
from flask import jsonify
import os
import mysql.connector


class MySQLdatabase:

    DatabaseConnection = mysql.connector.connect(user='u230389_0898958', password='00f1de2b', host='mysql762.cp.hostnet.nl', database='db230389_Project5_6')
    
    DatabaseConnection.close()
    
    

    @staticmethod
    def InsertQuery(INSERT_INTO, VALUES):
        DatabaseConnection._open_connection()
        cursor = DatabaseConnection.cursor()

        cursor.execute(("INSERT INTO "+INSERT_INTO+"VALUES"+VALUES))
        #emp_no = cursor.lastrowid      NOT SURE IF USEFULL OR NOT, should get id of insert or something #autoincrement
        DatabaseConnection.commit()
        DatabaseConnection.close()
        cursor.close()




a = MySQLdatabase()

        
"""
    @staticmethod
    def DeleteQuery():

    @staticmethod
    def UpdateQuery():

    @staticmethod
    def SelectQuery():
"""


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
