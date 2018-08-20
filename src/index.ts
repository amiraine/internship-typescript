import { CompanyDatabase }  from "./company-database"
import { Name, Person, Database, Error } from "./interfaces"


// Aron sample problem
//create person database name: {firstname: lastname: , job? not required, years experience (this is a string), siblings (this is an array with the same data structure as that)}

const aPerson: Person = {
    name: {
        firstName: "Lior",
        lastName: "Hall",
    },
    job: {
        title: "Deli Clerk",
        yearsExp: 3,
    },
    siblings: [
        {
            firstName: "Bob",
            lastName: "Hall"
        },
    ],
}

const notFound: Error = {
    text: "Person not found"
}

const searchedName: Name = {
    firstName: "Lior",
    lastName: "Hall"
}


const newDatabase = new CompanyDatabase("coffee")
console.log(newDatabase.database)

newDatabase.changeCompanyName("Hello World")
console.log(newDatabase.database)

newDatabase.addPerson(aPerson)
console.log(newDatabase.database, newDatabase.database.people)

newDatabase.deletePerson(aPerson)
console.log(newDatabase.database.people)

newDatabase.editPersonName(aPerson, "newName, something")
console.log(newDatabase.database.people)

newDatabase.editPersonExp(aPerson, 10)
console.log(JSON.stringify(newDatabase.database.people, null, 4))




// const personOne: Person = {
//     name: {
//         firstName: "Ami",
//         lastName: "Cooper",
//     },
//     job: {
//         title: "Intern",
//         yearsExp: 0,
//     },
//     siblings: [
//         {
//             firstName: "Alison",
//             lastName: "Dyche",
//         },
//     ],
// }

// const personTwo: Person = {
//   name: {
//     firstName: "Bryce",
//     lastName: "Craig",
//   },
//   siblings: [
//     {
//       firstName: "Brandon",
//       lastName: "Craig",
//     },
//     {
//       firstName: "Evan",
//       lastName: "Craig",
//     },
//   ],
// }



// const newPerson: Person = {
//   name: {
//     firstName: "Tom",
//     lastName: "Cruise",
//   },
//   job: {
//     title: "Actor",
//     yearsExp: 30,
//   },
//   siblings: [
//     {
//       firstName: "Evan",
//       lastName: "Cruise",
//     },
//   ],
// }

// const largeData: Database = {
//     company: "Apple Inc.",
//     people: [
//         personOne,
//         personTwo,
//         newPerson,
//         personOne,
//         personOne,
//         personTwo,
//     ],
// }

// const database: Database = {
//     company: "Olio Apps",
//     people: [
//         personOne,
//         personTwo,
//     ],
// }
// console.log(database);

// write a function that will take in the database and then it will return the database and also takes new company name, make this immutable, spread operator liberally
//takes db, takes newcompany, return

const changeCompanyName = (db: Database, newName: string): Database => ({ ...db, company: newName })

// console.log("This is the basic database", database);
// console.log("This is the changeCompanyName function", changeCompanyName(database, "New Name"));


//write function that will take in db, add person and return db. use spread operator. Add two people using this function.

const addPerson = (db: Database, newPerson: Person): Database => ({ ...db, people: [...db.people, newPerson] })

// const database1 = addPerson(database, newPerson)

// const database2 = addPerson(database1, newPerson)


// console.log("This is the addPerson function called twice to add two users ", database2);
// console.log("this is the database", database);

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

// console.log("This is the deletePerson function", deletePerson("Ami", database))

// if you use JSON.stringify on the database instead of the spread operator, then you don't get the readonly error.
// if person not found, return error 
const editPersonName = (inputName: string, newFullName: string, db: Database): Database => {
    const [newFirstName, newLastName] = newFullName.split(" ")
    const changedPerson = db.people.map((person: Person) => (
        person.name.firstName === inputName 
        ? { ...person, name: { firstName: newFirstName, lastName: newLastName } } : person ))
    return { ...db, people: changedPerson }
}

// console.log("edit person function", editPersonName("Ami", "Bob Roberts", database))

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

// console.log("person experience with job", editPersonExp("Ami", 10, database))
// console.log("person experience without job", editPersonExp("Bryce", 10, database))

// write a function that will create an array of unique jobs within the database objects


const getJobs = (db: Database): Array<string> => {
    const newDb = { ...db }
    const jobArray = newDb.people
        .filter((person: Person) => person.job)
        .map((person: Person) => person.job.title)
    const setOfJobs = new Set(jobArray)
    return Array.from(setOfJobs)
}

// console.log(getJobs(largeData))

// write function to get total number of siblings for all person objects in the database.

const getTotalNumberOfSiblings = (db: Database): number => (
    db.people
        .map((person: Person): ReadonlyArray<Name> => person.siblings)
        .reduce((acc: number, currentValue: ReadonlyArray<Name>): number => 
            acc + currentValue.length, 0)
)
   
// console.log("number of siblings across database", getTotalNumberOfSiblings(largeData));

// create a class for the database that uses all of these functions as methods 

const newDb = new CompanyDatabase("company");

console.log(newDb);

