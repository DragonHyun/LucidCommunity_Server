const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('heart', {
    age: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "좋아요인덱스"
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "게시글인덱스",
      references: {
        model: 'post',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "유저인덱스",
      references: {
        model: 'user',
        key: 'id'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "생성시점"
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "수정시점"
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "삭제시점"
    }
  }, {
    sequelize,
    tableName: 'heart',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "age" },
        ]
      },
      {
        name: "FK_heart_post_id_post_id",
        using: "BTREE",
        fields: [
          { name: "post_id" },
        ]
      },
      {
        name: "FK_heart_user_id_user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
