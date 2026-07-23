import z from "zod";

export const Errorhandler = (err , req , res , next) => {


    if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];

    return res.status(409).json({
      status : 409,
      message: `mongo : ${field} already exists`,
    });
  }

    if(err instanceof z.ZodError) {
        const tree = z.treeifyError(err)

        return res.status(400).json({
            status : 400,
            message: tree
        })
    }

    const status = err.status || 500;

    const message = err.message || "something went wrong"

    res.status(status).json({
        status,
        message
    })

}