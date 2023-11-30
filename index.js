require('dotenv').config();
const express = require('express');

const MongoClient = require('mongodb').MongoClient;

const app = express();
// const port = process.env.PORT || 3000;

const uri = `mongodb+srv://${process.env.user_name}:${process.env.user_password}@clusterp1.t6imrla.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true });

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

(async () => {
  try {
    await client.connect()
    console.log('Connected to the database!');

    // this allows you to add a SINGLE documents at a time
    const collection = client.db('test').collection('students');

    collection.insertOne({
      name: 'Freddy Teddy',
      nick_name: 'Teddy-Bear',
      age: 10,
      grade: 'A',
      teacher: 'Smith'
    },

      (err, result) => {
        if (err) {
          console.error(err);
          return;
        }

      });



    // // this allows you to add multiple documents at a time, define your collection, call it at the end 
    // const collection = client.db('test').collection('students');
    // const documents = [
    //   {
    //     name: 'Freddy Teddy',
    //     nick_name: 'Teddy-Bear',
    //     age: 13,
    //     grade: 'A',
    //     teacher: 'Smith'
    //   },
    //   {
    //     name: 'Wendy Zoop',
    //     nick_name: 'ZooZoo',
    //     age: 14,
    //     grade: 'A',
    //     teacher: 'Smith'
    //   }
    // ];

    // const result = await collection.insertMany(documents);



    // Query documents
    const query = { teacher: 'Smith' };
    const cursor = collection.find(query);

    const queriedDocuments = await cursor.toArray();
    console.log('Queried Documents:', queriedDocuments);

  } catch (error) {
    console.log(error);

    console.log(`Inserted document into the collection`);
  }

})();

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});