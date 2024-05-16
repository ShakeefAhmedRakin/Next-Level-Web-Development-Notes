{
    const createArrayWithGeneric = <T>(params: T): T[] => {
        return [params]
    }

    const arrayOfString = createArrayWithGeneric<string>('Bangladesh')
    const arrayOfObject = createArrayWithGeneric<object>({name: 'Rakin'})
    console.log(arrayOfString,arrayOfObject);


    type UserInfo = {name: string;age:number}
    const arrayOfObjectUserInfo = createArrayWithGeneric<UserInfo>({name: 'Rakin',age:25})
    console.log(arrayOfObjectUserInfo);
}