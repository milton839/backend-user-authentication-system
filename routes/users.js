const { getUsers, getUserById, postCreateUser, deleteUsersById, patchUsersById, putUsersById} = require('../controller/users');

const router = require('express').Router();

/**
 * Get user by id/email
 */
router.get('/:userId', getUserById)
router.patch('/:userId', patchUsersById)
router.put('/:userId', putUsersById)
router.delete('/:userId', deleteUsersById)
router.post('/', postCreateUser)
router.get('/', getUsers)

module.exports = router;