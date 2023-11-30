import styled from "styled-components"
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import $ from 'jquery';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const PlusButton = styled.div`
position:fixed;
right:6px;
bottom:8rem;
background:${props => props.theme.color.background1};
padding:7px 8px 5px 8px;
color:#000;
border-radius:50%;
font-size:16px;
cursor:pointer;
animation: fadein 0.5s;
z-index:3;
@keyframes fadein {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
`
const MinusButton = styled.div`
position:fixed;
right:6px;
bottom:5rem;
background:${props => props.theme.color.background1};
padding:7px 8px 5px 8px;
color:#000;
border-radius:50%;
font-size:16px;
cursor:pointer;
animation: fadein 0.5s;
z-index:3;
@keyframes fadein {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
`
const ZoomButton = () => {
    const [width, setWidth] = useState(90);
    useEffect(() => {
        $('.post-container').css('width', `90%`);
    }, [])
    const onZoomIn = () => {
        if (width < 200) {
            $('.post-container').animate({width:`${width + 10}%`},500);
            setWidth(width + 10);
        }
       
    }
    const onZoomOut = () => {
        if (width > 50) {
            $('.post-container').animate({width:`${width - 10}%`},500);
            setWidth(width - 10);
        }

    }
    return (
        <>
            {window.innerWidth <= 1000 ?
                <>
                    <MinusButton onClick={onZoomOut} >
                        <AiOutlineMinus />
                    </MinusButton>
                    <PlusButton onClick={onZoomIn} >
                        <AiOutlinePlus />
                    </PlusButton>
                </>
                :
                <>
                </>
            }
        </>
    )
}
export default ZoomButton;