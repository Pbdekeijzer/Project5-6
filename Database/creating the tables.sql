drop table if exists Type_Buyable_item_;
drop table if exists Order_Buyable_item_;
drop table if exists User_Buyable_item_;


drop table if exists Type_;
drop table if exists Order_;
drop table if exists Review_;
drop table if exists Buyable_item_;
drop table if exists User_;

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
price float
);

create table Review_(
Review_ID SERIAL primary key,
Title char(20),
Description char(500),
Stars int,
Part_of_product int,
Related_to_person int,
foreign key (Part_of_product) references Buyable_item_(Product_ID),
foreign key (Related_to_person) references User_(User_ID)
);

create table Order_(
Order_ID SERIAL primary key,
Time_of_order_placed timestamp without time zone,
Related_to_person int,
foreign key (Related_to_person) references User_(User_ID)
);

create table Type_(
Type_ID SERIAL primary key,
Type_title char(20)
);


create table Type_Buyable_item_(
Product_ID int,
Type_ID int,
foreign key (Product_ID) references Buyable_item_(Product_ID),
foreign key (Type_ID) references Type_(Type_ID),
primary key (Product_ID, Type_ID)
);

create table Order_Buyable_item_(
Order_ID int,
Product_ID int,
Amount int,
Favourited boolean,
foreign key (Order_ID) references Order_(Order_ID),
foreign key (Product_ID) references Buyable_item_(Product_ID),
primary key (Order_ID, Product_ID)
);

create table User_Buyable_item_(
User_ID int,
Product_ID int,
Order_in_list int,
foreign key (Product_ID) references Buyable_item_(Product_ID),
foreign key (User_ID) references User_(User_ID),
primary key (User_ID, Product_ID)
);




