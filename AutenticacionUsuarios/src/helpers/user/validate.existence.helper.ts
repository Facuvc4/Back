import User from '../../models/user.model';

const main = async (username: string) => {
  const user = await User.findOne({ username });
  if (user) return true;
  return false;
};

export default main;
