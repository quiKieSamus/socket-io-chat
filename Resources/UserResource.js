import { Resource } from "../core/Resource.js";

export class UserResource extends Resource {
    resource = "Users";
    schema = [
        {
            name: "name",
            unique: false
        },
        {
            name: "email",
            unique: true
        },
        {
            name: "password",
            unique: false
        }
    ];

    validate(data) {
        const props = Object.getOwnPropertyNames(data);
        for (let i = 0; i < this.schema.length; i++) {
            const schemaProp = this.schema[i].name;
            if (!props.includes(schemaProp)) return false;
        }
        return true;
    }
}

console.log((new UserResource()).saveOne({name: "ruben", email: "artorias201001@gmail.com", password: "12341"}));