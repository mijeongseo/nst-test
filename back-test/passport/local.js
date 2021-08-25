const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");

const bcrypt = require("bcrypt");
const { User } = require("../models");

module.exports = () => {
  //   passport.use(new LocalStrategy({객체}, 함수() => {}));
  passport.use(
    new LocalStrategy(
      {
        usernameField: "userid", //req.body.userid
        passwordField: "password", //req.body.password
      },
      async (userid, password, done) => {
        //비동기 요청을 하면 서버에러가 발생할 수도 있기 때문에 그걸 대비하여 try-catch문 사용
        try {
          const user = await User.findOne({
            where: { userid }, //== {userid : userid}
          });
          if (!user) {
            return done(null, false, { reason: "존재하지 않는 사용자입니다." });
            // done(서버 , 성공 , 클라이언트)
            // 클라이언트 에러는 보내는 측에서 뭔가 잘 못 보내서 에러
          }
          const result = await bcrypt.compare(password, user.password); //compare도 비동기함수임
          //(사용자가 보낸 패스워드, db에 저장된 패스워드)
          if (result) {
            return done(null, user);
            // 성공 시, db에 있는 사용자 정보(user) 넘겨주기
          }
          return done(null, false, { reason: "비밀번호가 틀렸습니다." });
        } catch (error) {
          console.error(error);
          return done(error); //서버에러
        }
      }
    )
  );
};
