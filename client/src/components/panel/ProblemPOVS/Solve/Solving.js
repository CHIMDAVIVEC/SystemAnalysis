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

function Solving(props) {
  const { state, fetchSingleProblem, editProblemSolution } =
    useContext(ProblemContext);
  const { loading, problem } = state;
  const { me } = useContext(UserContext).state;
  const id = props.match.params.id;
  const method = props.match.params.method;

  useEffect(() => {
    fetchSingleProblem(id);
  }, [fetchSingleProblem, id]);

  const getSolutions = () => {
    return eval(
      `problem.experts.find((expert) => expert.id === me._id).solutions.method${method}.values`
    );
  };

  const getRu = () => {
    return eval(`problem.experts.find((expert) => expert.id === me._id).Ru`);
  };

  const getRa = () => {
    return eval(`problem.experts.find((expert) => expert.id === me._id).Ra`);
  };

  const onClick = (values) => {
    let sum = 0;
    let ru = 0;
    if (Array.isArray(values.Ra))
      for (let i = 0; i < values.Ra.length; i += 1) sum += values.Ra[i];
    else sum = getRa();
    if (method === 2) ru = values.Ru;
    else ru = getRu();
    const data = {
      solution: values.solution,
      problemId: id,
      expert: me._id,
      method: method,
      Ra: parseFloat(sum.toFixed(3)),
      Ru: ru
    };
    editProblemSolution(data).then(props.history.goBack());
  };

  return (
    <>
      {problem && me ? (
        (method === '1' && (
          <PairComparisons
            problem={problem}
            onClick={onClick}
            loading={loading}
            array={getSolutions()}
          />
        )) ||
        (method === '2' && (
          <WeightedExperts
            problem={problem}
            onClick={onClick}
            loading={loading}
            array={getSolutions()}
            Ru={getRu()}
          />
        )) ||
        (method === '3' && (
          <Prefences
            problem={problem}
            onClick={onClick}
            loading={loading}
            array={getSolutions()}
          />
        )) ||
        (method === '4' && (
          <Ranks
            problem={problem}
            onClick={onClick}
            loading={loading}
            array={getSolutions()}
          />
        )) ||
        (method === '5' && (
          <CompletePairwises
            problem={problem}
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
