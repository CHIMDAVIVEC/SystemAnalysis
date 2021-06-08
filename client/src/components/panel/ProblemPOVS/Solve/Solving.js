import React, { useContext, useEffect } from 'react';
import { ProblemContext } from '../../../../context/problem/problemContext';
import { UserContext } from '../../../../context/user/userContext';

import CompletePairwises from './Methods/CompletePairwises';
import PairComparisons from './Methods/PairComparisons';
import Prefences from './Methods/Prefences';
import Ranks from './Methods/Ranks';
import WeightedExperts from './Methods/WeightedExperts';

import Loader from '../../../Loader/Loader';
import HOC from '../../HOC';
import MissingPage from '../../../errors/404';

//Страница решения проблемы
function Solving(props) {
  const { state, fetchSingleProblem, editProblemSolution } =
    useContext(ProblemContext);
  const { loading, problem } = state;
  const { me } = useContext(UserContext).state;
  const id = props.match.params.id;
  const method = props.match.params.method;

  useEffect(() => {
    async function fetchData() {
      await fetchSingleProblem(id);
    }
    fetchData();
  }, [fetchSingleProblem, id]);

  const getSolutions = () => {
    return eval(
      `problem.experts.find((expert) => expert.id === me._id).solutions.method${method}.values`
    );
  };

  const onClick = (values, solved) => {
    const data = {
      solution: values.solution,
      problemId: id,
      expert: me._id,
      method: method,
      solved: solved
    };
    editProblemSolution(data).then(props.history.goBack());
  };

  function shuffle() {
    let a = problem.alternatives;
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    const data = {...problem, alternatives: a}
    return data;
  }

  return (
    <>
      {problem && me ? (
        (method === '1' && (
          <PairComparisons
            problem={shuffle()}
            onClick={onClick}
            loading={loading}
            array={getSolutions()}
          />
        )) ||
        (method === '2' && (
          <WeightedExperts
            problem={shuffle()}
            onClick={onClick}
            loading={loading}
            array={getSolutions()}
          />
        )) ||
        (method === '3' && (
          <Prefences
            problem={shuffle()}
            onClick={onClick}
            loading={loading}
            array={getSolutions()}
          />
        )) ||
        (method === '4' && (
          <Ranks
            problem={shuffle()}
            onClick={onClick}
            loading={loading}
            array={getSolutions()}
          />
        )) ||
        (method === '5' && (
          <CompletePairwises
            problem={shuffle()}
            onClick={onClick}
            loading={loading}
            array={getSolutions()}
          />
        )) || <MissingPage />
      ) : (
        <Loader />
      )}
    </>
  );
}

export default HOC(Solving);
