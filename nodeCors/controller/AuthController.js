const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../nodeCors/model/User');
require('dotenv').config();

class AuthController {
    static async register(req, res) {
        const { name, email, password } = req.body;
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        const emailRegistered = await User.findOne({ email })

        if (emailRegistered) {
            return res.status(400).send({ message: "Email already registered" })
        }

        const user = new User({
            name,
            email,
            password: passwordHash,
        });

        try {
            await user.save();
            res.status(201).send({ message: "Usuário cadastrado com sucesso" });
        } catch (error) {
            return res.status(500).send({ message: "Something failed" })
        }
    }

    static async delete(req, res) {
        const { id } = req.params;
        await User.findByIdAndDelete(id);

        return res.status(200).send({ message: "User deleted with sucessfully" })
    }

    static async login(req, res) {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if(!user)
            return res.status(400).send({ message: "Invalid Email or password" });
        
        if(!bcrypt.compare(password, user.password)) {
            return res.status(400).send({ message: "Invalid Email or password" });
        }

        const secret = process.env.SECRET;
        const token = jwt.sign(
            {
                id: user._id,
            },
            secret,
            {
                expiresIn: '2d'
            }
        );

        return res.status(200).send({token: token})
    }

    static async getAll(req, res) {
        try {
            const users = await User.find();
            return res.status(200).send({ data: users });
        } catch (error) {
            return res.status(500).send({ error: error });
        }
    }
}

module.exports = AuthController;