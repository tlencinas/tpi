import express from "express";
import jwt from "jsonwebtoken";
import auth from '../auth.js'

const router = express.Router();

const users = [
    {
        usuario: "admin",
        clave: "123",
        rol: "jefe",
    },
    {
        usuario: "juan",
        clave: "123",
        rol: "empleado",
    },
];
let refreshTokens = [];

router.post("/api/login", (req, res) => {
    // #swagger.tags = ['Seguridad']
    // #swagger.summary = 'Login de usuarios: admin:123(rol jefe), juan:123(rol empleado)'

    const { usuario, clave } = req.body;

    // Filter user from the users array by usuario and clave
    const user = users.find((u) => {
        return u.usuario === usuario && u.clave === clave;
    });

    if (user) {
        // Generate an access token
        const accessToken = jwt.sign(
            { usuario: user.usuario, rol: user.rol },
            auth.accessTokenSecret,
            { expiresIn: "20m" }
        );

        // Avanzado!
        const refreshToken = jwt.sign(
            { usuario: user.usuario, rol: user.rol },
            auth.refreshTokenSecret
        );

        refreshTokens.push(refreshToken);

        res.json({
            accessToken,
            refreshToken,
            message: "Bienvenido " + user.usuario + " (rol: " + user.rol + ")",
        });
    } else {
        res.status(401).json({ message: "Usuario o clave incorrectos" });
    }
});

router.post("/api/logout", (req, res) => {
    // #swagger.tags = ['Seguridad']
    // #swagger.summary = 'Logout: invalida el refresh token (no invalida el token actual!!!)'

    // El token sigue válido hasta que expire, aquí evitamos que pueda renovarse cuando expire.
    let message = null;
    const authHeader = req.headers.authorization;
    let token = null;
    if (authHeader) {
        token = authHeader.split(" ")[1];
    }

    if (refreshTokens.includes(token)) {
        message = "Usuario deslogueado correctamente!";
    }
    else {
        message = "Logout inválido!";
    }


    refreshTokens = refreshTokens.filter((t) => t !== token);
    res.json({ message });
});

router.post("/api/refreshtoken", (req, res) => {
    // #swagger.tags = ['Seguridad']
    // #swagger.summary = 'refresh token'
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.sendStatus(401);
    }

    if (!refreshTokens.includes(refreshToken)) {
        return res.sendStatus(403);
    }

    jwt.verify(refreshToken, auth.refreshTokenSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign(
            { usuario: user.usuario, rol: user.rol },
            auth.accessTokenSecret,
            { expiresIn: "20m" }
        );

        res.json({
            accessToken,
        });
    });
});

export default router;