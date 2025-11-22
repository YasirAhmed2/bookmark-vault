import { User } from "./user.mongo.js";

export const createUser = (data) => {
    User.create(data);
}

export const findUserByEmail = (email) => {
    User.findOne({ email });
}
