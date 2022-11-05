const router = require("express").Router();
const passport = require("passport");
const typeServices = require("./type.services");
const adminMiddleware = require("../middlewares/rol.middleware");

require("../middlewares/auth.middleware")(passport);
//? /
//? /:id

router.route("/")
  .get(typeServices.getAllTypes)
  .post(
    passport.authenticate("jwt", { session: false }),
    adminMiddleware,
    typeServices.postType
  ); 

router.route("/:id")
  .get(typeServices.getTypeById)
  .delete(
    passport.authenticate("jwt", { session: false }),
    adminMiddleware,
    typeServices.deleteType
  ); 

module.exports = router;