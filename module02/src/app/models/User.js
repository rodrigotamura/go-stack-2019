import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    // this method will be called automatically by Sequelize
    super.init(
      {
        // calling method init() from Model class
        // here we declare the columns from users table
        // It will be columns that the user will directly handle
        // So, it's not necessary PK, FK, timestamps columns

        // Another observation is that the fields declared here are
        // not necessary to be the same from DB
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL, // VIRTUAL indicates this field will never exists in DB
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    // Hooks are code snippet that will execute automatically based on the actions in our Model
    // beforeSave will be executed automatically BEFORE an user be inserted/changed in DB.
    // If we remove beforeSave, and press Ctrl+space we will see all available hooks.
    this.addHook('beforeSave', async user => {
      // user.name = 'Diego'; // Every inserted / changed user will have this name
      if (user.password) {
        // if the field 'password' is included in request...
        user.password_hash = await bcrypt.hash(user.password, 8); // 8 is the strength of encryption
      }
    });

    return this; // ALWAYS we need to return this object in init() method.
  }

  static associate(models) {
    // now we are including in User Model the file field
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });

    // this as:'avatar means that we don't want to reference avatar as a FILE (default),
    // we are here renaming to 'avatar' (look at ProviderController in const providers)
  }

  checkPassword(password) {
    // comparing the received password with password_hash
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
