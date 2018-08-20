export interface Name {
    readonly firstName: string
    readonly lastName: string
}

export interface Job {
    readonly title: string
    readonly yearsExp: number
}

export interface Person {
    readonly name: Name
    readonly job?: Job
    readonly siblings: ReadonlyArray<Name>
}

export interface Database {
    readonly company: string
    readonly people: ReadonlyArray<Person>
}

export interface Error {
    readonly text: string
}