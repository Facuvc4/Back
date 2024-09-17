import User from '../../models/user.model';
import bcrypt from 'bcrypt';
import errorHelper from '../../helpers/error.helper';
import jwt from 'jsonwebtoken';

const main = async (username: string, password: string) => {
  const user = await User.findOne({ username });
  if (!user) errorHelper.notFoundError('User not found');
  const isValid = await bcrypt.compare(password, user?.password ?? '');
  if (!isValid) errorHelper.badRequestError('Wrong password');

  const token = jwt.sign({ username }, 'secret', { expiresIn: '1h' });
  return token;
};

export default main;
