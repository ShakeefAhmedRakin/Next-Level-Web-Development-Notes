{

    interface Developer<T,X=null> {
        name: string;
        computer : {
            brand :string;
            model :string;
            releaseYear: number;
        }
        smartWatch: T;
        bike? : X
    }


    const DeveloperOne : Developer<{
        brand : string;
        model : string,
        display : string
    }> = {
        name : "Rakin",
        computer : {
            brand : "ASUS",
            model : 'B123',
            releaseYear : 2019,
        },
        smartWatch : {
            brand : "Amazon",
            model : "AmazFit123",
            display : "OLED"
        }
    }
    const DeveloperTwo : Developer<{
        brand : string;
        model : string,
        display : string;
        WaterResistance : boolean
    },{
        name: string;
        CC : number
    }> = {
        name : "Rakin",
        computer : {
            brand : "ASUS",
            model : 'B123',
            releaseYear : 2019,
        },
        smartWatch : {
            brand : "Amazon",
            model : "AmazFit123",
            display : "OLED",
            WaterResistance : true
        },
        bike: {
            name : "Honda",
            CC: 250
        }
    }
}

