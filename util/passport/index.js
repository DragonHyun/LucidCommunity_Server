const passport = require('passport');
const passportJWT = require('passport-jwt');
const bcrypt = require('bcrypt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../MySQL/Models').user;
const { secretKey, options } = require('../../config/secretkey');

const LocalStrategyOption = {
    usernameField: "account_id",
    passwordField: "password"
};
const localVerify = async (account_id, password, done) => {
    try {
        const user = await User.findOne({ where: { account_id: account_id } });
        if (!user) return done(null, false, { message: "아이디가 존재 하지 않습니다." });
        console.log(user);
        const isSamePassword = await bcrypt.compare(password, user.password);
        if (!isSamePassword)
            return done(null, false, { message: "비밀번호가 틀렸습니다." });
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}

const jwtStrategyOption = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey
}
//TODO: 토큰 만료, 올바르지 않은 토큰 같은 메시지 세분화 필요
async function jwtVerify(payload, done) {
    let user;
    try {
        user = await User.findOne({ where: { id: payload.id } });
        if (!user) return done(null, false);
    } catch (err) {
        return done(err);
    }
    //TODO: return하는것을 user가 아닌 다른것으로 바꿔야함. 보안성..
    return done(null, user);
}

module.exports = () => {
    passport.use('local', new LocalStrategy(LocalStrategyOption, localVerify));
    passport.use('jwt', new JWTStrategy(jwtStrategyOption, jwtVerify));
};