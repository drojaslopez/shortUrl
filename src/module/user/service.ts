import { Users } from "./schema";

const getUseById = async (id: string) => {
  const users = await Users.findByPk(id);
  return users;
};

const getUsers = async () => {
  const users = await Users.findAll();
  return users;
};

const getUseByEmail = async (email: string) => {
  const users = await Users.findOne({
    where: { email: email,
    },
  });
  return users;
};

const createUser = async (email: string, password: string, fullName: string, profile: string) => {
  try {
    return await Users.create({ email, password, fullName, profile });
  } catch (error) {
    console.error(`User not create: ${email}`);
    throw new Error("User not create");
  }
};

const updateUser = async (id: string, email: string, password: string, fullName: string, profile: string) => {
  try {
    const updated = await Users.update(
      { email, password, fullName, profile },
      { where: { id }, individualHooks: true }
    );
    if (updated[0] === 0) {
      throw new Error("User does not exists");
    }
    return await Users.findByPk(id);
  } catch (error) {
    console.error("User not update:");
    throw new Error("User not update");
  }
};

const deleteUser = async (id: string) => {
  try {
    const userSelect = await Users.findByPk(id);
    await userSelect?.destroy();
    return userSelect;
  } catch (error) {
    console.error("User not delete:");
    throw new Error("User not delete:");
  }
};

export const userService = {
  createUser,
  getUseById,
  getUsers,
  getUseByEmail,
  updateUser,
  deleteUser,
};
