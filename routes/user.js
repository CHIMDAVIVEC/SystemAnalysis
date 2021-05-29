const router = require('express').Router();
const {
  verifiedFunction: ensureAuth,
  checkAdmin
} = require('./verifyJwtToken');
const {
  getLoggedInUser,
  getAllUsers,
  getSingleUser,
  editUserAction,
  deleteUserAction
} = require('../controllers/userController');

//Описание функций, выполняющихся при получении запроса на указанный путь 
router.get('/', ensureAuth, getAllUsers);
router.get('/me', ensureAuth, getLoggedInUser);

router.get('/active', ensureAuth);
router.get('/single/:id', getSingleUser);
router.get('/delete/:id', [ensureAuth, checkAdmin], deleteUserAction);

router.patch('/edit-user', ensureAuth, editUserAction);

module.exports = router;
