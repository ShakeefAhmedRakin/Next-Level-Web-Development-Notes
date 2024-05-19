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
