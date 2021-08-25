module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            userid: {
                type: DataTypes.STRING(30), //STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
        },
        {
            charset: 'utf8',
            collate: 'utf8_general_ci', //한글 저장
        }
    );

    // 테이블(모델)간의 관계를 정의
    User.associate = (db) => {
        db.User.hasMany(db.Post);
    };

    return User;
};
