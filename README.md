# MarcoPolo-Travels
Project made during Introduction to Internet Applications course and developed for the Databases course at AGH.

## About project
MarcoPolo Travels is a web application that allows you to browse, filter, reserve and then purchase trips, as well as view your purchase history or cart. It also allows you to comment and rate purchased trips and view opinions left by other users. To make it easier to explore all the functionalities, you can create your own trips and add new users and switch between them without any authorization and authentication (several of them with some purchase history are already created and u can "use" them at the start).

## Configuration
clone:
```console
git clone https://github.com/marek-02/MarcoPoloTravels-web-aplication
```
install backend packages:
```
cd MarcoPoloTravels-web-aplication\backend
npm install 
```
install frontend packages:
```
cd MarcoPoloTravels-web-aplication\frontend
npm install 
```
start backend:
```
cd MarcoPoloTravels-web-aplication\backend
node express\server.js
```
start frontend:
```
cd MarcoPoloTravels-web-aplication\frontend
ng serve
```
create database in MongoDB:
```console
mongorestore [path to repository]\MarcoPoloTravels-web-aplication\backend\mongo_dumped
```
or u can manually create a database and import data from json files placed in the MarcoPoloTravels-web-aplication\backend\mongo_data folder

### Note
The project and sample data were created around May 2023, so if you use this application later (especially after October 2023), it is possible that all trips are already "archived" and you can only view their details and opinions, but you cannot reserve or buy them. To "repair" this (and see full potential of this application), you can manually change the tour dates in the tour json files or in the downloaded MongoDB database, or create your own tours and operate on them.