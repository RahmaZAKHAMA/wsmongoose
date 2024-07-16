//require express
const express=require ('express');
//create instance of express
const app = express();
//body parser middleware
app.use(express.json());
//PORT
require("dotenv").config();
const PORT=process.env.PORT ||5001
//server listening
app.listen(PORT,(err)=>{err?console.log(err):console.log(`Server listening at http://127.0.0.1:${PORT}`)})
//routes
app.get('/',(req,res)=>{res.send('hello');});
//database connection
 const connect=require('./dbconnection/dbconnect');
 connect()

 const mongoose = require("mongoose");
//create schema
 const personschema = new mongoose.Schema(
   {
     name: { type: String, required: true },
     age: Number,
     email: { type: String, required: true, unique: true },
     favouriteFoods: [String],
   },

   { collection: "person" },
   { timestamp: true }
 );
 //create model
 const Person = mongoose.model("Person", personschema);
 const person = {
   name: " Doe",
   age: 32,
   email: "john6611.doe@example.com",
   favouriteFoods: ["Pizza", "Burger"],
 };
   
 
  const persons = [
    {
      name: " zarahma",
      age: 33,
      email: "zarahma.doe@example.com",
      favouriteFoods: ["Pizza", "Burger"],
    },
    {
      name: "zaamira",
      age: 32,
      email: "zaamira@example.com",
      favouriteFoods: ["Pizza", "Burger"],
    },
  ];


  const createpersons = async (personsData) => {
    try {
      await Person.insertMany(personsData);
      console.log("Persons saved successfully");
    } catch (err) {
      console.log(err);
    }
  };
//createpersons(persons);
const createPerson = async (person) => {
  try {
    // Assuming 'Person' is your MongoDB collection reference
    //await Person.insertOne(person);
    await Person.create(person);
    console.log("Person saved successfully");
  } catch (err) {
    console.log(err);
  }
};

//createPerson(person);
///find person by name
FindPersonByName= async (name)=>{
  try {
    let person = await Person.find({name: name});
    if(person.length)
    {console.log(`person found ${name}`);

    }else{console.log("person not found");}
  } catch (error) {
    console.log(`error count find person ${name},${error}`)
  }
};
//FindPersonByName('zarahma');
FindPersonByfavouriteFood = async (food) => {
  try {
    let person = await Person.find({ favouriteFoods: food });
    if (person.length) {
      console.log(`person found ${person}`);
      console.log(`Number persons found is ${person.length}`);
    } else {
      console.log("person not found");
    }
  } catch (error) {
    console.log(`error count find person ${name},${error}`);
  }
};
//FindPersonByfavouriteFood('Pizza');
FindPersonById = async (id) => {
  try {
    let person = await Person.findById(id);
   
      console.log("person found");
    
  } catch (error) {
    console.log(`error count find person ${name},${error}`);
  }
};
//FindPersonById("6694db0dc5860ebbfb561365");
FindOnePerson = async (req) => {
  try {
    let person = await Person.findOne(req);

    console.log(`person found ${person}`);
  } catch (error) {
    console.log(`error count find person ${person},${error}`);
  }
};
//FindOnePerson({ age: { $gt: 30 } });

FindbyIdAndDelete = async (req) => {
  try {
    let person = await Person.findByIdAndDelete(req);

    console.log(`person deleted successfully ${person}`);
  } catch (error) {
    console.log(`error count find person ${person},${error}`);
  }
};
//FindbyIdAndDelete("6694db0dc5860ebbfb561365");

FindAll = async () => {
  try {
    let person = await Person.find();

    console.log(`person ${person}`);
  } catch (error) {
    console.log(`error count find person ${person},${error}`);
  }
};
//FindAll();

UpdatePerson = async (id) => {
  try {
   let person = await Person.findOneAndUpdate({_id: id}, {name:"ggg"});

    console.log(`person ${person}`);
  } catch (error) {
    console.log(`error count find person ${person},${error}`);
  }
};
//UpdatePerson("668fbc3c8dcfb29802c35757");

const FindAndSort = async () => {
  try {
    // Await the query to find people who like Pizza, sort by name, limit to 2, and exclude age
    let people = await Person.find({ favouriteFoods: "Pizza" })
      .sort("name")
      .limit(2)
      .select("-age");

    console.log("People who like Pizza:", people);
  } catch (error) {
    console.error("Error finding and sorting:", error);
  }
};

// Call the async function to execute the query
FindAndSort();
