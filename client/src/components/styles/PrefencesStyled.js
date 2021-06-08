import styled from 'styled-components';

//Стиль драг-сортировки
const PrefencesStyled = styled.div`
  tr.drop-over-downward td {
    border-bottom: 2px dashed #1890ff;
  }

  tr.drop-over-upward td {
    border-top: 2px dashed #1890ff;
  }

  .ant-table-thead > tr > th {
    color: black;
    font-weight: 700;
    font-size: 1.2rem;
    text-align: center;
  }
`;

export default PrefencesStyled;
