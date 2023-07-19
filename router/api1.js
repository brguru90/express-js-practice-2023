const express = require("express")
const router = express.Router()

module.exports = router

const checkAuthMiddleware = (req, res, next) => {
    if (req.headers["auth"] == "1234") {
        next()
    } else if (req.body?.auth == "1234") {
        next()
    } else if (req?.query?.auth == "1234") {
        next()
    } else {
        res.status(403).send("not Ok")
    }
}

const routerLevelMiddleware = (req, res, next) => {
    console.log("router level middleware")
    next()
}



router.all("/test", (req, res) => {
    res.status(200).send("Ok")
})


router.get("/only_get", (req, res) => {
    res.send("ok")
})

router.all("/check_auth", routerLevelMiddleware, checkAuthMiddleware, (req, res) => {
    res.status(200).send("Ok")
})

router.get("/param", (req, res) => {
    res.send("no param")
})

router.get("/param/:id", (req, res) => {
    res.send(req.params.id)
})

router.get("/param/:id/:id2", (req, res) => {
    res.send(req.params)
})

router.all("/chain",
    (req, res, next) => {
        res.status(200)
        res.write("chain 1\n")
        next()
    },
    (req, res, next) => {
        res.write("chain 2\n")
        next()
    },
    (req, res, next) => {
        res.write("chain 3")
        res.end()
    },
)