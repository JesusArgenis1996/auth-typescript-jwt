import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

interface JwtPayload {
    email: string,
    username: string
}

export default function profileHandler(req: NextApiRequest, res:NextApiResponse) {
  const { myTokenName } = req.cookies;
  
  if (!myTokenName) {
    return res.status(401).json({ error: "Not logged in" });
  }

  const { username, email } = jwt.verify(myTokenName, "secret") as JwtPayload;
  return res.status(200).json({ email, username });
}