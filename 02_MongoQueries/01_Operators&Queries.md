## Why MongoDB?

- Scalable and high-performance.
- Document-oriented
- Cost effective.
- Open source community.

## Installing MongoDB Compass & MongoShell

To install MongoDB Compass and MongoShell, follow these steps:

- Go to [MongoDB Community Server download page](https://www.mongodb.com/try/download/community) and download MongoDB Community Server.
- Open MongoDB Compass and connect. You can use MongoDB Compass to manage databases and also use MongoShell to write queries related to everything databases.

## Creating a database and collection

```typescript
// To Point To A Non-Existing Database
> use practice
> db.createCollection('test')
```

## MongoDB Queries

To get started go to this [GitHub Repository](https://github.com/Apollo-Level2-Web-Dev/mongodb-practice/blob/main/practice-data.json) **(Provided By [Programming Hero](https://www.programming-hero.com/))** to download a practice json and insert the data into the test collection.

### InsertOne & InsertMany [CREATE]

```C++
// Insert One Data
> db.test.insertOne({ object })
// Insert Many Data
> db.test.insertMany([{ object }, { object }])
```

### FindOne And Find [READ]

```C++
// Find One Data With Queries (Returns A Single Object)
db.test.findOne({ age: 18 })
db.test.findOne({ company: "Demimbu" })
// Find Many Data With Queries (Returns An Array Of Objects)
db.test.find({ gender: "Female" })
```

#### Field Filtering

```C++
// Return Data Based On Queries But With The Specified Properties Only [EXCLUDING ID]
db.test.findOne({ age: 18 }, { gender: 1, name: 1 })
db.test.find({ age: 18 }, { gender: 1, name: 1 })

// Can Also Be Done With 'projection' ( DOES NOT WORK WITH FindOne )
db.test.find({ age: 18 }).projection({ name: 1, gender: 1 })
```

#### Sort

```C++
// Returns Data Sorted Based On Age In Ascending Order
db.test.find().sort({age : 1})

// Returns Data Sorted Based On Age In Descending Order
db.test.find().sort({age : -1})
```

#### Using MongoDB Operators

```C++
// Finding Documents Where Gender is Equal To Female
db.test.find({ gender: { $eq: "Female" } })

// Finding Documents Where Gender is Not Equal To Female
db.test.find({ gender: { $ne: "Female" } })

// Finding Documents Where Age is Greater Than 18
db.test.find({age: {$gt : 18}})

// Finding Documents Where Age is Greater Than OR Equal To 18
db.test.find({age: {$gte : 18}})

// You Can Stack Multiple Operators Along With Multiple Queries
db.test.find({age: {$gt : 18, $lt :30}})
db.test.find({gender: {$eq : "Male"}, age: {$gt : 18, $lt :30}})


// You Can Use Multiple Values To Match With Using the $in Operator
// Returns Data Based On Age ( 18 or 20 or 22...)
db.test.find({age: {$in : [18,20,22,24]}})

// Or The Opposite..
db.test.find({age: {$nin : [18,20,22,24]}})

// So, Combining All Of The Above, We Can Write Complex Queries Like So..
db.test.find({gender: {$eq : "Female"}, age: {$gt : 18, $lt :30},interest: {$in : ['Cooking','Writing']}})

// Use $and [Explicit] Operator To Stack Operators On Same Or Multiple Properties
db.test.find({$and : [{age : {$gt: 0}},{age : {$lte : 18}}]})
db.test.find({$and : [{gender: {$eq : "Male"}}, {age : {$gt: 0}},{age : {$lte : 18}}]})

// Same For $or [Explicit]
db.test.find({$or : [{interests: "Traveling" }, {interests: "Cooking"}]})

// Accessing Nested Properties
db.test.find({$or : [{"skills.name": "JAVASCRIPT" }, {"skills.name": "PYTHON"}]})
// The Above Query Can Be Done Using $in [Implicit]
db.test.find({"skills.name" : {$in : ["JAVASCRIPT","PYTHON"]}})


// Returns Documents Where The Age Property Exists Or Does Not Exist
db.test.find({age: {$exists : true}})
db.test.find({age: {$exists : false}})

// Returns Documents Where The Age Property Has String Type Property
db.test.find({age : {$type: "string"}})
db.test.find({company : {$type: "null"}})

// Returns Documents Where The Friends Property Has Length Of 4
db.test.find({friends: {$size: 4}})

// Returns Documents Where The 'Cooking' Is In 2nd Index Of Array
db.test.find({"interests.2" : "Cooking"})

// Returns Documents Where The Interests Match Regardless Of Index Positions
db.test.find({interests : { $all :["Travelling","Gaming","Cooking"]}})

// Returns Documents With Matching Nested Properties
db.test.find({skills : {$elemMatch : {name:"JAVASCRIPT",level : "Intermidiate"}}})
```

### UpdateOne [UPDATE]

```C++
// Directly Updates The Value Of A Property Of A Document
db.test.updateOne({_id: ObjectId('6406ad63fc13ae5a40000065')},{$set : {
    age : 80
}})
db.test.updateOne({_id: ObjectId('6406ad63fc13ae5a40000065')},{$set : {
    "address.city" : "Dhaka",
    "address.country" : "Bangladesh"
}})

// Directly Adds The Value To Property's Array Of A Document [Use Only For Arrays & Objects] NO DUPLICATES
db.test.updateOne({_id: ObjectId('6406ad63fc13ae5a40000065')},{$addToSet : {
    interests : "Gaming"
}})


// Directly Add Multiple Values To Property's Array Of A Document [Use Only For Arrays] NO DUPLICATES
db.test.updateOne({_id: ObjectId('6406ad63fc13ae5a40000065')},{$addToSet : {
    interests : {$each : ['Cooking','Driving']}
}})

// Directly Add Multiple Values To Property's Array Of A Document [Use Only For Arrays] ALLOWS DUPLICATES
db.test.updateOne({_id: ObjectId('6406ad63fc13ae5a40000065')},{$push : {
    interests : {$each : ['Cooking','Driving']}
}})

// Removes The Property Of A Document
db.test.updateOne({_id: ObjectId('6406ad63fc13ae5a40000065')},{$unset : {
    age : 1
}})

// Removes Last Index Of Array
db.test.updateOne({_id: ObjectId('6406ad63fc13ae5a40000065')},{$pop : {friends: 1}})

// Removes First Index Of Array
db.test.updateOne({_id: ObjectId('6406ad63fc13ae5a40000065')},{$pop : {friends: -1}})

// Removes Specified Item From Array
db.test.updateOne({_id: ObjectId('6406ad63fc13ae5a40000065')},{$pull : {friends: "Andy"}})

// Removes Multiple Specified Items From Array
db.test.updateOne({_id: ObjectId('6406ad63fc13ae5a40000065')},{$pullAll : {friends: ["Andy","Rakin"]}})

// Updating Array Of Objects
// This Changes The Value Of The First Matched Object ( Using Biology) In The Array Of Objects TO CSE
db.test.updateOne({_id: ObjectId('6406ad63fc13ae5a40000065'), "education.major" : "Biology"}, {
    $set : {
        "education.$.major" : "CSE"
    }
})

// Incrementing And Decrementing
db.test.updateOne({_id: ObjectId('6406ad63fc13ae5a40000065')},{$inc : {age : 1}})
db.test.updateOne({_id: ObjectId('6406ad63fc13ae5a40000065')},{$inc : {age : -1}})
db.test.updateOne({_id: ObjectId('6406ad63fc13ae5a40000065')},{$inc : {age : 5}})
```

### Delete [DELETE]

```C++
// Delete Document Based On Query Matching
db.test.deleteOne({_id: ObjectId('6406ad63fc13ae5a40000065')})

// Delete Collection From DB
db.createCollection('postsCollection')
db.postsCollection.drop({writeConcern: {w:1}})
```

## Practice Tasks

- **Find all documents in the collection where the age is greater than 30, and only return the name and email fields.**

  ```C++
    db.test.find({age : {$gt : 30}}).projection({name:1,email:1})
  ```

- **Find documents where the favorite color is either "Maroon" or "Blue."**
  ```C++
    db.test.find({favoutiteColor: {$in : ['Maroon','Blue']}})
  ```
- **Find all documents where the skill is an empty array.**
  ```C++
    db.test.find({skills: []})
  ```
- **Find documents where the person has skills in both "JavaScript" and "Java."**
  ```C++
    db.test.find({$and : [{'skills.name':'JAVA'},{'skills.name':"JAVASCRIPT"}]})
  ```
- **Add a new skill to the skills array for the document with the email "amccurry3@cnet.com". The skill is {"name": "Python" , "level": "Beginner" , "isLearning": true} Note: At first, you will have to insert the given email then add the skill mentioned above**

  ```C++
    db.test.updateOne({email:"amccurry3@cnet.com"},{
       $addToSet : { skills : {"name": "Python" , "level": "Beginner" , "isLearning": true}}
    })
  ```

- **Add a new language "Spanish" to the list of languages spoken by the person.**
  ```C++
    db.test.updateOne({email:"amccurry3@cnet.com"},{
       $addToSet : { languages : "Spanish"}
    })
  ```
- **Remove the skill with the name "Kotlin" from the skills array.**
  ```C++
    db.test.updateOne({email:"amccurry3@cnet.com"},{ $pull: { skills: { name: "KOTLIN" }}})
  ```
