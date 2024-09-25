export class ResourceNotUnique extends Error {
    constructor(resource) {
        super();
        this.message = `${resource} Resource is not unique`;
    }
}