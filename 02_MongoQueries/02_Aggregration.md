## What Is Aggregation ?

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

## $group ( For grouping unique field values )

```C++
db.test.aggregate([
    // Stage 1 ( $name for referring to field names )
    { $group : {_id : "$gender"}}
])
```
