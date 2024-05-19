# Table of Contents

1. [Aggregation](#aggregation)
   1. [Basic Stages & Operators](#basic-stages--operators)
      1. [$match](#match--find-equivalent)
      2. [$project](#project--project-equivalent)
      3. [$addFields](#addfields--for-modifying-documents-before-sending)
      4. [$out](#out--for-creating-new-collection)
      5. [$merge](#merge--for-merging-with-current-collection)
      6. [$group](#group--for-grouping-unique-field-values)
      7. [$unwind](#unwind--for-grouping-unique-documents-on-multiple-fields-non-primitive-values)
      8. [$bucket](#bucket--creating-multiple-groups-based-on-boundaries)
      9. [$facet](#facet--for-creating-multiple-pipelines)
2. [Embedding & Referencing](#embedding--referencing)
   1. [$lookup](#lookup--to-get-referenced-object-details)
3. [Indexing](#indexing)
   1. [COLLSCAN vs IXSCAN](#collscan-vs-ixscan)
   2. [Query Statistics](#query-statistics)
   3. [Indexing Fields](#indexing-fields)
   4. [Problems with Indexing](#problems-with-indexing)
   5. [Removing Indexing in Fields](#removing-indexing-in-fields)
   6. [Ascending or Descending? and Multiple Field Indexing](#ascending-or-descending-and-multiple-field-indexing)
   7. [Text Indexing](#text-indexing--used-for-fields-where-large-strings-are-stored)
4. [Practice Tasks](#practice-tasks)

# What Is Aggregation ?

In MongoDB, aggregation refers to the process of transforming and combining documents in a collection to perform analytics and obtain valuable insights. It involves using an aggregation pipeline, which is a series of stages that documents pass through sequentially. Each stage performs a specific operation on the data, such as filtering, grouping, sorting, or computing aggregations, allowing for powerful and flexible data processing.

```C++
db.collection.aggregate (
    [
        // stage 1
        {queries},
        // stage 2
        {queries},
        // stage 3
        {queries}
    ]
)

// Aggregation Framework
input -> $match -> $group -> $sort -> output
```

# Basic Stages & Operators

## $match ( .find() Equivalent )

```C++
db.test.aggregate([
    // Stage 1
    { $match : { gender: "Male", age : { $lt : 30  }}}
])
```

## $project ( .project Equivalent)

```C++
// Correct
db.test.aggregate([
    // Stage 1
    { $match : { gender: "Male", age : { $lt : 30  }}},
    // Stage 2
    { $project : {gender : 1, age :1}}
])

// Incorrect as age is not sent to next stage where age is needed for matching. Will return [].
db.test.aggregate([
    // Stage 1
    { $project : {gender : 1, name :1}},
    // Stage 2
    { $match : { gender: "Male", age : { $lt : 30  }}}
])
```

## $addFields ( For modifying documents before sending )

```C++
db.test.aggregate([
    // Stage 1
    { $match : { gender: "Male", }},
    // Stage 2 ( Does Not Modify Collection Documents )
    { $addFields : { course : "level-2" , education : "medium" }},
    // Stage 3
    { $project : {course :1,education:1}}
])
```

## $out ( For creating new collection )

```C++
db.test.aggregate([
    // Stage 1
    { $match : { gender: "Male", }},
    // Stage 2 ( Does Not Modify Collection Documents )
    { $addFields : { course : "level-2" , education : "medium" }},
    // Stage 3
    { $project : {course :1,education:1}},
    // Stage 4 ( Creates collection under same DB and stores the aggregated data )
    { $out : "educationStatusCollection"}
])
```

## $merge ( For merging with current collection )

```C++
db.test.aggregate([
    // Stage 1
    { $match : { gender: "Male", }},
    // Stage 2 ( Does Not Modify Collection Documents )
    { $addFields : { course : "level-2" , education : "medium" }},
    // Stage 3
    { $project : {course :1,education:1}},
    // Stage 4 ( Creates collection under same DB and stores the aggregated data )
    { $merge : "test"}
])
```

## $group ( For grouping unique field values )

```C++
db.test.aggregate([
    // Stage 1 ( $name for referring to field names )
    { $group : {_id : "$gender"}}
])

db.test.aggregate([
    // Stage 1 ( $sum for count of instances of unique fields )
    { $group : {_id : "$address.country", count : { $sum : 1}}}
])

db.test.aggregate([
    // Stage 1 ( $push for showing array of values under unique fields )
    { $group : {_id : "$address.country",  count : { $sum : 1}, personName : { $push : "$name"}}}
])

db.test.aggregate([
    // Stage 1 ( $$ROOT for getting array of full documents )
    { $group : {_id : "$address.country", fullDocument : { $push : "$$ROOT"}}}
])

db.test.aggregate([
    // Stage 1 ( $$ROOT for getting array of full documents )
    { $group : {_id : "$address.country", fullDocument : { $push : "$$ROOT"}}},
    // Stage 2 ( For filtering specific fields in full document )
    { $project : { "fullDocument.name" : 1,"fullDocument.age" : 1  }}
])

// Calculating total salary across all documents
db.test.aggregate([
    // Stage 1 ( null for grouping all documents together and $sum for adding all $salary where $ is for referring to field name )
    { $group : {_id : null, totalSalary : { $sum : "$salary", $max : "$salary" }}}
])

// $max, $min, $avg, $project referring and $subtract
db.test.aggregate([
    // Stage 1
    { $group : {_id : null, totalSalary : { $sum : "$salary" }, maxSalary : { $max : "$salary"}, minSalary: { $min : "$salary"}, averageSalary : { $avg : "$salary"}}},
    // Stage 2 ( $name in $project for referring fields )
    { $project : {
        totalSalary: 1,
        maximumSalary : "$maxSalary",
        minimumSalary: "$minSalary",
        rangeMinMax : { $subtract : ["$maxSalary","$minSalary"] }
    }}
])
```

## $unwind ( For grouping unique documents on multiple fields non-primitive values )

```C++
db.test.aggregate([
    // Stage 1 ( $unwind for breaking down arrays before grouping )
    { $unwind : "$friends"},
    // Stage 2 ( Instance count of each name in friend's array )
    { $group : {_id : "$friends",count : { $sum : 1}}}
])

db.test.aggregate([
    // Stage 1 ( $unwind for breaking down arrays before grouping )
    { $unwind : "$interests"},
    // Stage 2 ( Count of interests for each distinct age group )
    { $group : {_id : "$age",interests : { $push : "$interests" }}}
])
```

## $bucket ( Creating multiple groups based on boundaries )

```C++
db.test.aggregate([
    // Stage 1 ( Defining group boundaries and output )
    { $bucket : {
        // Based On?
        groupBy : "$age",
        // Ranges (0-19, 20-39, 40-59, 60-79)
        boundaries : [20,40,60,80],
        // The Rest Outside Boundaries
        default : "80+ Age",
        // How to show? Count & Names of people per age group
        output : {
            count : { $sum : 1},
            people : {$push : "$name"}
        }
    }
    },
    // Stage 2 ( Ascending sort based on count )
    { $sort : {count : 1}}
])
```

## $facet ( For creating multiple pipelines )

```C++
// Syntax
db.test.aggregate([
    { $facet : {
        // Pipeline 1
        [ ],
        // Pipeline 2
        [ ],
        // Pipeline 3
        [ ],
    }}
])

// Example
db.test.aggregate([
    { $facet : {
        // Pipeline 1
        "uniqueFriendsCount":
        [
            // Stage 1
            {$unwind : "$friends"},
            // Stage 2
            {$group : {_id: "$friends", count : {$sum : 1}}}
        ],
        // Pipeline 2
        "uniqueGenderCount":
        [
            // Stage 1
            { $group : {_id: "$gender", count : {$sum : 1}}}
        ],
    }}
])
```

# Embedding & Referencing

Let's say you have a data that needs to be added to a collection but also needs to be added to an existing document in a another collection. Here, embedding is the latter but the problem is the size of the existing document will become too large eventually. So, referencing is used where instead a reference to a collection is stored instead of embedding the a whole document. Both embedding and referencing has their specific use cases.

**Embedding**

- One-to-One relation
- Frequently read data
- Atomic updates ( Updates on a single document )
- Reduced network load
- Small data size

**Referencing**

- One-to-Many relation
- Many-to-Many relation
- Frequently updated/inserted data
- Big data size
- Scalability
- Flexibility
- Reflective

Go to this [GitHub Repository](https://github.com/Apollo-Level2-Web-Dev/mongodb-practice/blob/main/practice-orders.json) ( Provided by Programming Hero) to download a json and store in 'orders' collection for practicing this concept.

Note : 'test' collection has user information

## $lookup ( To get referenced object details )

```C++
db.orders.aggregate([
    { $lookup : {
        // Collection name to lookup using userId from orders collection
        from : "test",
        // name of field in orders collection to use
        localField: "userId",
        // name of field in tests to match against
        foreignField : "_id",
        // Name of field where userInfo will be stored
        as: 'userInfo',
    }}
])
```

# Indexing

Indexing in MongoDB is used to improve query performance by allowing the database to quickly locate and access the data without scanning every document in a collection. Indexes support efficient query execution and can significantly speed up read operations, making them essential for optimizing database performance.

In MongoDB, **COLLSCAN** (collection scan) and **IXSCAN** (index scan) refer to different methods of searching through documents:

- **COLLSCAN (Collection Scan):** This operation scans every document in a collection to find those that match the query criteria. It is generally slower because it does not use any indexes, leading to higher resource usage and longer query times, especially with large collections.

- **IXSCAN (Index Scan):** This operation uses an index to find matching documents, scanning only the relevant portions of the index rather than the entire collection. IXSCAN is typically much faster and more efficient than COLLSCAN because it reduces the amount of data that needs to be examined.

Using indexes effectively helps ensure queries use IXSCAN instead of COLLSCAN, improving performance and reducing load on the database.

## Query Statistics

```C++
// Get statistics and info regarding the query
db.test.find({_id: ObjectId('6406ad63fc13ae5a40000065')}).explain()
// Get executionStats regarding the query
db.test.find({_id: ObjectId('6406ad63fc13ae5a40000065')}).explain('executionStats')
```

Here if you notice that it says 'IDHACK'. IDHACK in MongoDB is an optimization technique used for queries that filter by the `_id` field. When a query targets the `_id` field, MongoDB can use a highly efficient internal optimization called IDHACK to bypass the regular query planner and directly fetch the document. This results in faster query performance because the query planner doesn't need to perform a standard index scan or collection scan, making retrieval of documents by their unique `_id` very efficient. This is a default indexing used by mongoDB in case of `_id`.

```C++
// Get statistics and info regarding the query
db.test.find({_id: ObjectId('6406ad63fc13ae5a40000065')}).explain()
// Get executionStats regarding the query ( COLLSCAN as only _id is indexed by default in mongoDB )
db.test.find({email : "bgorgen4@gravatar.com" }).explain('executionStats')
```

Go this [GitHub Repository](https://github.com/Apollo-Level2-Web-Dev/mongodb-practice/blob/main/massive-data.json) ( Provided by ProgrammingHero ) to download a massive json file to learn how to index.

## Indexing Fields

```C++
// Indexing in ascending order on a field ( Check Indexes tab in mongoDBcompass/Atlas)
db.massiveData.createIndex({email: 1})

// Doing the same email query from before ( It will show IXSCAN )
db.massiveData.find({email : "bgorgen4@gravatar.com" }).explain('executionStats')
```

What's the difference? The same query would've taken you 4 ms to run using COLLSCAN but with indexing, it took 0-1ms. For a document with 11900 collections, this is a significant reduction and optimization in time.

### Problem with indexing

While indexing in MongoDB enhances query performance, creating too many indexes has several downsides:

1. **Increased Storage Requirements:** Each index requires additional storage space. Multiple indexes can significantly increase the size of the database, consuming more disk space.

2. **Slower Write Operations:** Every time a document is inserted, updated, or deleted, all relevant indexes need to be updated. This can slow down write operations (inserts, updates, and deletes) because the database has to maintain more indexes.

3. **Complexity in Index Management:** Managing a large number of indexes can become complex, making it harder to maintain and optimize the database. It can also complicate troubleshooting and performance tuning.

4. **Memory Usage:** Indexes consume memory (RAM) to be effective. Excessive indexing can lead to increased memory usage, potentially affecting the performance of the entire database if the available RAM is exceeded.

Balancing the number of indexes to optimize read performance without significantly impacting write performance and resource usage is crucial for maintaining an efficient database.

## Removing Indexing In Fields

```C++
db.massiveData.dropIndex({email: 1})
```

## Ascending or Descending? and Multiple Field Indexing &

```C++
// 9 milliseconds execution time
db.massiveData.find({gender : "male", age : 21}).explain('executionStats')
```

Now, should one do ascending or descending indexing? Think about the alphabets or numbers where A comes before B or 0 comes before 9. In a search, one would see A or 0 first. In case of indexing, a field should be indexed based on the frequency of queries done on a value for that field. Let's say for gender, 'male' is the most queried value. M comes after F in the alphabets, so in reverse, M would come first. So, the gender field should be indexed in a descending order. For age, let's say younger audiences are queried more frequently. So, age should be indexed in ascending order.

```C++
db.massiveData.createIndex({gender: -1, age : 1})

// 1 milliseconds execution time after indexing
db.massiveData.find({gender : "male", age : 21}).explain('executionStats')

// To Remove Indexing
db.massiveData.dropIndexes({gender: -1, age : 1})

// 12 milliseconds execution time after removing indexing
db.massiveData.find({gender : "male", age : 21}).explain('executionStats')
```

## Text Indexing ( Used for fields where large strings are stored )

```C++
// Text Indexing
db.massiveData.createIndex({about: 'text'})

// Searching based on Index created
db.massiveData.find({$text : { $search : "dolor"}})
```

# Practice Tasks

Use the massiveData collection.

- **Retrieve the count of individuals who are active (isActive: true) for each gender.**

```C++
db.massiveData.aggregate([
    {$match : {isActive : true} },
    {$group : { _id : '$gender', count : {$sum : 1} }},
])
```

- **Retrieve the names and email addresses of individuals who are active (`isActive: true`) and have a favorite fruit of "banana".**

```C++
db.massiveData.aggregate([
    {$match : {isActive : true, favoriteFruit : "banana" } },
    {$project : {name : 1,email : 1}}
])
```

- **Find the average age of individuals for each favorite fruit, then sort the results in descending order of average age.**

```C++
db.massiveData.aggregate([
    {$group: {_id:"$favoriteFruit", averageAge : { $avg : "$age"} }},
    {$sort : {averageAge:-1} }
])
```

- **Retrieve a list of unique friend names for individuals who have at least one friend, and include only the friends with names starting with the letter "W".**

```C++
db.massiveData.aggregate([
  { $unwind: "$friends" },
  {
    $match: {
      "friends.name": /^W/,
    },
  },
  {
    $group: {
      _id: "$_id",
      uniqueFriends: { $addToSet: "$friends.name" },
    },
  },
])
```

- **Use $facet to separate individuals into two facets based on their age: those below 30 and those above 30. Then, within each facet, bucket the individuals into age ranges and sort them by age within each bucket.**

```C++
db.massiveData.aggregate([
 {$facet: {
    below30 : [
        {$match : {age :{ $lt : 30}}},
        {$bucket: {
            groupBy: "$age",
            boundaries: [5,10,15,20, 25, 30],
            default: "Other",
            output: {
              names: { $push: "$name" },
            },
          }},
    ],
    above30 : [
        {$match : {age :{ $gte : 30}}},
        {$bucket: {
            groupBy: "$age",
            boundaries: [30, 35, 40, 45],
            default: "Other",
            output: {
              names: { $push: "$name" },
            },
          }},
    ]
 },
}
])
```

- **Calculate the total balance of individuals for each company and display the company name along with the total balance. Limit the result to show only the top two companies with the highest total balance.**

```C++
db.massiveData.aggregate([
    // $substr for removing '$' from balance(STRING) and then $toDouble for converting string of numbers only to double.
    {$group : {_id : "$company", totalBalance : {$sum : {$toDouble : {$substr: ["$balance",1,-1]}}}}},
    {$sort : {totalBalance : -1}},
    {$limit : 2}
])
```
