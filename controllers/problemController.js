/* eslint-disable no-restricted-syntax */
const mongoose = require('mongoose');
const {
  getProblems,
  getSingleProblemService,
  getAndEditProblem
} = require('../services/problem.services');
const { getUsers } = require('../services/user.services');

const Problem = require('../models/Problem');

const addProblem = async (req, res) => {
  try {
    const nameExist = await Problem.findOne({ name: req.body.name });
    if (nameExist) {
      return res
        .status(400)
        .json({ error_msg: 'Проблема с таким названием уже существует!' });
    }

    const data = new Problem();
    data.name = req.body.name;
    data.formulation = req.body.formulation;

    req.body.experts.forEach((item) => {
      data.experts.push({ id: item });
    });

    data.analyst = req.body.analyst;

    req.body.alternatives.forEach((item, index) => {
      data.alternatives.push({ id: index, formulation: item });
    });

    const savedProblem = await data.save();
    return res.status(201).json({ data: savedProblem });
  } catch (err) {
    return res.status(400).json({ error_msg: err.message });
  }
};

const getAllProblems = async (req, res) => {
  try {
    const totalProblems = await getProblems({});

    return res.status(200).json({ data: totalProblems });
  } catch (err) {
    return res.status(400).json({ error_msg: err.message });
  }
};

const getSingleProblem = async (req, res) => {
  try {
    const problem = await getSingleProblemService({ _id: req.params.id });
    return res.status(200).json({ data: problem });
  } catch (err) {
    return res.status(400).json({ error_msg: err.message });
  }
};

const editProblem = async (req, res) => {
  try {
    const temp = { experts: [], alternatives: [] };

    req.body.experts.forEach((item) => {
      temp.experts.push({ id: item });
    });

    req.body.alternatives.forEach((item, index) => {
      temp.alternatives.push({ id: index, formulation: item });
    });

    const data = {
      ...req.body,
      experts: temp.experts,
      alternatives: temp.alternatives
    };
    const { _id } = req.body;
    const problem = await getAndEditProblem({ _id }, data);
    return res.json({ data: problem });
  } catch (err) {
    return res.status(400).json({ error_msg: err.message });
  }
};

const setSolved = async (req, res) => {
  try {
    const data = {
      ...req.body
    };
    const { _id } = req.body;
    const problem = await getAndEditProblem({ _id }, data);
    return res.json({ data: problem });
  } catch (err) {
    return res.status(400).json({ error_msg: err.message });
  }
};

async function setSolutions(problem, method, data) {
  try {
    let array = [];
    const altlen = problem.alternatives.length;
    const explen = problem.experts.length;
    switch (method) {
      case '1': {
        let R = 0;
        const C = [];
        let Ci = 0;
        for (let i = 0; i < altlen; i += 1) {
          for (let k = 0; k < altlen; k += 1) {
            Ci += data[i][k];
            R += data[i][k];
          }
          C.push(Ci);
          Ci = 0;
        }
        for (let i = 0; i < altlen; i += 1) {
          // eslint-disable-next-line no-param-reassign
          problem.alternatives[i].result.method1 = C[i] / R;
        }
        return problem;
      }
      case '2': {
        const totalUsers = await getUsers({});
        const totalExperts = [];
        for (let i = 0; i < totalUsers.length; i += 1) {
          for (
            let k = 0;
            k < problem.experts.length;
            k += 1 // eslint-disable-next-line no-underscore-dangle
          ) {
            // eslint-disable-next-line no-underscore-dangle
            if (problem.experts[k].id + '' === totalUsers[i]._id + '') {
              // eslint-disable-next-line no-underscore-dangle
              totalExperts.push(totalUsers[i]);
            }
          }
        }
        // eslint-disable-next-line no-case-declarations
        array = [];
        const R1 = [];
        const R2 = [];
        for (let i = 0; i < explen; i += 1) {
          R1.push(totalExperts[i].rating);
        }
        for (let i = 0; i < explen; i += 1) {
          array.push(problem.experts[i].solutions.method2.values);
          R2.push((0.1 * problem.experts[i].Ru + problem.experts[i].Ra) / 2);
        }
        const S1 = [];
        const S2 = [];
        let sumR1 = 0;
        let sumR2 = 0;
        for (let i = 0; i < explen; i += 1) {
          sumR1 += R1[i];
          sumR2 += R2[i];
        }
        for (let i = 0; i < explen; i += 1) {
          S1.push(R1[i] / sumR1);
          S2.push(R2[i] / sumR2);
        }
        for (let j = 0; j < altlen; j += 1) {
          problem.alternatives[j].result.method2 = 0;
          problem.alternatives[j].result.method3 = 0;
          for (let i = 0; i < explen; i += 1) {
            // eslint-disable-next-line no-param-reassign
            problem.alternatives[j].result.method2 += array[i][j] * S1[i];
            // eslint-disable-next-line no-param-reassign
            problem.alternatives[j].result.method3 += array[i][j] * S2[i];
          }
        }
        return problem;
      }
      case '3': {
        array = [];
        for (let i = 0; i < explen; i += 1) {
          array.push(problem.experts[i].solutions.method3.values);
        }
        const K = [];
        const Ki = [];
        let Kj = 0;
        for (let i = 0; i < explen; i += 1) {
          for (let j = 0; j < altlen; j += 1) {
            Kj = altlen - array[i][j];
            Ki.push(Kj);
          }
          K.push(Ki);
        }
        const L = [];
        let Lj = 0;
        let sumL = 0;
        for (let j = 0; j < altlen; j += 1) {
          for (let i = 0; i < explen; i += 1) {
            Lj += K[i][j];
          }
          sumL += Lj;
          L.push(Lj);
        }
        for (let j = 0; j < altlen; j += 1) {
          // eslint-disable-next-line no-param-reassign
          problem.alternatives[j].result.method4 = 0;
        }
        for (let j = 0; j < altlen; j += 1) {
          // eslint-disable-next-line no-param-reassign
          problem.alternatives[j].result.method4 += parseFloat(
            (L[j] / sumL).toFixed(3)
          );
        }

        return problem;
      }
      case '4': {
        array = [];
        for (let i = 0; i < explen; i += 1) {
          array.push(problem.experts[i].solutions.method4.values);
        }
        const S = [];
        let Si = 0;
        for (let i = 0; i < explen; i += 1) {
          for (let j = 0; j < altlen; j += 1) {
            Si += array[i][j];
          }
          S.push(Si);
          Si = 0;
        }
        const R = [];
        const Ri = [];
        let Rj = 0;
        let Rij = 0;
        for (let i = 0; i < explen; i += 1) {
          for (let j = 0; j < altlen; j += 1) {
            Rj = array[i][j] / S[i];
            Ri.push(Rj);
          }
          R.push(Ri);
        }
        for (let j = 0; j < altlen; j += 1) {
          for (let i = 0; i < explen; i += 1) {
            Rij += R[i][j];
          }
          // eslint-disable-next-line no-param-reassign
          problem.alternatives[j].result.method5 = Rij / explen;
          Rij = 0;
        }
        return problem;
      }
      case '5': {
        const N = altlen * (altlen - 1);
        array = [];
        for (let i = 0; i < explen; i += 1) {
          array.push(problem.experts[i].solutions.method5.values);
        }
        const F = [];
        const Fk = [];
        let Fki = 0;
        for (let k = 0; k < explen; k += 1) {
          for (let i = 0; i < altlen; i += 1) {
            for (let j = 0; j < altlen; j += 1) {
              Fki += array[k][i][j];
            }
            Fki /= N;
            Fk.push(Fki);
            Fki = 0;
          }
          F.push(Fk);
        }
        let sumNorm = 0;
        for (let i = 0; i < altlen; i += 1) {
          for (let k = 0; k < explen; k += 1) {
            sumNorm += F[k][i];
          }
          // eslint-disable-next-line no-param-reassign
          problem.alternatives[i].result.method6 = sumNorm;

          sumNorm = 0;
        }
        return problem;
      }
      default:
        return 'Smth wrong';
    }
  } catch (err) {
    return err;
  }
}

function setStatusAndProgress(problem, method, newProgress, oldProgress) {
  try {
    let final = 0;
    if (method === '1') {
      final = problem.progress + (newProgress - oldProgress) / 5.0;
    } else {
      final =
        problem.progress +
        (newProgress - oldProgress) / (5.0 * problem.experts.length);
    }

    problem.progress = Math.ceil(final);
    // eslint-disable-next-line no-param-reassign
    if (problem.progress > 100) problem.progress = 100;
    if (problem.progress === 100) problem.status = 'Решена';
    return problem;
  } catch (err) {
    return err;
  }
}

const editProblemSolution = async (req, res) => {
  try {
    const id = req.body.problemId;
    const { method } = req.body;
    const me = req.body.expert;
    const data = req.body.solution;
    let problem = await getSingleProblemService({ _id: id });

    let counter = 0;
    let size = 0;
    if (method !== '1' && method !== '5') {
      for (let i = 0; i < data.length; i += 1) {
        size += 1;
        if (data[i] !== null) counter += 1;
      }
    } else {
      for (let i = 0; i < data.length; i += 1) {
        for (let k = 0; k < data[i].length; k += 1) {
          if (i !== k) {
            size += 1;
            if (data[i][k] !== null) counter += 1;
          }
        }
      }
    }
    if (method === '2') {
      size += 2;
      if (req.body.Ru !== null) {
        counter += 1;
        if (req.body.Ra !== null) counter += 1;
      }
    }
    let oldProgress = 0;
    let newProgress = 0;
    newProgress = (counter / size) * 100;

    problem.experts.forEach((item) => {
      if (item.id + '' === me + '') {
        // eslint-disable-next-line no-eval
        eval(`item.solutions.method${method}.values = data`);
        // eslint-disable-next-line no-eval
        eval(`oldProgress = item.solutions.method${method}.progress`);
        // eslint-disable-next-line no-eval
        eval(`item.solutions.method${method}.progress = newProgress`);
        // eslint-disable-next-line no-param-reassign
        item.Ra = req.body.Ra;
        // eslint-disable-next-line no-param-reassign
        item.Ru = req.body.Ru;
      }
    });

    problem = setStatusAndProgress(problem, method, newProgress, oldProgress);

    const flag = problem.experts.filter(
      (exp) => eval(`exp.solutions.method${method}.progress`) !== 100
    );
    if (flag.length === 0 || (method === '1' && newProgress === 100)) {
      if (method === '2' && req.body.Ra !== null && req.body.Ru !== null) {
        problem = await setSolutions(problem, method, data);
      } else if (method !== '2') {
        problem = await setSolutions(problem, method, data);
      }
    }

    const result = await getAndEditProblem({ _id: id }, problem);
    return res.json({ data: result });
  } catch (err) {
    return res.status(400).json({ error_msg: err.message });
  }
};

const deleteProblem = async (req, res) => {
  try {
    const problem = await getSingleProblemService({ _id: req.params.id });
    const problemId = problem.Id;
    const Counters = mongoose.connection.db.collection('identitycounters');

    await problem.remove();
    await Problem.updateMany({ Id: { $gt: problemId } }, { $inc: { Id: -1 } });
    await Counters.updateOne({ model: 'Problem' }, { $inc: { count: -1 } });

    return res.json({ data: 'Успешно' });
  } catch (err) {
    return res.status(400).json({ error_msg: err.message });
  }
};

module.exports = {
  addProblem,
  getAllProblems,
  getSingleProblem,
  editProblem,
  setSolved,
  deleteProblem,
  editProblemSolution
};
