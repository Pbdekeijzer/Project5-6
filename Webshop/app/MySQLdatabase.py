import json
import os

import mysql.connector
from flask import jsonify


class MySQLdatabase:

    DatabaseConnection = mysql.connector.connect(user='u230389_0898958', password='00f1de2b', host='mysql762.cp.hostnet.nl', database='db230389_Project5_6')
    DatabaseConnection.close()

    @staticmethod
    def SelectWhereUsernameQuery(WHEREUSERNAME):
        DatabaseConnection = mysql.connector.connect(user='u230389_0898958', password='00f1de2b',
                                                     host='mysql762.cp.hostnet.nl', database='db230389_Project5_6')
        DatabaseConnection._open_connection()
        cursor = DatabaseConnection.cursor(buffered=True)

        cursor.execute("SELECT * FROM User_ WHERE User_Name = %s", (WHEREUSERNAME,))
        resultquery = cursor.fetchall()

        DatabaseConnection.commit()
        cursor.close()
        DatabaseConnection.close()

        return resultquery

    @staticmethod
    def SelectWhereUsernameAndPasswordQuery(WHEREUSERNAME, WHEREPASSWORD):
        DatabaseConnection = mysql.connector.connect(user='u230389_0898958', password='00f1de2b',
                                                     host='mysql762.cp.hostnet.nl', database='db230389_Project5_6')
        DatabaseConnection._open_connection()
        cursor = DatabaseConnection.cursor(buffered=True)

        cursor.execute("SELECT User_Name FROM User_ WHERE User_Name = %s and Wachtwoord = %s", (WHEREUSERNAME, WHEREPASSWORD,))
        resultquery = cursor.fetchall()

        DatabaseConnection.commit()
        cursor.close()
        DatabaseConnection.close()

        return resultquery
































    @staticmethod
    def InsertQuery(INSERT_INTO, VALUES):
        MySQLdatabase.DatabaseConnection._open_connection()
        cursor = MySQLdatabase.DatabaseConnection.cursor(buffered=True)

        cursor.execute(("INSERT INTO "+INSERT_INTO+" VALUES "+VALUES))
        #emp_no = cursor.lastrowid          NOT SURE IF USEFULL OR NOT, should get id of insert or something #autoincrement
        MySQLdatabase.DatabaseConnection.commit()
        cursor.close()
        MySQLdatabase.DatabaseConnection.close()

    @staticmethod
    def DeleteQuery(query):
        try:
            MySQLdatabase.DatabaseConnection._open_connection()
            cursor = MySQLdatabase.DatabaseConnection.cursor(buffered=True)

            cursor.execute(query)
            # emp_no = cursor.lastrowid          NOT SURE IF USEFULL OR NOT, should get id of insert or something #autoincrement
            MySQLdatabase.DatabaseConnection.commit()
            cursor.close()
            MySQLdatabase.DatabaseConnection.close()
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

    @staticmethod
    def SelectAllQuery(SELECT, FROM):
        DatabaseConnection = mysql.connector.connect(user='u230389_0898958', password='00f1de2b', host='mysql762.cp.hostnet.nl', database='db230389_Project5_6')
        DatabaseConnection._open_connection()
        cursor = DatabaseConnection.cursor(buffered=True)

        cursor.execute(("SELECT "+SELECT+" FROM "+FROM))
        resultquery = cursor.fetchall()  

        DatabaseConnection.commit()
        cursor.close()
        DatabaseConnection.close()

        return resultquery


a = MySQLdatabase()
