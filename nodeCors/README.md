# Configurações CORS e +

.env 
SECRET = "mavizoka123" -> pode ser o que quiser

index.js
app.use(cors({
        origin: '*'
}));

hash na senha
const salt = await bcrypt.genSalt(12);
const passwordHash = await bcrypt.hash(password, salt);

verificação bcrypt
 if(!bcrypt.compare(password, user.password)) {
     return res.status(400).send({ message: "Invalid Email or password" });
}

criação token
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