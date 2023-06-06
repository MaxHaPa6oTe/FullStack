import Jwt from "jsonwebtoken";

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decoded = Jwt.verify(token, 'secret123')

            req.userId = decoded._id
            next()
        } catch (e) {
            return res.status(403).json({
            message: 'Нет доступа(-)'
        })
        }
    } else {
        return res.status(403).json({
            message: 'Нет доступа(токен)'
        })
    }
   // res.send(token)

    //next();
}