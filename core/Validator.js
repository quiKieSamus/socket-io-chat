export class Validator {
    static checkUniqueness(schema, data, resource) {
        const verifyingUniqueness = schema.map((schemaProp) => {
            const prop = schemaProp.name;
            const unique = schemaProp.unique;
            if (!unique) return;
            const search = resource.getOneOrMore(prop, data[prop]);
            if (search.length > 1) return true;
        });

        return verifyingUniqueness.includes(true);
    }
    /**
 * checks based on an input object if it has the properties defined in schema. Returns true if everything is fine, otherwise, returns the name of the property that is missing
 * @param {object} data input data to verify
 *  @returns {true|string} 
 */
    static checkSchema(schema, data) {
        const props = Object.getOwnPropertyNames(data);
        for (let i = 0; i < schema.length; i++) {
            const schemaProp = schema[i].name;
            if (!props.includes(schemaProp)) return schemaProp;
        }
        return true;
    }
}