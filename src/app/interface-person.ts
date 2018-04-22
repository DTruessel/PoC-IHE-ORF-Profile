
export class Person {
    id: number;
    firstName: string;
    lastName: string;

    fullName() {
        return this.firstName + ' ' + this.lastName;
    }
}

export class User extends Person {
    userStatus: string;
}

export class Patient extends Person {
    patientStatus: string;
}

let person1: Person = new User();
person1.firstName = 'Daniel';
person1.lastName = 'Trüssel';

let person2: Person = new Patient();
person1.firstName = 'Daniel';
person1.lastName = 'Trüssel';

let isPerson = person1 instanceof Person; // true
let isUser = person1 instanceof Patient; // true
let isPatient = person1 instanceof Patient; // true

console.log('isUser', isUser);
console.log('isPatient', isPatient);

// Type Assertion = Typumwandlung Steyer S. 29

let person1AsUser = person1 as User;

let status = person1AsUser.userStatus;
