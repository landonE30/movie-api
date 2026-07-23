export const Validate = (Schema) => (req, res, next) => {
    try {   
        Schema.parse({
            body : req.body,
            params : req.params,
            query : req.query
        })
        next()
    } catch (err) {
        
        next(err)
    }
}