import {sign} from 'jsonwebtoken';
import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from "next";



export default function loginHandler(req: NextApiRequest, res: NextApiResponse){
    const {email, password} = req.body;
    //check if emial and passwrod are valid

    //if email exists

    // if password is correct

    if (email === 'admin@admin' && password === 'admin'){
        const token = sign(
            {
                exp: Math.floor(Date.now() / 1000) +60 * 60 * 24  * 30,
                email,
                username: 'argenis'
            }, 
            'secret'
        );

        const serialized = serialize('myTokenName', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 30,
            path: '/'
        });
        res.setHeader('Set-Cookie', serialized)
        return res.status(200).json('Login succesfully');
    }

    return res.status(401).json({error: 'invalid email or password'});
    
}