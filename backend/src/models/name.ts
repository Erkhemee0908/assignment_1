// External dependencies
import { ObjectId } from "mongodb";
// Class Implementation
export default class Name {
    constructor(public name: string, public id?: ObjectId) { }
}