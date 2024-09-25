import fs from 'fs';

export class Resource {
    file = "./database.json";
    database = JSON.parse(fs.readFileSync(this.file));
    resource;
    getOne(property, filter) {
        return this.database[this.resource].filter(resource => filter == resource[property]);
    }
    saveOne(data) {
        if (!this.validate(data)) throw new Error(`Invalid schema for Resource ${this.resource}`);
        this.database[this.resource].push(data);
        this.#writeDb();
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