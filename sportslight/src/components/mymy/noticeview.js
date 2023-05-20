import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './noticeview.module.css';

const NoticeView = () => {
  const navigate = useNavigate();

  const noticeNum = window.location.href.split('/').pop();
  // 공지 useState
  const [notice, setNotice] = useState([]);

  // config
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: localStorage.getItem('Authorization'),
    },
  };

  // 공지 호출
  const getNotice = async () => {
    const response = await axios.get(
      `http://localhost:8090/notice/${noticeNum}`,
      config
    );
    setNotice(response.data);
  };

  // useEffect
  useEffect(() => {
    getNotice();
  }, []);

  return (
    <div className={style.wrap}>
      <div className={style.noticetitle}>
        <p style={{ padding: '50px' }}>공지사항</p>
      </div>

      <table className={style.title}>
        <div className={style.content}>
          <thead>
            <tr className={style.tr2}>
              <td style={{ fontWeight: 'bold' }}>{notice.noticeTitle}</td>
            </tr>
            <tr className={style.tr2}>
              <td style={{ color: '#888888' }}>{notice.writeDate}</td>
            </tr>
          </thead>
        </div>

        <tbody className={style.content2}>
          <tr className={style.tr2}>
            <td>
              <pre style={{ fontSize: '16px', marginLeft: '160px' }}>
                {notice.noticeContent}
              </pre>
            </td>
          </tr>
        </tbody>
        <hr style={{ marginLeft: '160px' }} />
      </table>
      <div className={style.button2}>
        <button className={style.button} onClick={() => navigate(-1)}>
          목록
        </button>
      </div>
    </div>
  );
};

export default NoticeView;
