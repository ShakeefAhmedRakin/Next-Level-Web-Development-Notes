"use strict";
{
    const createArrayWithGeneric = (params) => {
        return [params];
    };
    const arrayOfString = createArrayWithGeneric('Bangladesh');
    const arrayOfObject = createArrayWithGeneric({ name: 'Rakin' });
    console.log(arrayOfString, arrayOfObject);
    const arrayOfObjectUserInfo = createArrayWithGeneric({ name: 'Rakin', age: 25 });
    console.log(arrayOfObjectUserInfo);
}
