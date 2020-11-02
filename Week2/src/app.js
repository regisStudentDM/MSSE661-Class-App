var object = {
    name: 'Bob',
    age: 50
}

class Person {
    firstname;
    lastname;
    age;

    constructor(firstname, lastname, age) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;
    }

    getFullName() {
        return this.firstname + " " + this.lastname;
    }

}

console.log(new Person('Bob', 'Smith', 50).getFullName());