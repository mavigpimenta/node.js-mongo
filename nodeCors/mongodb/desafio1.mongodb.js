// Desafio: Crie um catálogo de produtos onde você pode adicionar, atualizar e
// excluir informações sobre os produtos. Cada produto pode ter um nome,
// descrição, preço, categoria e quantidade em estoque.

use('products')

const arrproducts = [
    {
        name: 'Produto 1',
        description: 'Description 1',
        price: 12,
        category: 1,
        quantity: 123,
    },
    {
        name: 'Produto 2',
        description: 'Description 2',
        price: 13,
        category: 2,
        quantity: 123,
    },
    {
        name: 'Produto 3',
        description: 'Description 3',
        price: 14,
        category: 3,
        quantity: 123,
    },
    {
        name: 'Produto 4',
        description: 'Description 4',
        price: 14,
        category: 4,
        quantity: 123,
    },
    {
        name: 'Produto 5',
        description: 'Description 5',
        price: 15,
        category: 5,
        quantity: 123,
    },
]

db.myproducts.insertMany(arrproducts);

db.myproducts.find({ category: 2 }, { name: 1, price: 1 } );

db.myproducts.updateOne(
    { price: 12 },
    { $set:{ price: 11 } }
)

db.myproducts.deleteOne({
    name: /1/
})
