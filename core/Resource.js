import fs from 'fs';
import { ResourceNotUnique } from '../Errors/ResourceNotUnique.js';
import { InvalidSchema } from '../Errors/InvalidSchema.js';

export class Resource {
    file = "./database.json";
    database = JSON.parse(fs.readFileSync(this.file));
    resource;
    schema;
    getOneOrMore(property, filter) {
        return this.database[this.resource].filter(resource => filter == resource[property]);
    }
    saveOne(data) {
        if (!this.validate(data)) throw new InvalidSchema(`Invalid schema for Resource ${this.resource}`);
        const verifyingUniqueness = this.schema.map((schemaProp) => {
            const prop = schemaProp.name;
            const unique = schemaProp.unique;
            if (!unique) return;
            const search = this.getOneOrMore(prop, data[prop]);
            if (search.length > 1) return true;
        });
        if (verifyingUniqueness.includes(true)) {
            throw new ResourceNotUnique("Resource not unique");
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
    validate(data) { };
}