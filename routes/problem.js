const router = require('express').Router();
const { verifiedFunction: ensureAuth } = require('./verifyJwtToken');
const {
  addProblem,
  getAllProblems,
  getSingleProblem,
  editProblem,
  setSolved,
  editProblemSolution,
  deleteProblem
} = require('../controllers/problemController');

router.get('/', ensureAuth, getAllProblems);

router.get('/single/:id', getSingleProblem);
router.get('/delete/:id', [ensureAuth], deleteProblem);

router.post('/add', addProblem);
router.patch('/edit', ensureAuth, editProblem);
router.patch('/solved', ensureAuth, setSolved);
router.patch('/solution', ensureAuth, editProblemSolution);

module.exports = router;
