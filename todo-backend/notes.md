1) npm init
2) npm i express nodemon mongoose
3) src folder index.js
4) require dependencies
5) execute express (app)
6) listen to server

MVC: React

Model: How does the data look
View : How you use that data
Controller : How you mutate Model Data to View Data

Q:[1,4,3,2] <--MOdel
A:[] <-- View (ASC) ControllerASC
A:[] <-- View (DESC) ControllerDESC

MongoDB is NoSQL -> Document Database/No Structure

Users: _id
  db.users.insertOne({age:2,email:a});
  db.users.insertOne({name:'Mr. X',email:a});
  db.users.insertOne({});

CrikBuzz: MongoDB

Team:
   Name:
   Members:

Can't create a system where nothing is important
Structure of data is important

SQL schemas  --> doesn't have customization options like mongoDB ??s

What is Schema? 
   Movie:
       title: String
       cast: [String]
       posterImageURL: string
       ratings: Number
       description: String
       trailerURL: String
       releaseDate: Date,

User   Blog
A       4
B       1
C       1
D       0

USer-> Blog = One to many
One - One
One - Many
Many - One
Many - Many

User -> Blog = 1-n
Blog -> User = n-1

One to One 

create Schema
create routes
   add middleware for route
fix imports.
add ref in blog schema for author -> user


.env or environment variables

