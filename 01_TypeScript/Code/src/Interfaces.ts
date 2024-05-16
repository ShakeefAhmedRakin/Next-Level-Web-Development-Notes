{

    type User1 = {
        name: string;
        age:number
    }

    interface User2 {
        name: string;
        age:number
    }

    // Intersection ( Type Aliasing ) Using Interfaces (You can also mix and match types and interfaces while extending)
    interface UserWithRole extends User2 {
        role: string
    }

    const user2 : UserWithRole = {
        name: "Andy",
        age: 24,
        role : 'admin'
    }

    // Interface Arrays ( array of numbers )
    interface Rolls {
        [index:number] : number
    }

    // Interface Functions ( Add )
    interface Add {
        (num1:number, num2:number) : number
    }

    // Use type aliases for arrays, functions, primitives etc.
    //  Use Interfaces for objects

}