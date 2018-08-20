import { Name, Person, Database, Error } from './interfaces'

export class CompanyDatabase {
    public database: Database

    constructor(public newCompanyName: string){
        this.database = {
            company: newCompanyName,
            people: [],
        }
    }

    changeCompanyName = (newCompanyName: string): Database => {
        this.database = { ...this.database, company: newCompanyName } 
        return null
    }

    addPerson = (newPerson: Person): Error | null => {
        this.database = { ...this.database, people: [...this.database.people, newPerson] }
        return null
    }
    
    isFoundInPersonArray = (inputName: Person) => {
        return this.database.people
            .find((person: Person) => 
            person.name.firstName === inputName.name.firstName && person.name.lastName === inputName.name.lastName) != undefined 
    }

//instead of input name as a string, pass in as an object and destructure
//write testing 

    deletePerson = (inputName: Person): Error | null => {
        const newPeopleArray: Array<Person> = [...this.database.people]
            .filter((person: Person ) => person.name.firstName != inputName.name.firstName)
        this.isFoundInPersonArray(inputName) 
            ? { ...this.database, people: newPeopleArray } 
            : false  
        return null
    }

    editPersonName = (inputName: Person, newFullName: string): Error | null => {
        const [newFirstName, newLastName]: ReadonlyArray<string> = newFullName.split(" ")
        const changedPerson = this.database.people.map((person: Person) => (
            person.name.firstName === inputName.name.firstName
            ? { ...person, name: { firstName: newFirstName, lastName: newLastName } } : person ))
        this.isFoundInPersonArray(inputName) 
            ? { ...this.database, people: changedPerson } 
            : false
        return null
    }

    editPersonExp = (inputName: Person, exp: number): Error | null => {
        const [firstName, lastName]: ReadonlyArray<string> = [inputName.name.firstName, inputName.name.lastName]
        const changedExp = this.database.people.map((person: Person) => (person.name.firstName === firstName && person.name.lastName === lastName && person.job 
            ? { ...person, job: { ...person.job, yearsExp: exp } } 
            : person))
        this.isFoundInPersonArray(inputName) 
            ? { ...this.database, people: changedExp }
            : false  
        return null
    }

    getJobs = (): Array<string> | null => {
        const jobArray: ReadonlyArray<string> = this.database.people
            .filter((person: Person) => person.job)
            .map((person: Person) => person.job.title)
        const setOfJobs = new Set(jobArray)
        return Array.from(setOfJobs) || null
    }

    getTotalNumberOfSiblings = (): number => (
        this.database.people
            .map((person: Person): ReadonlyArray<Name> => person.siblings)
            .reduce((acc: number, currentValue: ReadonlyArray<Name>): number => 
                acc + currentValue.length, 0)
    )
}
