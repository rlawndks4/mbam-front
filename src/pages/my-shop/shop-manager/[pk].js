import { Input, TextField, Button, IconButton } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { Title, Wrappers } from "src/components/elements/UserContentTemplete";
import UserLayout from "src/layouts/UserLayout";
import { ViewerContainer, SelectType, twoOfThreeButtonStyle } from "src/components/elements/UserContentTemplete";
import toast from "react-hot-toast";
import { AiFillFileImage } from "react-icons/ai";
import { Col, ImageContainer } from "src/components/elements/ManagerTemplete";
import theme from "src/styles/theme";
import { Icon } from "@iconify/react";

const ManagerEdit = () => {

    const router = useRouter();
    const [data, setData] = useState([]);
    const [managerList, setManagerList] = useState([]);
    useEffect(() => {
        getShop();
    }, [])

    const getShop = async () => {
        const { data: auth_response } = await axios.get(`/api/auth`);
        console.log(auth_response)
        let obj = {};
        obj['pk'] = router.query?.pk;
        obj['review_page'] = 1;
        obj['event_page'] = 1;
        const { data: response } = await axios.post(`/api/items?table=shop_manager&shop_pk=${router.query?.pk}`, obj);
        console.log(response)
        setData(response?.data);
    }
    const onSave = async () => {
        if (window.confirm('저장하시겠습니까?')) {
            const { data: response } = await axios.post(`/api/shop-manager`, {
                manager_list: JSON.stringify(data),
                pk: router.query?.pk
            })
            if (response?.result > 0) {
                toast.success('성공적으로 저장하였습니다.');
                setTimeout(() => {
                    window.location.href = '/';
                }, 1000)
            }
        }
    }
    const addFile = async (e, idx) => {
        if (e.target.files[0]) {
            let list = [...data];
            let formData = new FormData();
            await formData.append('note', e.target.files[0]);
            const { data: response } = await axios.post('/api/addimageitems', formData);
            list[idx].img_src = response?.data[0]?.filename;
            setData(list)

            //setUrl(URL.createObjectURL(e.target.files[0]))
        }
    }

    return (
        <>
            <Wrappers>
                <Title>출근부 관리</Title>
                <div style={{ textAlign: 'center' }}>이미지 번호 순서대로 등록됩니다.</div>
                <div style={{ textAlign: 'center' }}>선정적인 이미지는 반려될 수 있습니다.</div>
                <Button variant="text" sx={{ ...twoOfThreeButtonStyle, marginTop: '2rem' }} onClick={() => {
                    onSave();
                }}>저장하기</Button>
                {data && data?.map((item, idx) => (
                    <>
                        {item?.is_delete != 1 &&
                            <>
                                <Col style={{ rowGap: '0.5rem', marginTop: '2rem' }}>
                                    <ImageContainer for={`file${idx}`} style={{ display: 'flex', margin: 'auto' }}>

                                        {(item?.img_src) ?
                                            <>
                                                <img src={item?.img_src} alt="#"
                                                    style={{
                                                        width: 'auto', height: '150px',
                                                        margin: 'auto'
                                                    }} />
                                            </>
                                            :
                                            <>
                                                <AiFillFileImage style={{ margin: 'auto', fontSize: '4rem', color: `${theme.color.manager.font3}` }} />
                                            </>}

                                    </ImageContainer>
                                    <div>
                                        <input type="file" id={`file${idx}`} onChange={(e) => addFile(e, idx)} style={{ display: 'none' }} />
                                    </div>
                                    <TextField size="small"
                                        value={item?.name}
                                        label='이름'
                                        style={{ maxWidth: '500px', margin: 'auto', width: '90%' }} onChange={(e) => {
                                            let list = [...data];
                                            list[idx].name = e.target.value;
                                            setData(list)
                                        }} />
                                    <TextField size="small"
                                        value={item?.comment}
                                        label='설명'
                                        style={{ maxWidth: '500px', margin: 'auto', width: '90%' }} onChange={(e) => {
                                            let list = [...data];
                                            list[idx].comment = e.target.value;
                                            setData(list)
                                        }} />
                                    <TextField size="small"
                                        value={item?.work_time}
                                        label='근무시간'
                                        style={{ maxWidth: '500px', margin: 'auto', width: '90%' }} onChange={(e) => {
                                            let list = [...data];
                                            list[idx].work_time = e.target.value;
                                            setData(list)
                                        }} />

                                    <div style={{ width: '90%', margin: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ color: `${item?.status == 1 ? theme.color.background0 : 'red'}`, fontWeight: 'bold' }}>{item?.status == 1 ? '관리자 승인 완료' : '관리자 승인 대기'}</div>
                                        <IconButton onClick={() => {
                                            let manager_list = [...data];
                                            manager_list[idx].is_delete = 1;
                                            setData(manager_list);
                                        }}>
                                            <Icon icon="fluent:delete-16-regular" />
                                        </IconButton>
                                    </div>
                                </Col>
                            </>}
                    </>
                ))}
                <Button variant="text" sx={{ ...twoOfThreeButtonStyle, marginTop: '2rem' }} onClick={() => {
                    setData([...data, {}])
                }}>+ 추가하기</Button>
            </Wrappers>
        </>
    )
}
ManagerEdit.getLayout = (page) => <UserLayout>{page}</UserLayout>;
export default ManagerEdit;