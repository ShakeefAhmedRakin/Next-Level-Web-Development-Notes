{
  // FETCHING DATA EXAMPLE
  type Something = { something: string };
  const createPromise = (): Promise<Something> => {
    return new Promise<Something>((resolve, reject) => {
      const data: Something = { something: "Data Received." };
      if (data) {
        resolve(data);
      } else {
        reject("Failed To Receive Data.");
      }
    });
  };

  const showData = async (): Promise<Something> => {
    const data: Something = await createPromise();
    console.log(data);
    return data;
  };

  showData();

  //  ACTUAL DATA FETCHING

  type Todo = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  };

  const getTodo = async (): Promise<Array<Todo>> => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const data = await res.json();
    console.log(data);
    return data;
  };

  getTodo();
}
