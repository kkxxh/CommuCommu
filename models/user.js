/* 사용자 정보를 저장하는 모델
이메일, 닉네임, 비밀번호를 저장
SNS 로그인을 했을 경우 provider, snsId 저장 */
const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            email: {
                type:Sequelize.STRING(40),
                allowNull: true,
                unique: true,
            },
            nick : {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            provider: {
                type: Sequelize.STRING(10),
                allowNull: false,
                defaultValue: 'local',
            },
            snsId: {
                type: Sequelize.STRING(30),
                allowNull : true,
            },
        },{
            sequelize,
            timestamps: false,
            underscored : false,
            modelName: 'User',
            tableName: 'users',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.User.hasMany(db.Post);
        db.User.belongsToMany(db.User,{
            foreignKey: 'followingId',
            as: 'Followers',
            through: 'Follow',
        });
        db.User.belongsToMany(db.User,{
            foreignKey: 'followId',
            as: 'Followings',
            through: 'Follow',
        });
    }
};