// const posts = require("../data/posts.js")
const connection = require("../data/db.js")

// Index
function index(req, res) {
    // query
    const sql = 'SELECT * FROM posts';
    // esecuzione
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    })
}

const show = (req, res) => {

    // validazione
    if (req.params.id) {

        const postId = parseInt(req.params.id);
        const post = posts.find(post => post.id === postId);

        if (!post) {
            return res.status(404).json({
                error: "not found",
                messaggio: "ricetta non trovata"
            });
        }

        // res.send('Dettagli di un post');
        res.status(200).json(post);
    }
};

// const store = (req, res) => {
//     console.log(req.body);

//     //variabile per nuovo id sequenziale
//     const newId = posts[posts.length - 1].id + 1;

//     // creazione oggetto
//     const newRecipe = {
//         id: newId,
//         title: req.body.title,
//         content: req.body.content,
//         image: req.body.image,
//         tags: req.body.tags
//     }

//     // push nuova ricetta nel DB
//     posts.push(newRecipe);

//     console.log(posts);

//     res.status(201).json(newRecipe);

//     // res.send('Creazione di un nuovo post');
// };

// const update = (req, res) => {

//     //recuperiamo id dall'url
//     const id = parseInt(req.params.id);

//     //cerchiamo l'elemento
//     const recipe = posts.find(recipe => recipe.id === id);

//     //validazione
//     if (!recipe) {
//         return res.status(404).json({
//             error: "not found",
//             messaggio: "ricetta non trovata"
//         })
//     } else {

//         //aggiorniamo il ricettario
//         recipe.title = req.body.title;
//         recipe.content = req.body.content;
//         recipe.image = req.body.image;
//         recipe.tags = req.body.tags;

//         console.log(posts)

//         res.json(recipe);

//     }

//     // res.send('Modifica di un post');
// };

function destroy(req, res) {
    // recuperiamo l'id dall' URL
    const { id } = req.params;
    //Eliminiamo la pizza dal menu
    connection.query('DELETE FROM posts WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to delete post' });
        res.sendStatus(204)
    });
}


module.exports = {
    index,
    show,
    // store,
    // update,
    destroy,
};