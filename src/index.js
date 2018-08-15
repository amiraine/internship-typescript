console.log("TEST");
var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student;
}());
var user = "Ami Cooper";
var userThree = new Student("Ami", "R.", "Cooper");
var newUser = { firstName: "Ami", lastName: "Cooper" };
function greeter(person) {
    return "Hello, " + person;
}
function newGreeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
console.log(newGreeter(newUser));
console.log(newGreeter(userThree));
