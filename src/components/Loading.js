import styled from 'styled-components';
import theme from '../styles/theme';
import useNetwork from './useNetwork';
import { Circles } from 'react-loader-spinner'
const LoadingContainer = styled.div`
margin: 15vw auto;
display:flex;
flex-direction:column;
align-items:center;
@media (max-width: 1000px) {
    margin: 25vw auto;
}
@media (max-width: 650px) {
    margin: 40vh auto;
}
@media (max-width: 375px) {
    margin: 30vh auto;
}
`
const Loading = (props) => {
    const { text } = props;
    const handleNetworkChange = (online) => {
        console.log(online ? "We just went online" : "We are offline");
    };
    const onLine = useNetwork(handleNetworkChange);
    return (
        <>
            <LoadingContainer>
                {onLine ?
                    <>
                        <Circles 
                        color={theme.color.background1} 
                        width={50}
                        />
                        <div style={{ marginTop: '16px' }}>{text}</div>
                    </>
                    :
                    <>
                        <div>인터넷 연결을 확인해 주세요.</div>
                    </>}
            </LoadingContainer>
        </>
    )
}
export default Loading;