import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { videoActions } from '../../reduxs/actions/videoActions';
import SearchVideo from "./searchVideo";
import { useLocation } from 'react-router-dom';


const Search = () => {
    const dispatch = useDispatch();
    const searchList = useSelector((state) => state.video.searchList);
    const location = useLocation();
    const searchWord = new URLSearchParams(location.search).get('q');

    useEffect(() => {
      if (searchWord?.length > 0) {
        dispatch(videoActions.getSearchList(searchWord));
        console.log('searchWord >>  ',searchWord);
        console.log(searchList);
      }
    }, [dispatch, searchWord ]);

  return (
        
    <div style={{backgroundColor:"black", overflow: "auto", width: "100%"}}>
    {searchList && searchList.length > 0 ? (
      <SearchVideo video={[...searchList]} />
    ) : (
      <div style={{width:"100%", height:"700px", paddingTop:"300px", textAlign:"center"}}>
        <h2>검색결과가 없습니다.</h2>
      </div>
    )}
  </div>
    );
  }



export default Search;

