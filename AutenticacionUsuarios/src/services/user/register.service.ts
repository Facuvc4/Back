import bcrypt from 'bcrypt';
import User from '../../models/user.model';
import errorHelper from '../../helpers/error.helper';

const main = async (username: string, password: string) => {
  try {
    const hashPassowrd = await bcrypt.hash(password, 10);
    await User.create({ username: username, password: hashPassowrd });
  } catch (error) {
    errorHelper.badRequestError('User already exists');
  }
};

export default main;
