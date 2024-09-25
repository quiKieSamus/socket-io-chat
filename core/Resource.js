import fs from 'fs';
import { ResourceNotUnique } from '../Errors/ResourceNotUnique.js';
import { InvalidSchema } from '../Errors/InvalidSchema.js';
import { Validator } from './Validator.js';

export class Resource {
    file = "./database.json";
    database = JSON.parse(fs.readFileSync(this.file));
    resource;
    schema;
    validator = Validator;
    getOneOrMore(property, filter) {
        return this.database[this.resource].filter(resource => filter == resource[property]);
    }
    saveOne(data) {
        if (typeof this.validator.checkSchema(this.schema, data) == "string") throw new InvalidSchema(this.resource, this.validator.checkSchema(this.schema, data));


        if (!this.validator.checkUniqueness(this.schema, data, this)) {
            throw new ResourceNotUnique(this.resource);
        }

        this.database[this.resource].push(data);
        this.#writeDb();
        return this.database[this.resource].length;
    }
    updateOne(property, filter, data) {
        this.database[this.resource].forEach((resource, index) => {
            if (resource[property] == filter) {
                this.database[this.resource][index] = data;
            }
        });
        this.#writeDb();
    }
    deleteOne(property, filter) {
        this.database[this.resource].forEach((resource, index) => {
            if (resource[property] == filter) {
                this.database[this.resource][index] = null;
            }
        });
        this.#cleanDb();
    }
    #cleanDb() {
        this.database[this.resource] = this.database[this.resource].filter(resource => typeof resource !== "undefined");
    }
    #writeDb() {
        fs.writeFileSync(this.file, JSON.stringify(this.database));
    }
}