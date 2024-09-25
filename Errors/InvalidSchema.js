export class InvalidSchema extends Error {
    constructor(resource, prop) {
        super();
        this.message = `Schema for ${resource} is invalid, missing ${prop}`
    }
}