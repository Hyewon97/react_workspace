import "./searchVideo.css";
import { Link } from "react-router-dom";


//검색 결과 출력 페이지 동영상 컴포넌트
const SearchVideo = ({ video }) => {
  return (
    <div className="searchResultWrapper">
      <div className="search-result">
          {video?.map((v) => {
              return (
                <Link to={`/view/${v.videoNum}`}>
                  <div className="search-result-item" key={v.videoNum}>
                      <img src={v.thumbnailUrl} alt={v.videoName} />
                      <h3>{v.videoName}</h3>
                  </div>
                </Link>
              );
          })}
      </div>
    </div>
      
  );
};


export default SearchVideo;