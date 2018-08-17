class Student {
    fullName: string;
    constructor(public firstName: string, public middleInitial: string, public lastName: string){
        this.fullName = firstName + " " + middleInitial + " " + lastName
    }
}


let user = "Ami Cooper"

let userThree = new Student("Ami", "R.", "Cooper");
let newUser = { firstName: "Ami", lastName: "Cooper" }


interface Person {
    firstName: string
    lastName: string
}

interface NewPerson {
    firstName: string
    lastName: string
    middleInitial: string
}
function greeter(person: string){
    return "Hello, " + person
}

function newGreeter(person: Person){
    return "Hello, " + person.firstName + " " + person.lastName
}

function thirdGreeter(person: NewPerson){
    return "Hello, " + person.firstName + " " + person.middleInitial + " " + person.lastName
}

console.log(greeter(user))
console.log(newGreeter(newUser))
console.log(thirdGreeter(userThree))

/// more functions in typescript

function buildName(firstName: string, ...restOfName: string[]){
    return firstName + " " + restOfName.join(" ");
}

let employeeName = buildName("Ami", "m", "i", "C")
console.log(employeeName);
∂
/// using the ... notation to allow for infinite number of parameters which then get stored in an array

/// card picker

interface Card {
    suit: string
    card: number
}
interface Deck {
    suits: string[]
    cards: number[]
    createCardPicker(this: Deck): () => Card
}

let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    //The function explicitly specifies that its callee must be of the type Deck
    createCardPicker: function(this: Deck){
        return () => {
            let pickedCard = Math.floor(Math.random() * 52)
            let pickedSuit = Math.floor(pickedCard / 13)

            return { suit: this.suits[pickedSuit], card: pickedCard % 13 }
        }
    }
}

let cardPicker = deck.createCardPicker()
let pickedCard = cardPicker()

console.log("card: " + pickedCard.card + " of " + pickedCard.suit);

// This is written so that createCardPicker must be called on the Deck object. 'this' is of the type Deck and not 'any'

// practice arrow notation with typescript

let z = 100

const addToZ = (x: number, y: number) =>  x + y + z

let result = addToZ(2,3)

console.log(result)

// Aron sample problem
//create person database name: {firstname: lastname: , job? not required, years experience (this is a string), siblings (this is an array with the same data structure as that)}


interface Name {
    readonly firstName: string
    readonly lastName: string
}

interface Job {
    readonly title: string
    readonly yearsExp: number
}

interface Person {
    readonly name: Name
    readonly job?: Job
    readonly siblings: ReadonlyArray<Name>
}

interface Database {
    readonly company: string
    readonly people: ReadonlyArray<Person>
}

const personOne: Person = {
    name: {
        firstName: "Ami",
        lastName: "Cooper",
    },
    job: {
        title: "Intern",
        yearsExp: 0,
    },
    siblings: [
        {
            firstName: "Alison",
            lastName: "Dyche",
        },
    ],
}

const personTwo: Person = {
  name: {
    firstName: "Bryce",
    lastName: "Craig",
  },
  siblings: [
    {
      firstName: "Brandon",
      lastName: "Craig",
    },
    {
      firstName: "Evan",
      lastName: "Craig",
    },
  ],
}



const newPerson: Person = {
  name: {
    firstName: "Tom",
    lastName: "Cruise",
  },
  job: {
    title: "Actor",
    yearsExp: 30,
  },
  siblings: [
    {
      firstName: "Evan",
      lastName: "Cruise",
    },
  ],
}

const largeData: Database = {
    company: "Apple Inc.",
    people: [
        personOne,
        personTwo,
        newPerson,
        personOne,
        personOne,
        personTwo,
    ],
}

const database: Database = {
    company: "Olio Apps",
    people: [
        personOne,
        personTwo,
    ],
}
console.log(database);

// write a function that will take in the database and then it will return the database and also takes new company name, make this immutable, spread operator liberally
//takes db, takes newcompany, return

const changeName = (db: Database, newName: string): Database => ({ ...db, company: newName })

console.log("This is the basic database", database);
console.log("This is the changeName function", changeName(database, "New Name"));


//write function that will take in db, add person and return db. use spread operator. Add two people using this function.


const addPerson = (db: Database, newPerson: Person): Database => ({ ...db, people: [...db.people, newPerson] })

const database1 = addPerson(database, newPerson)

const database2 = addPerson(database1, newPerson)


console.log("This is the addPerson function called twice to add two users ", database2);
console.log("this is the database", database);

//write helper function that checks the person array within the database to see if the searched name matches a term.

const isFoundInPeopleArray = (db: Database, firstName: string, lastName: string): boolean => (
    db.people
        .find((person: Person) => 
        person.name.firstName === firstName && person.name.lastName === lastName) != undefined 
)

// create a function that will allow you to delete Person objects without using the delete keyword.
// create an error case

const deletePerson = (inputName: string, db: Database): Database => {
    const newPeopleArray: Array<Person> = [...db.people]
        .filter((person: Person ) => person.name.firstName != inputName)
    return { ...db, people: newPeopleArray }
}

console.log("This is the deletePerson function", deletePerson("Ami", database))

// if you use JSON.stringify on the database instead of the spread operator, then you don't get the readonly error.
// if person not found, return error 
const editPersonName = (inputName: string, newFullName: string, db: Database): Database => {
    const [newFirstName, newLastName] = newFullName.split(" ")
    const changedPerson = db.people.map((person: Person) => (
        person.name.firstName === inputName 
        ? { ...person, name: { firstName: newFirstName, lastName: newLastName } } : person ))
    return { ...db, people: changedPerson }
}

console.log("edit person function", editPersonName("Ami", "Bob Roberts", database))

// write a function that will allow you to edit a person's job experience. 
// add error cases
// make function take full name as a string.
// write case if db.people.name != name

const editPersonExp = (name: string, exp: number, db: Database): Database | false => {

const changedExp = db.people.map((person: Person) => (person.name.firstName === name && person.job 
        ? { ...person, job: { ...person.job, yearsExp: exp } } 
        : person))
    return { ...db, people: changedExp } 
}

console.log("person experience with job", editPersonExp("Ami", 10, database))
console.log("person experience without job", editPersonExp("Bryce", 10, database))

// write a function that will create an array of unique jobs within the database objects


const getJobs = (db: Database): Array<string> => {
    const newDb = { ...db }
    const jobArray = newDb.people
        .filter((person: Person) => person.job)
        .map((person: Person) => person.job.title)
    const setOfJobs = new Set(jobArray)
    return Array.from(setOfJobs)
}

console.log(getJobs(largeData))

// write function to get total number of siblings for all person objects in the database.

const getTotalNumberOfSiblings = (db: Database): number => (
    db.people
        .map((person: Person): ReadonlyArray<Name> => person.siblings)
        .reduce((acc: number, currentValue: ReadonlyArray<Name>): number => 
            acc + currentValue.length, 0)
)
   
console.log("number of siblings across database", getTotalNumberOfSiblings(largeData));


