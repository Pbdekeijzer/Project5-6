drop table if exists User_;
drop table if exists Buyable_item_;

create table User_ (
User_ID SERIAL primary key,
Credit float,
Street char(50),
Street_number char(6),
Postal_code char(6),
First_name char(20),
Surname char(35),
Adminbool boolean,
Birthday date,
Wachtwoord char(20),
Email_address char(45)
);

create table Buyable_item_(
Product_ID SERIAL primary key,
Title char(50),
Description char(700),
In_stock int,
Fits_in_mailbox boolean,
price float);






--#timestamp [ (p) ] [ without time zone ]
