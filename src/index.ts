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

const database: Database = {
    company: "Olio Apps",
    people: [
        personOne,
        personTwo,
    ],
}
// console.log(database);

// write a function that will take in the database and then it will return the database and also takes new company name, make this immutable, spread operator liberally
//takes db, takes newcompany, return

const changeName = (db: object, newName: string) => ({...db, company: newName})

console.log(database);
console.log(changeName(database,'New Name'));


//write function that will take in db, add person and return db. use spread operator. Add two people using this function.

const newPerson: Person = {
    name: {
        firstName: "Tom",
        lastName: "Cruise",
    },
    job: {
        title: "Actor",
        yearsExp: 30
    },
    siblings: [
        {
            firstName: "Evan",
            lastName: "Cruise",
        },
    ],
}

const addPerson = (db: Database, newPerson: Person) => {
    // let newDatabase = {...db}
    // newDatabase.people.push(newPerson)
    // return newDatabase;
    // this code does something weird to mutate the data? 
    return {...db, people: [...db.people, newPerson]}
}
const database1 = addPerson(database, newPerson)

const database2 = addPerson(database1, newPerson)

console.log(database2);
