import User from '../models/user.model';

export const findUserByEmail = async (email: string) => {
  const user = await User.findOne({ email });
  return user;
};

export const createNewUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password,
  });
  return newUser;
};
