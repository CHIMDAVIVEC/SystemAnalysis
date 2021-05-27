const Problem = require('../models/Problem');

const getProblem = async (query) => {
  try {
    const problem = await Problem.findOne(query).select('+password');
    if (!problem) {
      throw Error('Такой проблемы не найдено');
    }

    return problem;
  } catch (err) {
    throw Error(err);
  }
};

const getAndEditProblem = async (query, newData) => {
  try {
    const problem = await Problem.findOneAndUpdate(query, newData, {
      new: true,
      runValidators: true
    });

    return problem;
  } catch (err) {
    throw Error(err);
  }
};

const getSingleProblemService = async (query) => {
  try {
    const problem = await Problem.findOne(query).select('+password');
    return problem;
  } catch (err) {
    throw Error(err);
  }
};

const getProblems = async (query) => {
  try {
    const problems = await Problem.find(query);
    return problems;
  } catch (err) {
    throw Error(err);
  }
};

module.exports = {
  getProblem,
  getProblems,
  getSingleProblemService,
  getAndEditProblem
};
