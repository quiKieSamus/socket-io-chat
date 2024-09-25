import { Resource } from "./Resource.js";

export class User extends Resource {
    resource = "Users";
    schema = ["name", "email", "password"];
    validate(data) {
        const props = Object.getOwnPropertyNames(data);
        for (let i = 0; i < props.length; i++) {
            const prop = props[i];
            if (!this.schema.includes(prop)) return false
        }
        return true;
    }
}