import { adjectives, nouns } from "./words";
import jwt from "jsonwebtoken";

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_APIKEY);

export const generateSecret = () => {
    const randomNumber = Math.floor(Math.random() * adjectives.length);
    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
}



export const sendSecretMail = (adress, secret) => {
    const email = {
        from: "warham@prismagram.com",
        to: adress,
        subject: "Login Secret for Prismagram",
        html: `Hello! Your login secret is <strong>${secret}</strong>.<br/>Copy paste on the app to login`
    };
    return sgMail.send(email);
};

export const generateToken = (id) => jwt.sign({id}, process.env.JWT_SECRET);