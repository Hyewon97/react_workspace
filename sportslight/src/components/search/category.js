import Row from "../main/row";
import "./category.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { videoActions } from '../../reduxs/actions/videoActions';

const Category = () => {

  const dispatch = useDispatch();
  const premierList = useSelector((state) => state.video.premierList);
  const championsList = useSelector((state) => state.video.championsList);
  const laligaList = useSelector((state) => state.video.laligaList);
  const bundesligaList = useSelector((state) => state.video.bundesligaList);
  const serieList = useSelector((state) => state.video.serieList);
  const europaList = useSelector((state) => state.video.europaList);
  const league1List = useSelector((state) => state.video.league1List);
  const kOneList = useSelector((state) => state.video.kOneList);
  const kTwoList = useSelector((state) => state.video.kTwoList);

  useEffect(() => {
    dispatch(videoActions.getLeagueVideoList());
  }, []);


  return (
    <div className="leagueWrapper">
      {/*리그영상 리스트 시작*/}
        <div className="league">
          <div className="info">
            <div className="logo">
              <img  className="logo2"
                    src="./images/leagueVideo/premierLeague.png"
                    alt="premierLeague"/>
            </div>
            <span className="title">프리미어리그</span>
          </div>
          <div className="leagueVideoList">
          {premierList ? <Row className="swiper-slide row_swiperSlide__Tkr81" video={[...premierList]} /> : <div></div>}
          </div>
        </div>

        <div className="league">
          <div className="info">
            <div className="logo">
            <img className="logo2"
                    src="./images/leagueVideo/championsLeague.png"
                    alt="championsLeague"/>
            </div>
            <span className="title">챔피언스리그</span>
          </div>
          <div className="leagueVideoList">
            {championsList ? <Row video={[...championsList]} /> : <div></div>}
          </div>
        </div>

        <div className="league">
          <div className="info">
            <div className="logo">
              <img className="logo2"
                    src="./images/leagueVideo/laliga.png"
                    alt="laliga"/>
            </div>
            <span className="title">라리가</span>
          </div>
          <div className="leagueVideoList">
            {laligaList ? <Row video={[...laligaList]} /> : <div></div>}
          </div>
        </div>

        <div className="league">
          <div className="info">
            <div className="logo">
              <img className="logo2"
                    src="./images/leagueVideo/bundesliga-01.png"
                    alt="bundesliga"/>
            </div>
            <span className="title">분데스리가</span>
          </div>
          <div className="leagueVideoList">
            {bundesligaList ? <Row video={[...bundesligaList]} /> : <div></div>}
          </div>
        </div>

        <div className="league">
          <div className="info">
            <div className="logo">
            <img className="logo2"
                    src="./images/leagueVideo/serie.png"
                    alt="serieA"/>
            </div>
            <span className="title">세리에A</span>
          </div>
          <div className="leagueVideoList">
            {serieList ? <Row video={[...serieList]} /> : <div></div>}
          </div>
        </div>

        <div className="league">
          <div className="info">
            <div className="logo">
            <img className="logo2"
                    src="./images/leagueVideo/europaLeague.png"
                    alt="europaLeague"/>
            </div>
            <span className="title">유로파리그</span>
          </div>
          <div className="leagueVideoList">
            {europaList ? <Row video={[...europaList]} /> : <div></div>}
          </div>
        </div>

        <div className="league">
          <div className="info">
            <div className="logo">
            <img className="logo2"
                    src="./images/leagueVideo/Ligue1-01.png"
                    alt="Ligue1"/>
            </div>
            <span className="title">리그1</span>
          </div>
          <div className="leagueVideoList">
            {league1List ? <Row video={[...league1List]} /> : <div></div>}
          </div>
        </div>

        <div className="league">
          <div className="info">
            <div className="logo">
            <img className="logo2"
                    src="./images/leagueVideo/Untitled-3-01.png"
                    alt="kLeague1"/>
            </div>
            <span className="title">K리그 1</span>
          </div>
          <div className="leagueVideoList">
            {kOneList ? <Row video={[...kOneList]} /> : <div></div>}
          </div>
        </div>

        <div className="league">
          <div className="info">
            <div className="logo">
            <img className="logo2"
                    src="./images/leagueVideo/kleague2-01.png"
                    alt="kLeague2"/>
            </div>
            <span className="title">K리그 2</span>
          </div>
          <div className="leagueVideoList">
            {kTwoList ? <Row video={[...kTwoList]} /> : <div></div>}
          </div>
        </div>


    </div> //leagueWrapper end
  );
};

export default Category;
