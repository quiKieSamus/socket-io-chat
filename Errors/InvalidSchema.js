export class InvalidSchema extends Error {
    constructor(resource, prop) {
        this.message = `Schema for ${resource} is invalid, missing ${prop}`
    }
}