const posts= require("../data/posts.js")

const index = (req, res) => {
    const check=req.query.tag;

    if (check){
        // Filtra i post per tag
    const checkedPosts = posts.filter((post) =>
        post.tags.some((tag) => tag === check)
      );
      if (checkedPosts.length === 0) {
        return res.status(404).json({
          error: "not Found",
          messaggio: "Nessun post trovato ",
        });
      }
  
      res.json(checkedPosts); //stampa quelli trovati
    
    } else {
        res.json(posts); //stampa tutto
    }
    // res.send('Lista dei post');
};

const show = (req, res) => {

    // validazione
    if (req.params.id) {

    const postId = parseInt(req.params.id);
    const post = posts.find(post => post.id === postId);

    if (!post) {
        return res.status(404).json({ 
            error: "not found",
            messaggio: "ricetta non trovata" });
      }

    // res.send('Dettagli di un post');
    res.status(200).json(post);
}
};

const store = (req, res) => {
    console.log(req.body);

    //variabile per nuovo id sequenziale
    const newId= posts[posts.length-1].id + 1;

    // creazione oggetto
    const newRecipe={
        id: newId,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    }

    // push nuova ricetta nel DB
    posts.push(newRecipe);

    console.log(posts);

    res.status(201).json(newRecipe);

    // res.send('Creazione di un nuovo post');
};

const update = (req, res) => {

    //recuperiamo id dall'url
    const id=parseInt(req.params.id);

    //cerchiamo l'elemento
    const recipe= posts.find(recipe => recipe.id === id);

    //validazione
    if(!recipe){
        return res.status(404).json({
            error: "not found",
            messaggio: "ricetta non trovata"
        })
    } else {

    //aggiorniamo il ricettario
    recipe.title=req.body.title;
    recipe.content=req.body.content;
    recipe.image=req.body.image;
    recipe.tags=req.body.tags;

    console.log(posts)

    res.json(recipe);

    }

    // res.send('Modifica di un post');
};

const destroy = (req, res) => {

    const postId = parseInt(req.params.id);
    const post = posts.findIndex(post => post.id === postId);

    //validazione
    if (post === -1) {
        return res.status(404).json({
          error: "Not Found",
          messaggio: "Post non trovato.",
        });
      }

    posts.splice(post, 1);

    console.log(posts)

    res.status(204).send(posts);
};

module.exports = {
    index,
    show,
    store,
    update,
    destroy,
};