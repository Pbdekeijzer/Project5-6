drop table if exists User_Wishlist_ cascade;
drop table if exists Order_Buyable_item_ cascade;
drop table if exists Order_ cascade;
drop table if exists Buyable_item_ cascade;
drop table if exists User_ cascade;

create table User_ (
User_ID int primary key,
Privacy_wishlist boolean,
Adminbool boolean,
Wachtwoord varchar(20),
Email_address varchar(45)
);

create table Buyable_item_(
Product_ID int primary key,
Title varchar(50),
Description text,
In_stock int,
Price real,
Continent varchar(255),
Animal_class varchar(255),
Image_route varchar(255)
);

create table Order_(
Order_ID int primary key,
Time_of_order_placed timestamp,
Related_to_person int,
foreign key (Related_to_person) references User_(User_ID)
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