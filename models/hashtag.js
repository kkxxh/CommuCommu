/*해시 태그 모델은 태그 이름 저장
나중에 검색하기 위해 따로 테이블 생성
*/
const Sequelize = require('sequelize');

module.exports = class Hashtag extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            title:{
                type:Sequelize.STRING(15),
                allowNull: false,
                unique: true,
            },
        },{
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Hashtag',
            tableName: 'hashtags',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db) {
        db.Hashtag.belongToMany(db.Post, { through: 'PostHashtag'});
    }
};