import { UserResource } from "../Resources/UserResource.js";

export class Authenticator {
    UserResource = new UserResource();
    login(email, password) {
        const user = this.UserResource.getOneOrMore("email", email);
        if (user.length <= 0) return false;
        return password == user[0].password;
    }
}

console.log((new Authenticator()).login("artorias201001@gmail.com", "artorias"));