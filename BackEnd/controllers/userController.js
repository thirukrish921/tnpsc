const login = async function (req, res) {
    let body = req.body;
    console.log("body :", body);
    [err, user] = await to(User.findOne({
        attributes: ['id', 'password', 'email'],
        where: {
            email: body.email
        }
    }));
    if (err) return ReE(res, err, 422);
    if (user) {
        if (User.validPassword(user.password, body.password)) {
            return ReS(res, { user, message: "Successfully logged in ...." });
        } else {
            return ReE(res, "Invalid Password", 422);
        }
    }
    return ReE(res, "Invalid Email Id", 422);
}
module.exports.login = login;

const createUser = async function (req, res) {
    let body = req.body;
    [err, user] = await to(User.create(body
    ));
    if (err) {
        console.log("Error: ", err);
        return ReE(res, err, 422);
    }
    return ReS(res, { user });

}
module.exports.createUser = createUser;
