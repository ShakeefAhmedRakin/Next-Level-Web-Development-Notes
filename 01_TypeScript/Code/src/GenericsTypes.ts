{
 const rollNumbers: Array<number> = [3,4,5]   
 const names: Array<string> = ['1','2','3'] 



 type GenericArray = Array<number>

 const testMarks: GenericArray = [30,40,50]

//  This allows to make types dynamic.. 
 type DynamicArray<T> = Array<T>
 const rollNumbersDynamic: DynamicArray<number> = [3,4,5]   
 const namesDynamic: DynamicArray<string> = ['1','2','3'] 


 const usersArray : DynamicArray<{name:string,age:number, role?: string}> = [
    {
        name: "UserOne",
        age:24
    },
    {
        name : "UserTwo",
        age:22
    },
    {
        name :"UserThree",
        age : 10,
        role : 'admin'
    }
 ]

//  Generic Tuple
type GenericTuple <X,Y> = [X,Y]
const listNames: GenericTuple<string,string> = ['UserOne','UserTwo']

const userInfo : GenericTuple<number,{
    name: string,
    email:string
}> = [25000, {
    name : 'UserName',
    email :"test123@gmail.com"
}]




}