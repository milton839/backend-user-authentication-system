const { registerService } = require('../service/auth');
const { findUsers, findUserByProperty, updateUser } = require('../service/user');
const error = require('../utils/error');

const getUsers = async (req, res, next) => {
    /**
     * TODO filter, sort, pagination, select
     */
    try {
        const users = await findUsers();
        return res.status(200).json(users)
    } catch (e) {
        next(e);
    }
}

const getUserById = async (req, res, next) => {
    const id = req.params.userId;
    try {
        const user = await findUserByProperty("_id", id);
        if (!user) {
            throw error("User not found", 404)
        }

            return res.status(200).json(user);
            
        
    } catch (e) {
        next(e);
    }
}

const postCreateUser = async (req, res, next) => {
    const {name, email, password, roles, accountStatus} = req.body;

    try{
        const user = await registerService({name, email, password, roles, accountStatus});
        res.status(201).json(user);
    }catch (e) {
        next(e);
    }
}

const putUsersById = async (req, res, next) => {
    const {userId} = req.params;
    const {name, roles, accountStatus, email} = req.body;

    try{
         const user = await updateUser(userId, {name, roles, accountStatus, email});

         if (!user) {
            throw error("User not found", 404);
        }

        return res.status(200).json(user);
    }
    catch(e){
        next(e);
    }
}

const patchUsersById = async (req, res, next) => {
    const {userId} = req.params;
    const {name, roles, accountStatus} = req.body;

    try{
        const user = await findUserByProperty("_id", userId);

        if (!user) {
            throw error("User not found", 404);
        }

        user.name = name ?? user.name;
        user.roles = roles ?? user.roles;
        user.accountStatus = accountStatus ?? user.accountStatus;

        await user.save();
        return res.status(200).json({message:"User information updated successfully",user});
    }
    catch(e){
        next(e);
    }
}

const deleteUsersById = async (req, res, next) => {
    const {userId} = req.params;

    try{
        const user = await findUserByProperty("_id", userId);

        if (!user) {
            throw error("User not found", 404)
        }

        await user.remove();
        return res.status(203).json({ message: "User removed successfully"});
    }catch(err){
        next(err);
    }
}

module.exports = {
    getUsers,
    getUserById,
    postCreateUser,
    putUsersById,
    patchUsersById,
    deleteUsersById
}