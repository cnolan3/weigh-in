const bcrypt = require('bcrypt');

'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      allowNull: false
    }
  }, {});
  user.associate = function(models) {
//    user.belongsToMany(models.topic, { through: models.cert_list, constraints: false });
  };

  // adapted from github gist
  // https://gist.github.com/JesusMurF/9d206738aa54131a6e7ac88ab2d9084e
  user.beforeCreate(function(user, options) {
    return crypt(user.password)
      .then(success => {
        user.password = success;
      })
      .catch(err => {
        if(err) console.log(err);
      });
  });

  function crypt(password) {
    return new Promise(function(resolve, reject) {
			bcrypt.genSalt(10, function(err, salt) {
				if(err) return reject(err);

				bcrypt.hash(password, salt, function(err, hash) {
					if(err) return reject(err); 
					return resolve(hash);
				});
			});
		})
	};

  return user;
};
