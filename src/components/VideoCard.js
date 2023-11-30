import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { backUrl } from "../data/Data";
import theme from "../styles/theme";
import { Card } from "./elements/UserContentTemplete";
import { AiFillHeart } from 'react-icons/ai'
import { LazyLoadImage } from "react-lazy-load-image-component";
export const Img = styled.div`
width: 90%;
height:320px;
background:#fff;
background-size: cover;
background-repeat: no-repeat;
background-position: center center;
background-blend-mode: multiply;
margin: 18px auto;

@media screen and (max-width:1200px) {
    height: 28.266666666vw;
}
@media screen and (max-width:600px) {
    height: 50vw;
    margin: 5vw auto;
}
`
const TextContainer = styled.div`
padding: 0 20px;
min-height: 50px;
justify-content: space-between;
display: flex;
flex-direction: column;
@media screen and (max-width:600px) {
    height: 100px;
}
@media screen and (max-width:400px) {
    height: 130px;
}
`
const VideoCard = (props) => {
    const { paddingBottom, item, isSlide, isImgPadding, isImgDiv, isChangeColor, background, isTerm } = props;
    const navigate = useNavigate();
    return (
        <>
            <Card onClick={() => { navigate(`/video/${props.item.pk}`) }}
                style={{
                    background: `${background ? background : props?.item?.background_color ? props?.item?.background_color : ''}`,
                    color: `${background ? '#000' : props?.item?.font_color ? props?.item?.font_color : ''}`,
                    paddingTop: `${isImgPadding ? '0.5%' : '0'}`,
                    width: `${isTerm && window.innerWidth <= 600 ? '95%' : ''}`,
                }}>
                {/* <LazyLoadImage
                    alt={"#"}
                    effect="blur"
                    src={`https://img.youtube.com/vi/${props.item.link}/0.jpg`}
                    className='video-img'
                    /> */}
                 <Img style={{ backgroundImage: `url(${`https://img.youtube.com/vi/${props.item.link}/0.jpg`})` }} alt="#" /> 
                {/* <iframe style={{ width: '100%', height: 'auto', height: '80vw', maxHeight: '450px' }} src={`https://www.youtube.com/embed/${videos.link}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
                <TextContainer style={{ padding: `${isImgPadding ? '0 20px' : '20px'}` }}>
                    <div style={{ fontSize: `${theme.size.font3}` }}>{props?.item?.title}</div>
                    {props.isVideoList ?
                        <>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}><AiFillHeart style={{ fontSize: '18px', color: `${theme.color.font3}` }} /><p style={{ margin: '0', marginLeft: '6px' }}>{'2'}</p></div>
                                <img src={backUrl + props.channelImg} style={{ width: '28px', height: '28px', borderRadius: '50%' }} alt="#" />
                            </div>
                        </>
                        :
                        <>
                            <div style={{ fontSize: `${theme.size.font5}`, padding: '16px 0 32px 0', textAlign: 'center' }}>{"자세히보기 >"}</div>
                        </>
                    }
                    {props.isSlide ?
                        <>
                        </>
                        :
                        <>
                        </>
                    }
                </TextContainer>
            </Card>
        </>
    )
}
export default VideoCard;