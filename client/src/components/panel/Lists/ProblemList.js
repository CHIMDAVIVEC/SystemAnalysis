import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProblemContext } from '../../../context/problem/problemContext';
import { checkRole } from '../../../helpers/checkAuth';
import HOC from '../HOC';
import ProblemTable from './Tables/ProblemTable';
import Loader from '../../Loader/Loader';

const index = '3';
function ProblemList() {
  const { problems, loading } = useContext(ProblemContext).state;
  const { fetchProblems } = useContext(ProblemContext);

  useEffect(() => {
    async function getData() {
      await fetchProblems();
    }

    getData();
  }, []);

  return (
    <div>
      {checkRole() === 'analyst' && (
        <Link
          to="/add-new-problem"
          className="btn btn-primary float-right cursor-pointer mb-2 "
        >
          Добавить проблему
        </Link>
      )}
      {!loading ? <ProblemTable data={problems} /> : <Loader />}
    </div>
  );
}

export default HOC(ProblemList, index);
