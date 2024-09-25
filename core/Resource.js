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
        if (typeof this.validate(data) == "string") throw new InvalidSchema(this.resource, this.validate(data));
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
    /**
     * checks based on an input object if it has the properties defined in schema. Returns true if everything is fine, otherwise, returns the name of the property that is missing
     * @param {object} data input data to verify
     *  @returns {true|string} 
     */
    validate(data) { };
}