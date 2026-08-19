let todos = [
  {
    title: "hello world",
    isDone: false,
  },
  {
    title: "hool hiih",
    isDone: false,
  },
  {
    title: "hool hiih 2",
    isDone: false,
  },
  {
    title: "hool hiih 3",
    isDone: false,
  },
  {
    title: "hool hiih 4",
    isDone: false,
  },
  {
    title: "hool hiih 5",
    isDone: false,
  },
];

todos[1].isDone = true;

function changeIsDone(index) {
  todos[index].isDone = true;
}

function createTodo(title) {
  todos.push({ title: title, isDone: false });
}

function removeTodo(index) {
  let newArray = [];
  for (let i = 0; i < todos.length; i++) {
    if (i === index) {
      console.log("skipped");
    } else {
      newArray.push(todos[i]);
    }
  }
  todos = newArray;
}

function filterByIsDone() {
  let done = [];
  let incomplete = [];
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].isDone === true) {
      done.push(todos[i]);
    } else {
      incomplete.push(todos[i]);
    }
  }
  console.log(done, incomplete);
  console.log("done tasks : ", done.length);
  console.log("incomplete tasks : ", incomplete.length);
}

changeIsDone(3);
createTodo("hicheel orno");
changeIsDone(todos.length - 1);
removeTodo(todos.length - 3);
filterByIsDone();
console.log(todos);
