import { Resource } from "../core/Resource.js";

export class UserResource extends Resource {
    resource = "Users";
    schema = [
        {
            name: "name",
            unique: false,
            nullable: false
        },
        {
            name: "email",
            unique: true,
            nullable: false
        },
        {
            name: "password",
            unique: false,
            nullable: false
        },
        {
            name: "sessionToken",
            unique: true,
            nullable: true
        }
    ];
}