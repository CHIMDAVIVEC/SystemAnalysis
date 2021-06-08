/* eslint-disable */
const mongoose = require('mongoose');
const {
  getProblems,
  getSingleProblemService,
  getAndEditProblem
} = require('../services/problem.services');

const Problem = require('../models/Problem');

//Добавление новой проблемы
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
    data.scale = req.body.scale;
    
    req.body.experts.forEach((item) => {
      data.experts.push({ id: item.id, R: item.R });
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

//Получение списка всех проблем
const getAllProblems = async (req, res) => {
  try {
    const totalProblems = await getProblems({});

    return res.status(200).json({ data: totalProblems });
  } catch (err) {
    return res.status(400).json({ error_msg: err.message });
  }
};

//Получение данных конкретной проблемы
const getSingleProblem = async (req, res) => {
  try {
    const problem = await getSingleProblemService({ _id: req.params.id });
    return res.status(200).json({ data: problem });
  } catch (err) {
    return res.status(400).json({ error_msg: err.message });
  }
};

//Редактирование проблемы
const editProblem = async (req, res) => {
  try {
    const temp = { experts: [], alternatives: [] };
    req.body.experts.forEach((item) => {
      temp.experts.push({ id: item.id, R: item.R });
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

//Задание статуса "Решена"
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

//Задание решения проблемы
//Расчет взвешенных оценок альтернатив в соответствии с алгоритмом конкретного метода
async function setSolutions(problem, method, data) {
  try {
    let array = [];
    const altlen = problem.alternatives.length;
    const explen = problem.experts.length;
    switch (method) {
      //Метод парных сравнений
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
          problem.alternatives[i].result.method1 = C[i] / R;
        }
        return problem;
      }
      //Метод взвешенных экспертных оценок
      case '2': {
        const totalExperts = problem.experts;

        array = [];
        const R = [];

        for (let i = 0; i < explen; i += 1) {
          array.push(totalExperts[i].solutions.method2.values);
          R.push(totalExperts[i].R);
        }

        const S = [];
        let sumR = 0;
        for (let i = 0; i < explen; i += 1) sumR += R[i];

        for (let i = 0; i < explen; i += 1) S.push(R[i] / sumR);

        for (let j = 0; j < altlen; j += 1) {
          problem.alternatives[j].result.method2 = 0;
          for (let i = 0; i < explen; i += 1)
            problem.alternatives[j].result.method2 += array[i][j] * S[i];
        }
        return problem;
      }
      //Метод предпочтений
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
          problem.alternatives[j].result.method3 = 0;
        }
        for (let j = 0; j < altlen; j += 1) {
          problem.alternatives[j].result.method3 += parseFloat(
            (L[j] / sumL).toFixed(3)
          );
        }

        return problem;
      }
      //Метод ранга
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
          problem.alternatives[j].result.method4 = Rij / explen;
          Rij = 0;
        }
        return problem;
      }
      //Метод полного попарного сопоставления
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
          problem.alternatives[i].result.method5 = sumNorm;

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

//Изменение статуса и прогресса решения проблемы конкретным методом
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
    if (problem.progress > 100) problem.progress = 100;
    if (problem.progress === 100) problem.status = 'Решена';
    return problem;
  } catch (err) {
    return err;
  }
}

//Изменение оценок экспертом конкретным методом
const editProblemSolution = async (req, res) => {
  try {
    const id = req.body.problemId;
    const { method } = req.body;
    const me = req.body.expert;
    const data = req.body.solution;
    const solved = req.body.solved;
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
      size += 1;
      if (req.body.R !== 0.0) counter += 1;
    }

    let oldProgress = 0;
    let newProgress = 0;
    newProgress = (counter / size) * 100;
    if (solved === 0) newProgress -= 1;
    let R = 0.0;
    problem.experts.forEach((item) => {
      if (item.id + '' === me + '') {
        eval(`item.solutions.method${method}.values = data`);
        eval(`oldProgress = item.solutions.method${method}.progress`);
        eval(`item.solutions.method${method}.progress = newProgress`);
        eval(`R = item.R`);
      }
    });

    problem = setStatusAndProgress(problem, method, newProgress, oldProgress);

    const flag = problem.experts.filter(
      (exp) => eval(`exp.solutions.method${method}.progress`) !== 100
    );
    if (flag.length === 0 || (method === '1' && newProgress === 100)) {
      if (method === '2' && R !== 0.0) {
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

//Удаление проблемы
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
