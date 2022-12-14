import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import {serialize} from 'cookie';

interface JwtPayload {
    email: string,
    username: string
}

export default function logoutHandler(req: NextApiRequest, res: NextApiResponse){
    const { myTokenName } = req.cookies;
  
    if (!myTokenName) {
        return res.status(401).json({ error: "Not logged in" });
    }

    try{
        jwt.verify(myTokenName, 'secret');
        const serialized = serialize('myTokenName', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 0,
            path: '/'
        });
        res.setHeader('Set-Cookie', serialized);
        res.status(200).json('Logout succesfully');

    } catch (error){
        res.status(200).json('Invalid token');
    }
}