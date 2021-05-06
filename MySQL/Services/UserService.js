const User = require('../Models').user;
const sequelize = require('sequelize');
const CustomError = require('../../util/custom-error');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userService = {
    isIdUnique: async (value) => {
        try {
            const result = await User.findOne({
                attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'count']],
                where: {
                    account_id: value,
                    deleted_at: null
                }
            })

            if (result.dataValues.count == 0) return true;
            else return false;
        } catch (err) {
            throw err;
        }
    },

    isEmailUnique: async (value) => {
        try {
            const result = await User.findOne({
                attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'count']],
                where: {
                    email: value,
                    deleted_at: null
                }
            })

            if (result.dataValues.count == 0) return true
            else return false;
        } catch (err) {
            throw err;
        }
    },

    isNicknameUnique: async (value) => {
        try {
            const result = await User.findOne({
                attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'count']],
                where: {
                    nickname: value,
                    deleted_at: null
                }
            })

            if (result.dataValues.count == 0) return true
            else return false;
        } catch (err) {
            throw err;
        }
    },

    signUp: async (account_id, password, name, age, sex, email, nickname) => {
        const default_profile_image_url = "default_profile_image_url";
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(password, salt);

            password = hash;
            const user = await User.create({
                account_id: account_id,
                password: password,
                name: name,
                age: age,
                sex: sex,
                email: email,
                nickname: nickname,
                profile_image_url: default_profile_image_url
            })

            return user;
        } catch (err) {
            throw err;
        }
    },

    updatePassword: async (uid, password) => {
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(password, salt);

            password = hash;

            const result = await User.update({ password }, {
                where: { id: uid },
            })

            console.log(result);

            if (result[0] == 1) return true;
            return false;
        } catch (err) {
            throw err;
        }
    },

    updateNickname: async (uid, nickname) => {
        try {
            const result = await User.update({ nickname }, {
                where: { id: uid },
            })

            if (result[0] == 1) return true;
            return false;

        } catch (err) {
            throw err;
        }
    },

    allUser: async () => {
        try {
            const allUser = await User.findAll();

            return allUser;
        } catch (exception) {
            throw exception;
        }
    },

    userInfo: async (userId) => {
        try {
            const userInfo = await User.findOne({
                where: {
                    user_id: userId
                }
            })

            return userInfo;
        } catch (exception) {
            throw exception;
        }
    },

    updateUser: async (userId, comment) => {
        try {
            await User.update({
                comment: comment,
            }, {
                where: {
                    id: userId
                }
            });

            return true;
        } catch (exception) {
            throw exception;
        }
    },

    deleteUser: async (userId) => {
        try {
            await User.destroy({
                where: {
                    id: userId
                }
            });

            return true;
        } catch (exception) {
            throw exception;
        }
    }
}

module.exports = userService;