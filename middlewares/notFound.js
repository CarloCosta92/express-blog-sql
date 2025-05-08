// Se viene chiamato un endpoint inesistente, un middleware dovrà rispondere un messaggio e uno status appropriato.

const notFound = (req, res, next) => {
    res.status(404).json({
        error: "not found",
        messaggio: "endpoint inesistente",
    });
};


module.exports = notFound;