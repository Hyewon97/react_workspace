const TableRow = (props) => {
  const { board } = props;

  return (
    <tr>
      <td>{board.num}</td>
      <td>{board.subject}</td>
      <td>{board.reg_date}</td>
      <td>{board.readcount}</td>
    </tr>
  );
};

export default TableRow;
