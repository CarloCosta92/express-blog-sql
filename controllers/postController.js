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

function show(req, res) {
    // Recuperiamo l'id
    const { id } = req.params;
    //query per i post
    const postSql = 'SELECT * FROM posts WHERE id = ?';
    //query per i tag
    const tagSql = `
SELECT label
FROM tags 
JOIN post_tag  ON tags.id = post_tag.tag_id
WHERE post_id = ?
`;
    connection.query(postSql, [id], (err, postResults) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (postResults.length === 0) return res.status(404).json({ error: 'post not found' });

        const post = postResults[0];

        connection.query(tagSql, [id], (err, tagResults) => {
            if (err) return res.status(500).json({ error: 'Database query failed' });

            // creato map per avere un array di label invece che un array di oggetti
            post.tag = tagResults.map(tag => tag.label);
            res.json(post);
        });
    });
}

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
    //Eliminiamo la post dal menu
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