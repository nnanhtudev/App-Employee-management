import passport from "passport";
import LocalStrategy from "passport-local";
import loginRegisterService from "../services/loginRegisterService";

const configPassPort = () => {
  passport.use(
    new LocalStrategy(async function verify(username, password, cb) {
      let rawData = {
        valueLogin: username,
        password,
      };

      let res = await loginRegisterService.handleLoginUser(rawData);
      if (res && res.EC === 0) {
        return cb(null, res.DT);
      } else {
        return cb(null, false, { message: res.EM });
      }
    })
  );
};

module.exports = { configPassPort };
