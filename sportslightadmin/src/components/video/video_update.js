import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { videoActions } from "../../reduxs/actions/video_action";

const VideoUpdate = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { videoNum } = useParams();

  const [inputs, setInputs] = useState({
    videoName: "",
    thumbnailUrl: "",
    videoUrl: "",
    videoType: "",
    teamNum1: "",
    teamNum2: "",
    seasonNum: "",
  });

  const {
    videoName,
    thumbnailUrl,
    videoUrl,
    videoType,
    teamNum1,
    teamNum2,
    seasonNum,
  } = inputs;

  const video = useSelector((state) => state.video.videoDetail);
  const pv = useSelector((state) => state.video.pv);

  useEffect(() => {
    setInputs(video);
  }, []);

  const handleValueChange = (e) => {
    e.preventDefault();
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    setInputs((prev) => {
      return { ...prev, ...nextState };
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("videoNum", videoNum);
    formData.append("videoName", videoName);
    formData.append("thumbnailUrl", thumbnailUrl);
    formData.append("videoUrl", videoUrl);
    formData.append("videoType", videoType);
    formData.append("teamNum1", teamNum1);
    formData.append("teamNum2", teamNum2);
    formData.append("seasonNum", seasonNum);

    formData.append("currentPage", pv.currentPage);

    // 인증토큰을 가져와서 확인함.
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("Authorization"),
      },
    };

    await dispatch(videoActions.getVideoUpdate(formData, config));

    // 초기화 시켜주기 위해서
    setInputs({
      videoName: "",
      thumbnailUrl: "",
      videoUrl: "",
      videoType: "",
      teamNum1: "",
      teamNum2: "",
      seasonNum: "",
    });

    // 글 수정 후 리스트로 이동
    navigator(`/admin/video/list/${pv.currentPage}`);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setInputs(video);
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigator(-1);
  };

  return (
    <div>
      <form name="frm" encType="multipart/form-data">
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <tbody>
            <tr>
              <th width="20%">영상 제목</th>
              <td colSpan="3">
                <input
                  type="text"
                  name="videoName"
                  id="videoName"
                  style={{ width: "80%", height: "100%" }}
                  defaultValue={video.videoName}
                  value={videoName}
                  onChange={handleValueChange}
                />
              </td>
            </tr>

            <tr>
              <th width="20%">썸네일 주소</th>
              <td colSpan="3">
                <input
                  type="text"
                  name="thumbnailUrl"
                  id="thumbnailUrl"
                  style={{ width: "80%", height: "100%" }}
                  defaultValue={video.thumbnailUrl}
                  value={thumbnailUrl}
                  onChange={handleValueChange}
                />
              </td>
            </tr>

            <tr>
              <th width="20%">영상 주소</th>
              <td colSpan="3">
                <input
                  type="text"
                  name="videoUrl"
                  id="videoUrl"
                  style={{ width: "80%", height: "100%" }}
                  defaultValue={video.videoUrl}
                  value={videoUrl}
                  onChange={handleValueChange}
                />
              </td>
            </tr>

            <tr>
              <th width="20%">비디오 타입</th>
              <td colSpan="3">
                <select
                  name="videoType"
                  id="videoType"
                  style={{ width: "5%", height: "100%" }}
                  value={videoType}
                  onChange={handleValueChange}
                >
                  <option value="s">s</option>
                  <option value="l">l</option>
                </select>
              </td>
            </tr>

            <tr>
              <th width="20%">팀1</th>
              <td colSpan="3">
                <input
                  type="text"
                  name="teamNum1"
                  id="teamNum1"
                  style={{ width: "5%", height: "100%" }}
                  defaultValue={video.teamNum1}
                  value={teamNum1}
                  onChange={handleValueChange}
                />
              </td>
            </tr>

            <tr>
              <th width="20%">팀2</th>
              <td colSpan="3">
                <input
                  type="text"
                  name="teamNum2"
                  id="teamNum2"
                  style={{ width: "5%", height: "100%" }}
                  defaultValue={video.teamNum2}
                  value={teamNum2}
                  onChange={handleValueChange}
                />
              </td>
            </tr>

            <tr>
              <th width="20%">시즌 번호</th>
              <td colSpan="3">
                <input
                  type="text"
                  name="seasonNum"
                  id="seasonNum"
                  style={{ width: "5%", height: "100%" }}
                  defaultValue={video.seasonNum}
                  value={seasonNum}
                  onChange={handleValueChange}
                />
              </td>
            </tr>

            {/* <tr>
              <th>내용</th>
              <td colSpan="3">
                <textarea
                  name="videoUrl"
                  id="videoUrl"
                  rows="13"
                  cols="40"
                  defaultValue={video.videoUrl}
                  value={videoUrl}
                  onChange={handleValueChange}
                ></textarea>
              </td>
            </tr> */}
          </tbody>
        </table>

        <button className="btn btn-primary" onClick={handleUpdate}>
          수정
        </button>
        <button className="btn btn-primary" onClick={handleReset}>
          취소
        </button>
        <button className="btn btn-primary" onClick={handleBack}>
          뒤로
        </button>
      </form>
    </div>
  );
};

export default VideoUpdate;