import { Link } from "react-router-dom";

const TableRow = (props) => {
  const { notice } = props;

  return (
    <tr>
      <td>{notice.noticeNum}</td>
      <td>
        <Link
          to={`/admin/notice/view/${notice.noticeNum}`}
          className="linkStyle"
        >
          {notice.noticeTitle}
        </Link>
      </td>
      <td>
        {notice["adminzDTO"]
          ? notice["adminzDTO"]["adminProfile"]
          : "(알 수 없음)"}
      </td>
      <td>{notice.writeDate}</td>
    </tr>
  );
};

export default TableRow;
