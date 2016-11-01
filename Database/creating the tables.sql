drop table if exists Continent_Buyable_item_ cascade;
drop table if exists Order_Buyable_item_ cascade;
drop table if exists User_Wishlist_ cascade;

drop table if exists Continent_ cascade;
drop table if exists Order_ cascade;
drop table if exists Review_ cascade;
drop table if exists Buyable_item_ cascade;
drop table if exists User_ cascade;
drop table if exists Animal_class_ cascade;


create table User_ (
User_ID int primary key,
Credit float,
Privacy_wishlist boolean,
Street_number varchar(6),
Postal_code varchar(6),
First_name varchar(20),
Surname varchar(35),
Adminbool boolean,
Birthday date,
Wachtwoord varchar(20),
Email_address varchar(45)
);

create table Animal_class_(
Class_ID int primary key,
Class_name varchar(15)
);

create table Buyable_item_(
Product_ID int primary key,
Title varchar(50),
Description text,
In_stock int,
Price float,
Belongs_to_class int,
Image_route varchar(255),
foreign key (Belongs_to_class) references Animal_class_(Class_ID)
);

create table Review_(
Review_ID int primary key,
Title varchar(20),
Description text,
Stars int,
Part_of_product int,
Related_to_person int,
foreign key (Part_of_product) references Buyable_item_(Product_ID),
foreign key (Related_to_person) references User_(User_ID)
);

create table Order_(
Order_ID int primary key,
Time_of_order_placed timestamp without time zone,
Related_to_person int,
foreign key (Related_to_person) references User_(User_ID)
);

create table Continent_(
Continent_ID int primary key,
Continent_title varchar(20)
);


create table Continent_Buyable_item_(
Product_ID int,
Continent_ID int,
foreign key (Product_ID) references Buyable_item_(Product_ID),
foreign key (Continent_ID) references Continent_(Continent_ID),
primary key (Product_ID, Continent_ID)
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

create table User_Wishlist_(
User_ID int,
Product_ID int,
Order_in_list int,
foreign key (Product_ID) references Buyable_item_(Product_ID),
foreign key (User_ID) references User_(User_ID),
primary key (User_ID, Product_ID)
);

insert into User_(Credit, Privacy_wishlist, Street_number, Postal_code, First_name, Surname, Adminbool, Birthday, Wachtwoord, Email_address) values (4.50, true, '46', '4646HR', 'Timo', 'van Werkhoven', true, '08/04/1998', 'W8woord', 'nope@hotmail.com');
insert into Animal_class_(Class_name) values ('Mammal'), ('Fish');
insert into Buyable_item_(Title, Description, In_stock, Price, Belongs_to_class, Image_route) values ('Cat','It looks like im an mammal, but im not', 3, 400, 2, 'c.drive.image.school.project.catfish'), ('Giraffe','Im a very high animal, yellow and brown', 0, 800, null, 'c.github.image.giraffe');
--PROBLEM: getting Animal_class_.Class_ID to insert into Buyable_item_.Belongs_to_class, must be going via a different query.

insert into Review_(Title, Description, Stars, Part_of_product, Related_to_person) values ('I was misled','I thought it was a cat, but it was a fish',5,1,1);
insert into Order_(Time_of_order_placed, Related_to_person) values (CURRENT_TIMESTAMP, 1);
insert into Continent_(Continent_title) values ('Europe');
insert into Continent_Buyable_item_(Product_ID, Continent_ID) values (1,1);
insert into Order_Buyable_item_(Order_ID, Product_ID, Amount, Favourited) values (1,1, 4, true);
insert into User_Wishlist_(User_ID, Product_ID, Order_in_list) values (1,1,1);




select Buyable_item_.Title as Product_Title, Animal_class_.Class_name, User_.First_name, Review_.Title, Review_.Description
from Buyable_item_, Animal_class_, Review_, User_
where User_.First_name = 'Timo' AND User_.User_ID = Review_.Related_to_person AND Review_.Part_of_product = Buyable_item_.Product_ID AND Buyable_item_.Belongs_to_class = Animal_class_.Class_ID;


create table User_ (
User_ID int primary key,
Credit float,
Privacy_wishlist boolean,
Street_number varchar(6),
Postal_code varchar(6),
First_name varchar(20),
Surname varchar(35),
Adminbool boolean,
Birthday date,
Wachtwoord varchar(20),
Email_address varchar(45)
);

create table Animal_class_(
Class_ID int primary key,
Class_name varchar(15)
);

create table Buyable_item_(
Product_ID int primary key,
Title varchar(50),
Description text,
In_stock int,
Price float,
Belongs_to_class int,
Image_route varchar(255)
);

create table Review_(
Review_ID int primary key,
Title varchar(20),
Description text,
Stars int,
Part_of_product int,
Related_to_person int
);

create table Order_(
Order_ID int primary key,
Time_of_order_placed timestamp,
Related_to_person int
);

create table Continent_(
Continent_ID int primary key,
Continent_title varchar(20)
);


create table Continent_Buyable_item_(
Product_ID int,
Continent_ID int,
primary key (Product_ID, Continent_ID)
);

create table Order_Buyable_item_(
Order_ID int,
Product_ID int,
Amount int,
Favourited boolean,
primary key (Order_ID, Product_ID)
);

create table User_Wishlist_(
User_ID int,
Product_ID int,
Order_in_list int,
primary key (User_ID, Product_ID)
);
