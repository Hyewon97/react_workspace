import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { talkActions } from '../../../reduxs/actions/talkAction';

const TalkUpdate = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { talkNum } = useParams();

  //useState 후크를 사용하여 inputs라는 상태 변수를 정의.
  const [inputs, setInputs] = useState({
    leagueNum: '',
    talkTitle: '',
    talkContent: '',
    filename: null,
  });

  const { leagueNum, talkTitle, talkContent, filename } = inputs;

  //Redux의 useSelector 후크를 사용하여 Redux 스토어에서 현재 게시판 게시물 및 페이지 보기 정보를 가져옴.
  const talk = useSelector((state) => state.talk.talkRead);
  const talkpageDto = useSelector((state) => state.talk.talkpageDto);

  //useEffect 후크는 구성요소가 마운트될 때 inputs 변수의 초기 상태를 현재 보드 포스트로 설정하는 데 사용
  useEffect(() => {
    setInputs(talk);
  }, []);

  const talkUpdate = useSelector((state) => state.talk.talkRead);

  const handleLeagueChange = (e) => {
    setInputs((prev) => {
      return { ...prev, leagueNum: e.target.value };
    });
  };

  //setInputs 함수는 inputs 상태 변수를 새 값으로 업데이트하는 데 사용
  const handleValueChange = (e) => {
    e.preventDefault();
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    setInputs((prev) => {
      return { ...prev, ...nextState };
    });
  };

  //첨부파일 수정
  //setInputs 함수는 inputs 상태 변수를 새 값으로 업데이트하는 데 사용
  const handleFileChange = (e) => {
    e.preventDefault();
    setInputs({ ...inputs, [e.target.name]: e.target.files[0] });
  };

  //handleUpdate 핸들러에서 num, subject, content 및 filename의 현재 값이 새로운 FormData 객체에 추가된 다음 dispatch를 사용하여 Redux 스토어로 발송
  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('talkNum', talkNum);
    formData.append('leagueNum', leagueNum);
    formData.append('talkTitle', talkTitle);
    formData.append('talkContent', talkContent);
    formData.append('currentPage', talkpageDto.currentPage);

    console.log('filename:', filename);

    //첨부파일이 있으면
    if (filename != null) formData.append('filename', filename);

    //config 개체에는 인증 토큰을 포함하여 API 요청에 대한 헤더가 포함
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: localStorage.getItem('Authorization'),
      },
    };

    await dispatch(talkActions.talkUpdate(formData, config));

    setInputs({
      leagueNum: '',
      talkTitle: '',
      talkContent: '',
      filename: null,
    });

    navigator(`/footballtalk/list/${talkpageDto.currentPage}`);
  };

  //수정 취소 버튼
  const handleReset = (e) => {
    e.preventDefault();
    setInputs(talk);
  };

  //수정 뒤로 버튼
  const handleBack = (e) => {
    e.preventDefault();
    navigator(-1);
  };

  //조건에 따라 작성일 포맷 설정
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    if (
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth() &&
      date.getDate() === now.getDate()
    ) {
      //오늘과 연,월,일이 일치할 경우 포맷을 HH:MM 로 설정
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    } else {
      //오늘과 연,월,일이 일치하지 않을 경우 포맷을 YYYY:MM:DD 로 설정
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  };

  return (
    <div>
      <form name='frm' encType='multipart/form-data'>
        <table className='table table-striped' style={{ marginTop: 20 }}>
          <tbody>
            <tr>
              {/* 리그 엠블럼 추가 예정 */}
              <th colSpan='6'>
                {talkUpdate['leagueDto']
                  ? talkUpdate['leagueDto']['leagueName']
                  : null}
              </th>
            </tr>
            <tr>
              <th width='20%'>글쓴이</th>
              <td>
                {talk['membersDto']
                  ? talk['membersDto']['memberProfile']
                  : null}
              </td>
              <th width='20%' align='center'>
                리그 변경
              </th>
              <td>
                <select
                  defaultValue={talk.leagueNum}
                  onChange={handleLeagueChange}
                >
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
              <th width='20%'>작성일</th>
              <td>{formatDate(talk.regDate)}</td>
            </tr>

            <tr>
              <th>제목</th>
              <td colSpan='3'>
                <input
                  type='text'
                  name='talkTitle'
                  id='talkTitle'
                  //defaultValue={talk.talkTitle}
                  value={talkTitle}
                  onChange={handleValueChange}
                />
              </td>
            </tr>

            <tr>
              <th>첨부파일</th>
              <td colSpan='3'>
                <input
                  type='file'
                  name='filename'
                  id='filepath'
                  onChange={handleFileChange}
                />
                <span>
                  {talk.upload
                    ? talk.upload.substring(talk.upload.indexOf('_') + 1) //난수값 제거
                    : null}
                </span>
              </td>
            </tr>

            <tr>
              <th>내용</th>
              <td colSpan='3'>
                <textarea
                  name='talkContent'
                  id='talkContent'
                  rows='13'
                  cols='40'
                  //defaultValue={talk.talkContent}
                  value={talkContent}
                  onChange={handleValueChange}
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>

        <button className='btn btn-primary' onClick={handleUpdate}>
          등록
        </button>
        <button className='btn btn-primary' onClick={handleReset}>
          취소
        </button>
        <button className='btn btn-primary' onClick={handleBack}>
          뒤로
        </button>
      </form>
    </div>
  );
};

export default TalkUpdate;
