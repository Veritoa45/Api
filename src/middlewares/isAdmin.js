export const isAdmin = (req, res, next) => {
    if (req.session && req.session.userId && req.session.isAdmin) {
        return next();
    } else {
        return res.status(401).json({ message: 'Usted no está autorizado'})
    }
} 
