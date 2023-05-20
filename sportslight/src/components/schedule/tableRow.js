import './tableRow.css';

const TableRow = (props) => {
  const { sv } = props;

  return (  
            <tr style={{textAlign : "center"}}>
              <td className="fixed-column">{sv.leagueName}</td>
              <td className='matchDatecolum'>{sv.matchDate}</td>
              <td>{sv.matchTime}</td>
              <td>{sv.matchPlace}</td>
              <td>{sv.teamAName}</td>
              <td>{sv.teamAPoint !== null ? sv.teamAPoint : sv.teamAPoint === 0 ? 0 : '-'}</td>
              <th><span>:</span></th>
              <td>{sv.teamBPoint !== null ? sv.teamAPoint : sv.teamAPoint === 0 ? 0 : '-'}</td>
              <td>{sv.teamBName}</td>
              <td>{sv.matchContent}</td>
            </tr>
  );
};

export default TableRow;
