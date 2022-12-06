import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// import * as ID from 'nodejs-unique-numeric-id-generator'

const generateAccessToken = (userId, userRole, userEmail) => {
    const accessToken = jwt.sign(
        { id: userId, role: userRole, email: userEmail },
        process.env.JWT_SECRET,
        { expiresIn: "14d" }
    );
    return accessToken;
};

const generatereFreshToken = async (userId, userRole, userEmail) => {
    const refreshToken = jwt.sign(
        { id: userId, role: userRole, email: userEmail },
        process.env.JWT_SECRET,
        { expiresIn: "140d" }
    );
    return refreshToken;
};

const hashedPassword = async (password) => {
    const passwordhash = await bcrypt.hash(password, 12);
    return passwordhash;
};

const randomGenerator = () => {
    // Poor man version of a random generator
    // duplicates keys can creeep in
    // REFACTOR NEEDED
    return Math.floor(Math.random() * 999999);

    // This ID is generated automatically by `nodejs-unique-numeric-id-generator`. Please, don't change it.
    //let ID = require("nodejs-unique-numeric-id-generator");
    //return ID.generate(new Date().toJSON()); //output eg: "118626"
};

// const getRole = (role) => {
//     switch (role) {
//         case "":
//         case "":
//     }
// };

export {
    generateAccessToken,
    generatereFreshToken,
    hashedPassword,
    randomGenerator,
};