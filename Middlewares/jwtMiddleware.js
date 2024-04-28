import jwt from 'jsonwebtoken';
import userModel from '../Models/UserModel.js';
import dotenv from 'dotenv';

dotenv.config();


const secretKey = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
    // console.log(req.cookies)

    const token = req.headers.authorization;
    console.log("token", token)

    if (!token) return res.sendStatus(401);

    jwt.verify(token, secretKey, async (err, user) => {

        if (err){
            console.log("error", err.message)
            return res.sendStatus(403);
        }
        try {

            req.user = await userModel.findById(user.id);
            next();

        } catch (error) {

            console.error('Error finding user:', error);
            res.sendStatus(500);

        }
    });
};

export { authenticateToken, secretKey };
