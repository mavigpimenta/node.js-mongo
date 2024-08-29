# / INICIO /

show databases -> mostrar todos databases
use('nome_database') -> cria/usar database

# / INSERTS / 

db.nome_tabela.insertOne({
    name: "Alisson",
    lastname: "Ferro",
    salary: 1234
}) -> cria uma tabela (collection) e insere um dado 

db.nome_tabela.insertMany([
    {
        name: 'Queila',
        lastname: 'Lima',
        salary: 1234
    },
    {
        name: 'Donathan',
        lastname: 'Goncalves',
        salary: 1234
    },
]) -> insere varios de uma so vez

const arrpeople = [
    {
        name: 'Luis',
        lastname: 'Balem',
        salary: 1234
    },
    {
        name: 'Leonardo',
        lastname: 'Trevisan',
        salary: 1234
    },
]
db.nome_tabela.insertMany(arrpeople) -> insere varios itens de uma array

# / SELECTS /

db.nome_tabela.find() -> encontra todos os dados da tabela
db.nome_tabela.find({ name: 'A' }) -> encontra os dados que sejam semelhantes ao parametro
db.nome_tabela.find({ name: /n/ }); -> dessa forma sera exibido tudo que contem o parametro, assim como o LIKE do sql
db.nome_tabela.find({ $and: [{ name: 'Alisson' }, { lastname: 'Balem' }] }) -> encontra o que tiver ambos parametros
db.nome_tabela.find({ salary: { $gt: 123 } }) -> encontra tudo que tem um valor maior do que o parametro
db.nome_tabela.find({ salary: { $gte: 123 } }, { name: 1, lastname:1 }) -> a busca é em base do primeiro parametro, mas so retorna os dados pedidos no segundo parametro, o 1 é o true

# / OPERADORES DE CONSULTA /

$eq -> Corresponde a valores que são iguais a um valor especificado.
$gt -> Corresponde a valores maiores que um valor especificado.
$gte ->  Corresponde a valores maiores ou iguais a um valor especificado.
$in -> Corresponde a qualquer um dos valores especificados em uma matriz.
$lt -> Corresponde a valores que são menores que um valor especificado.
$lte ->  Corresponde a valores menores ou iguais a um valor especificado.
$ne -> Corresponde a todos os valores que não são iguais a um valor especificado.
$nin ->  Não corresponde a nenhum dos valores especificados em uma matriz

# / UPDATES /

db.nome_tabela.updateOne(
    { _id: ObjectId('64b575535e5947a5e8dd26bd') },
    { $set:{ name:"Alisson Alterado" }}
); -> atualizando os dados a partir do seu _id

db.nome_tabela.updateMany(
    { salary: 1234 },
    { $set:{ salary:12345 }}
); -> atualizando todos os dados iguais ao primeiro parametro para que todos fiquem iguais ao segundo

# / DELETES /

db.nome_tabela.deleteOne({
    name: /Alisson/
}) -> apaga o primeiro item que ele encontrar semelhante ao parametro

db.nome_tabela.deleteMany({
    name: /n/
}) -> apaga tudo que conter o parametro