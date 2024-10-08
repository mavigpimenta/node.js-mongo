# Node.js + MongoDB

## MongoDB

### Inicio 

`show databases // mostrar todos databases`

`use('nome_database') // criar/usar database`

### Inserts 
Cria uma tabela (collection) e insere um dado 
```ruby
db.nome_tabela.insertOne({
    name: "Maria",
    lastname: "Pimenta",
    salary: 1234
}) 
```
Insere varios de uma so vez
```ruby
db.nome_tabela.insertMany([
    {
        name: 'Maria',
        lastname: 'Pimenta',
        salary: 1234
    },
    {
        name: 'Mavi',
        lastname: 'Garcia',
        salary: 1234
    },
]) 
```
Insere varios itens de uma array
```ruby
const arrpeople = [
    {
        name: 'Vitoria',
        lastname: 'Pimenta',
        salary: 1234
    },
    {
        name: 'Maria',
        lastname: 'Garcia',
        salary: 1234
    },
]
db.nome_tabela.insertMany(arrpeople)
```

### Selects 
| Code | O que faz |
| --- | --- |
| `db.nome_tabela.find()` | Encontra todos os dados da tabela |
| `db.nome_tabela.find({ name: 'M' })` | Encontra os dados que sejam semelhantes ao parametro |
| `db.nome_tabela.find({ name: /n/ })` | Dessa forma sera exibido tudo que contem o parametro, assim como o LIKE do sql |
| `db.nome_tabela.find({ $and: [{ name: 'Maria' }, { lastname: 'Pimenta' }] })` | Encontra o que tiver ambos parametros |
| `db.nome_tabela.find({ salary: { $gt: 123 } })` | Encontra tudo que tem um valor maior do que o parametro |
| `db.nome_tabela.find({ salary: { $gte: 123 } }, { name: 1, lastname: 1 })` | A busca é em base do primeiro parametro, mas so retorna os dados pedidos no segundo parametro, o 1 é o true |

### Operadores de Consulta
| Operador | O que faz |
| --- | --- |
| `$eq` | Corresponde a valores que são iguais a um valor especificado. |
| `$gt` | Corresponde a valores maiores que um valor especificado. |
| `$gte` |  Corresponde a valores maiores ou iguais a um valor especificado. |
| `$in` | Corresponde a qualquer um dos valores especificados em uma matriz. |
| `$lt` | Corresponde a valores que são menores que um valor especificado. |
| `$lte` |  Corresponde a valores menores ou iguais a um valor especificado. |
| `$ne` | Corresponde a todos os valores que não são iguais a um valor especificado. |
| `$nin` |  Não corresponde a nenhum dos valores especificados em uma matriz |

### Updates

Atualizando os dados a partir do seu id
```ruby
db.nome_tabela.updateOne(
    { _id: ObjectId('64b575535e5947a5e8dd26bd') },
    { $set:{ name:"Mavi Alterada" }}
); 
```
Atualizando todos os dados iguais ao primeiro parametro para que todos fiquem iguais ao segundo
```ruby
db.nome_tabela.updateMany(
    { salary: 1234 },
    { $set:{ salary: 12345 }}
); 
```

### Deletes

Apaga o primeiro item que ele encontrar semelhante ao parametro
```ruby
db.nome_tabela.deleteOne({
    name: /Maria/
}) 
```

Apaga tudo que conter o parametro
```ruby
db.nome_tabela.deleteMany({
    name: /n/
})
```

## Node.js

### Iniciar Projeto
```ruby
npm init -y
```
```ruby
npm i body-parser config express nodemon mongoose cors dotenv bcryptjs jsonwebtoken
```

adicionar no script do package.json:
```ruby
"start": "nodemon index.js"
```

## Node.js + Mongoose

### index.js
```ruby
const express = require('express');
const router = require('./routes');
const app = express();

require('../nodeMongoose/startup/db')();

router(app);

const port = 8080;
const server = app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = server;
```

### db.js
```ruby
const mongoose = require('mongoose');
const config = require('config')

module.exports = function() {
    const db = config.get('db');
    mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log(`connected to ${db}`));
}
```

### default.json
```ruby
{
    "db": "mongodb://127.0.0.1:27017/nome_database
}
```

## Node.js + CORS + JWT + Hash

### .env 
```ruby
SECRET = "sua_chave_aqui"
```

### index.js
```ruby
app.use(cors({
        origin: '*'
}));
```

### Hash na Senha
```ruby
const salt = await bcrypt.genSalt(12);
const passwordHash = await bcrypt.hash(password, salt);
```

### Verificação Bcrypt
```ruby
 if(!bcrypt.compare(password, user.password)) {
     return res.status(400).send({ message: "Invalid Email or password" });
}
```

### Criação JWTToken
```ruby
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
```

### Verificação JWTToken

```ruby
function verifyJWT(req, res, next){
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      req.userId = decoded.id;
      next();
    });
}
```

### Chamar a verificação na requisição
```ruby
app.get('/clientes', verifyJWT, (req, res, next) => { })
```
