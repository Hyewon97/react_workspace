import { Link } from "react-router-dom";

const TableRow = (props) => {
  const { notice } = props;

  return (
    <tr>
      <td>{notice.noticeNum}</td>
      <td>
        <Link to={`/admin/notice/view/${notice.noticeNum}`}>
          {notice.noticeTitle}
        </Link>
      </td>
      <td>
        {notice["adminzDTO"] ? notice["adminzDTO"]["adminProfile"] : null}
      </td>
      <td>{notice.writeDate}</td>
    </tr>
  );
};

export default TableRow;
