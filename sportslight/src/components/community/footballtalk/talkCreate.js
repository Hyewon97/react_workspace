import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { talkActions } from '../../../reduxs/actions/talkAction';
import { useDispatch, useSelector } from 'react-redux';
import style from './talkCreate.module.css';

const TalkCreate = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    leagueNum: '',
    talkTitle: '',
    talkContent: '',
    filename: null,
  });

  const { leagueNum, talkTitle, talkContent, filename } = inputs;

  const { talkNum } = useParams();

  const talkpageDto = useSelector((state) =>
    state.talk.talkpageDto ? state.talk.talkpageDto : { currentPage: 1 }
  );

  const handleLeagueChange = (e) => {
    setInputs((prev) => {
      return { ...prev, leagueNum: e.target.value };
    });
  };

  const handleValueChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  //첨부파일
  const handleFileChange = (e) => {
    e.preventDefault();
    setInputs({ ...inputs, [e.target.name]: e.target.files[0] });
  };

  //글쓰기 등록 버튼
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(); //첨부파일이 있으면 FormData에 담아서 넘기기
    formData.append('leagueNum', leagueNum);
    formData.append('talkTitle', talkTitle);
    formData.append('talkContent', talkContent);
    formData.append('memberNum', localStorage.getItem('memberNum'));

    console.log('filename:', filename);

    //첨부파일이 있으면
    if (filename != null) formData.append('filename', filename);

    // config
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: localStorage.getItem('Authorization'),
      },
    };

    console.log(localStorage.getItem('Authorization'));
    await dispatch(talkActions.talkCreate(formData, config));

    //state에 저장되어있는 것들 초기화
    setInputs({
      leagueNum: '',
      talkTitle: '',
      talkContent: '',
      filename: null,
    });

    navigator(
      `/footballtalk/list/${
        talkpageDto.currentPage ? talkpageDto.currentPage : { currentPage: 1 }
      }`
    ); //페이지값 넘기기 (답변글이면 답변글로, 아니면 1페이지로 이동)
  };

  return (
    <form className={style.wrap} onSubmit={onSubmit}>
      <div className={style.createitle}></div>
      <table>
        <tbody>
          <tr>
            <td>글쓴이</td>
            <td>
              <input
                type='type'
                readOnly
                value={localStorage.getItem('memberProfile')}
                name='memberProfile'
              />
            </td>
          </tr>
          <tr>
            <td style={{ paddingBottom: '40px' }} width='20%' align='center'>
              리그
            </td>
            <td>
              <select value={leagueNum} onChange={handleLeagueChange}>
                <option value={null}>리그 선택</option>
                <option value={1}>프리미어리그</option>
                <option value={2}>라리가</option>
                <option value={3}>분데스리가</option>
                <option value={4}>세리에 A</option>
                <option value={5}>리그 1</option>
                <option value={6}>챔피언스리그</option>
                <option value={7}>유로파리그</option>
                <option value={8}>K리그1</option>
                <option value={9}>K리그2</option>
              </select>
            </td>
          </tr>

          <tr>
            <td style={{ color: 'white' }} width='20%' align='center'>
              제목
            </td>
            <td style={{ paddingBottom: '20px' }}>
              <div>
                <input
                  name='talkTitle'
                  className={style.talktitle}
                  cols='40'
                  value={talkTitle}
                  onChange={handleValueChange}
                  placeholder='제목을 입력해주세요.'
                ></input>
              </div>
            </td>
          </tr>
          <tr>
            <td
              style={{ paddingBottom: '30px', color: 'white' }}
              width='20%'
              align='center'
            >
              첨부파일
            </td>
            <td>
              <input
                type='file'
                name='filename'
                id='filepath'
                onChange={handleFileChange}
              />
            </td>
          </tr>
          <tr>
            <td style={{ color: 'white' }} width='20%' align='center'>
              내용
            </td>
            <td>
              <div className={style.createtectarea}>
                <textarea
                  name='talkContent'
                  className={style.talkContent}
                  rows='13'
                  cols='40'
                  value={talkContent}
                  onChange={handleValueChange}
                  placeholder='내용을 입력해주세요'
                ></textarea>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Link
        className='btn btn-primary'
        to={`/footballtalk/list/${talkpageDto.currentPage}`}
      >
        목록
      </Link>
      <input type='submit' className='btn btn-primary' value='등록' />
    </form>
  );
};

export default TalkCreate;
