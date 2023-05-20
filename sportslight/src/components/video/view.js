import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import ModalPop from "../modal/modal";
import "./view.css";
import emptyHeartImage from "../images/hearts.png";
import filledHeartImage from "../images/emptyHearts.png";
import emptyStarImage from "../images/emptyStar.png";
import filledStarImage from "../images/star.png";

// react-youtube 설치 필요
function View() {
  // useParams 통한 videoNum 숫자 대입
  const { videoNum } = useParams();

  // video 데이터 useState
  const [videoData, setVideoData] = useState({});

  // 좋아요 즐겨찾기 useState
  const [isHeartChecked, setIsHeartChecked] = useState(false);
  const [isFavoriteChecked, setIsFavoriteChecked] = useState(false);

  // videoBoard useState
  const [videoBoardData, setVideoBoardData] = useState([]);

  // 댓글 수정 요소 숨기기 useState
  const [isHidden, setIsHidden] = useState(true);

  const handleButtonClick = () => {
    setIsHidden(!isHidden);
  };

  // modalPop용 useState
  const [isOpen, setisOpen] = useState(false);
  const [data, setData] = useState({});

  // input useState
  const [input, setInput] = useState({
    videoBoardNum: 0,
    videoNum: Number(videoNum),
    memberNum: localStorage.getItem("memberNum") * 1,
    videoReply: "",
    videoUpdateReply: "",
  });

  // input 초기화 함수
  const setInputReset = () => {
    setInput({
      videoBoardNum: 0,
      videoNum: Number(videoNum),
      memberNum: localStorage.getItem("memberNum") * 1,
      videoReply: "",
      videoUpdateReply: "",
    });
  };

  // input 제어 변수
  const { videoBoardNum, memberNum, videoReply, videoUpdateReply } = input;

  // youtube 설정
  const opts = {
    height: "800",
    width: "100%",
    // playerVars: {
    //   autoplay: 1,
    // },
  };

  // config
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: localStorage.getItem("Authorization"),
    },
  };

  // videoData 요청
  const getVideoData = async () => {
    const formData = new FormData();
    formData.append("videoNum", videoNum);
    formData.append("memberNum", memberNum);
    const response = await axios.post(
      `http://localhost:8090/view/${videoNum}`,
      formData,
      config
    );
    const videoUrl = response.data.video.videoUrl;
    const videoId = extractVideoId(videoUrl);
    setVideoData({ ...response.data.video, videoId });
    setVideoBoardData([...response.data.videoBoard]);

    // 좋아요 즐겨찾기 정보

    if (response.data.heart !== null) {
      setIsHeartChecked(true);
    } else {
      setIsHeartChecked(false);
    }

    if (response.data.favorite !== null) {
      setIsFavoriteChecked(true);
    } else {
      setIsFavoriteChecked(false);
    }
  };

  // videoUrl에서 videoId 추출
  const extractVideoId = (videoUrl) => {
    const regex = /v=([a-zA-Z0-9_-]{11})/;
    const match = videoUrl.match(regex);
    if (match) {
      return match[1];
    }
    return null;
  };

  // input 이벤트 핸들러
  const handleValueChange = (e) => {
    e.preventDefault();
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  // 좋아요 추가 / 삭제
  const handleHeart = async () => {
    const formData = new FormData();
    formData.append("videoNum", videoNum);
    formData.append("memberNum", memberNum);
    formData.append("isHeartChecked", isHeartChecked);

    axios
      .post(`http://localhost:8090/view/heart`, formData, config)
      .then(() => {
        getVideoData();
      });
    setIsHeartChecked(!isHeartChecked);
  };

  // 즐겨찾기 추가 / 삭제
  const handleFavorite = async () => {
    const formData = new FormData();
    formData.append("videoNum", videoNum);
    formData.append("memberNum", memberNum);
    formData.append("isFavoriteChecked", isFavoriteChecked);

    axios
      .post(`http://localhost:8090/view/favorite`, formData, config)
      .then(() => {
        getVideoData();
      });
    setIsFavoriteChecked(!isFavoriteChecked);
  };

  // 리스트 10개씩 출력
  const [showMore, setShowMore] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 10;

  const handleShowMore = () => {
    if (startIndex > videoBoardNum.length) {
      setShowMore(true);
    }
    setStartIndex((startIndex) => startIndex + itemsPerPage);
  };

  const visibleItems = showMore
    ? videoBoardData.slice(0, videoBoardData.length)
    : videoBoardData.slice(0, startIndex + itemsPerPage);

  const allItemsShown = startIndex + 10 >= videoBoardData.length;

  // 한줄 입력
  const insertReply = async (e) => {
    e.preventDefault();

    if (videoReply === "") {
      setData("댓글을 입력해주세요.");
      return setisOpen(true);
    }

    const formData = new FormData();
    formData.append("videoNum", videoNum);
    formData.append("memberNum", memberNum);
    formData.append("videoReply", videoReply);

    await axios
      .post(`http://localhost:8090/view/insertboard`, formData, config)
      .then((response) => {
        setInputReset();
        showResult(response.data);
        // setisOpen(true);
        getVideoData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const showResult = (data) => {
    if (data.String !== "댓글 입력 성공") {
      // return alert(`${data.String}`);
      setisOpen(true);
      return setData(data.String);
    }
  };

  // 한줄 수정
  const updateReply = async (e) => {
    e.preventDefault();
    const videoBoardNum = e.target.elements.videoBoardNum.value;

    if (videoUpdateReply === "") {
      setData("댓글을 입력해주세요.");
      return setisOpen(true);
    }

    const formData = new FormData();
    formData.append("videoBoardNum", videoBoardNum);
    formData.append("videoReply", videoUpdateReply);

    await axios
      .post(`http://localhost:8090/view/updateboard`, formData, config)
      .then(() => {
        setInputReset();
        getVideoData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // 한줄 삭제
  const deleteReply = async (e) => {
    e.preventDefault();
    const videoBoardNum = e.target.elements.videoBoardNum.value;

    const formData = new FormData();
    formData.append("videoBoardNum", videoBoardNum);

    await axios
      .post(`http://localhost:8090/view/deleteboard`, formData, config)
      .then(() => {
        getVideoData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //useEffect
  useEffect(() => {
    getVideoData();
  }, []);

  //JSX-------------------------------------------------------------------
  return (
    <>
      <section className="viewBackground">
        {/* 비디오 데이터 출력 */}
        <div style={{ width: "80%", marginLeft: "7%" }}>
          <div className="viewVideo">
            <YouTube videoId={videoData.videoId} opts={opts} />
          </div>
          <div className="viewView">
            <h3 className="viewTitle">{videoData.videoName}</h3>
            {/* 좋아요 즐겨찾기 */}
            <div className="loveLike">
              <div className="heartHeart">
                <div className="likeContainer">
                  <input
                    id="heartCheckbox"
                    type="checkbox"
                    checked={isHeartChecked}
                    onChange={handleHeart}
                  ></input>
                  <img
                    src={isHeartChecked ? emptyHeartImage : filledHeartImage}
                    alt="heart"
                    onClick={handleHeart}
                    style={{ width: "22px" }}
                  />
                </div>
              </div>

              <div className="favFav">
                <div className="likeContainer">
                  <input
                    id="favoriteCheckbox"
                    type="checkbox"
                    checked={isFavoriteChecked}
                    onChange={handleFavorite}
                  ></input>
                  <img
                    src={isFavoriteChecked ? filledStarImage : emptyStarImage}
                    alt="favorite"
                    onClick={handleFavorite}
                    style={{ width: "25px", marginLeft: "3px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 한줄 input */}
        <div style={{ width: "1200px", margin: "0 auto" }}>
          <form onSubmit={insertReply}>
            <input
              className="replyInput"
              type="text"
              name="videoReply"
              placeholder="내용을 입력하세요."
              onChange={handleValueChange}
              value={videoReply}
            ></input>
            <input
              style={{ marginLeft: "20px" }}
              className="replybutton"
              type="submit"
              value="등록"
            ></input>
          </form>
          <ModalPop
            isOpen={isOpen}
            data={data}
            Confirm={() => setisOpen(false)}
          />
        </div>

        {/* map으로 댓글 리스트로 정렬 */}
        <div
          style={{
            width: "1200px",
            margin: "0 auto",
            paddingBottom: "100px",
          }}
        >
          <ul>
            {visibleItems.map((data, idx) => (
              <li key={idx} className="replyStart">
                <div className="memberNameReply">{data.memberProfile}</div>
                <div className="replyUpdateDelete">
                  <div className="videoReplyy">{data.videoReply}</div>
                  {/* 같은 memberNum인 작성글의 수정/ 삭제 기능 */}
                  {data.memberNum === memberNum && (
                    <div className="replyButtons">
                      {/* 수정 */}
                      <button
                        onClick={handleButtonClick}
                        style={{ color: "darkgray" }}
                      >
                        수정
                      </button>
                      <div style={{ display: isHidden ? "none" : "block" }}>
                        <form onSubmit={updateReply}>
                          <input
                            type="text"
                            value={data.videoBoardNum}
                            name="videoBoardNum"
                            hidden
                            readOnly
                          ></input>
                          <input
                            type="text"
                            name="videoUpdateReply"
                            placeholder="내용을 입력하세요."
                            onChange={handleValueChange}
                            value={videoUpdateReply}
                            className="updateReply"
                          ></input>
                          <input
                            type="submit"
                            value="수정하기"
                            style={{
                              backgroundColor: "black",
                              outline: "none",
                              border: "none",
                              color: "darkgray",
                            }}
                          ></input>
                        </form>
                      </div>
                      {/* 삭제 */}
                      <form onSubmit={deleteReply}>
                        <input
                          type="text"
                          value={data.videoBoardNum}
                          name="videoBoardNum"
                          hidden
                          readOnly
                        ></input>
                        <input
                          className="replyButtons"
                          type="submit"
                          value="댓글삭제"
                          style={{
                            backgroundColor: "black",
                            outline: "none",
                            border: "none",
                            color: "darkgray",
                            display: "inline",
                            borderLeft: "1px solid darkgrey",
                          }}
                        ></input>
                      </form>
                      <br />
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
          {!showMore &&
            videoBoardData.length > itemsPerPage &&
            !allItemsShown && <button onClick={handleShowMore}>더보기</button>}
          {allItemsShown && (
            <p className="replyAll">모든 댓글을 불러왔습니다.</p>
          )}
        </div>
      </section>
    </>
  );
}

export default View;
