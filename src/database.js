const { MongoClient } = require("mongodb");

const url = "mongodb+srv://pradeep4458:Amazon%4012345@namastenode.ex2koex.mongodb.net/"

const client = new MongoClient(url);

const dbName = "HelloWorld";

async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection("User");

    const data ={
        firstname : "Saurabh",
        lastname : "Barnwal",
        city : "Bettiah",
        phoneno : "124312321"
    }
  
    const insertResult = await collection.insertMany([data]);
    console.log('Inserted documents =>', insertResult);

    // the following code examples can be pasted here...
    const findResult = await collection.find({}).toArray();
    console.log('Found documents =>', findResult);

  
    return "done";
  }

  main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());