exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next(); // next(에러내용) -> 에러처리, next() -> (인자X) 다음미들웨어 실행
    } else {
        res.status(401).send('로그인이 필요합니다.');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        res.status(401).send('로그인하지 않은 사용자만 접근 가능합니다.');
    }
};
