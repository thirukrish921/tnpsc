'use strict';
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
	var Model = sequelize.define('user', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		password: DataTypes.STRING,
		mobile: {
			type: DataTypes.BIGINT,
			allowNull: false
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW
		},
		modifiedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW
		}
	},
		{
			tableName: 'user'
		});

	Model.beforeCreate(async (user, options) => {
		// Asynchronously generates a salt.
		// Randomly select rounds(b/w 4-10) for generating hash
		if (user.changed('password')) {
			let err;
			let salt, hash;
			let rounds = Math.floor(Math.random() * 6 + 4);
			[err, salt] = await to(bcrypt.genSalt(rounds));
			if (err) {
				TE(err.message);
			};
			//Asynchronously generates a hash with salt
			[err, hash] = await to(bcrypt.hash(user.password, salt));
			if (err) {
				TE(err.message);
			};
			user.password = hash;
		}
	});

	Model.validPassword = function (password, pass) {
		return bcrypt.compareSync(pass, password);
	}
	Model.associate = function (models) {
	};
	return Model;
}