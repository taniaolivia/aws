module.exports = (server) => {
    const userController = require("../controllers/userController");
    const jwtMiddleware = require("../middlewares/jwtMiddleware");
    const cors = require('cors');

server.post("/user/register", cors(), userController.userRegister);
server.post("/user/login", cors(), userController.userLogin);
server.patch("/user/logout/:id", cors(), userController.userLogout);

server.get("/users/:id", jwtMiddleware.authenticateUser, cors(), userController.getUserById);

}