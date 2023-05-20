import { useEffect } from 'react';
import Style from './main.module.css';
import Row from './row';
import { useDispatch, useSelector } from 'react-redux';
import { videoActions } from '../../reduxs/actions/videoActions';

const Main = () => {
  const dispatch = useDispatch();
  const videoList = useSelector((state) => state.video.videoList);
  const recommendList = useSelector((state) => state.video.recommendList);
  const shortsList = useSelector((state) => state.video.shortsList);
  const hitsList = useSelector((state) => state.video.hitsList);
  const highlightList = useSelector((state) => state.video.highlightList);

  useEffect(() => {
    dispatch(videoActions.getVideoList());
    // dispatch();
  }, []);

  return (
    <section>
      <div className={Style.mainvideo}>
        <div className>
          <video autoPlay muted loop playsInline width='100%' height='100%'>
            <source
              src='/mainvideo/Arsenal_2022_23_-_The_Season_We_Will_Never_Forget_AdobeExpress (1).mp4'
              type='video/mp4'
            />
          </video>
          <div className={Style.gradientt}></div>
        </div>

        <div className={Style.mainList}>
          <div>
            <p className={Style.title}>선호리그의 최신영상</p>
            <div>
              {videoList ? <Row video={[...videoList]} /> : <div></div>}
            </div>
          </div>
          <div>
            <p className={Style.title}>회원님을 위한 추천영상</p>
            <div>
              {recommendList ? <Row video={[...recommendList]} /> : <div></div>}
            </div>
          </div>
          <div>
            <p className={Style.title}>한국선수 활약상</p>
            <div>
              {shortsList ? <Row video={[...shortsList]} /> : <div></div>}
            </div>
          </div>
          <div>
            <p className={Style.title}>이건 꼭 봐야해 조회수 TOP10</p>
            <div>{hitsList ? <Row video={[...hitsList]} /> : <div></div>}</div>
          </div>
          <div>
            <p className={Style.title}>최근 주요장면 모아보기</p>
            <div>
              {highlightList ? <Row video={[...highlightList]} /> : <div></div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;
