import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import '../../App.css'
import 'swiper/css/navigation';
import Style from './row.module.css';
import { Link } from "react-router-dom";

const Row =({ video })=> {
    return( 
            <Swiper
              className={Style.swiperWrapper}
              modules={[Navigation]}
              navigation={true}
              spaceBetween={13}
              slidesPerView={5}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
            >
            
              {video?.map((video) => {
                return <SwiperSlide key={video.videoNum}
                                    className={Style.swiperSlide}                      
                                    >
                                    
                                    <div className={Style.rowimg}>
                                      <Link to={`/view/${video.videoNum}`}>
                                        <img  src={video.thumbnailUrl}
                                              alt={video.videoName}
                                              style={{width:"100%",
                                                      height:"100%", 
                                                      position:"relative",
                                                      borderRadius :"5px"}}
                                                      />
                                      </Link>
                                      <div  className={Style.imgName}
                                          style={{position:"absolute"}}>{video.videoName}</div>
                                    </div>
                        </SwiperSlide>
              
              })}
          
            </Swiper>
        
        
    )
        };
    
export default Row;