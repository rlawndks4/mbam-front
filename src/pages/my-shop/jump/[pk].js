import { Input, TextField, Button } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { Title, Wrappers } from "src/components/elements/UserContentTemplete";
import UserLayout from "src/layouts/UserLayout";
import { ViewerContainer, SelectType, twoOfThreeButtonStyle } from "src/components/elements/UserContentTemplete";
import toast from "react-hot-toast";

const JumpAutoEdit = () => {

    const router = useRouter();
    const [data, setData] = useState({});
    const [timeTable, setTimeTable] = useState([]);
    useEffect(() => {
        getShop();
    }, [])

    const getShop = async () => {
        let obj = {};
        obj['pk'] = router.query?.pk;
        const { data: auth_response } = await axios.get(`/api/auth`);
        console.log(auth_response)

        const { data: response } = await axios.get(`/api/item?table=shop&pk=${router.query?.pk}`);
        if (auth_response?.pk != response?.data?.user_pk) {
            router.back();
        }
        let time_table = JSON.parse(response?.data?.jump_time_table ?? '[]');
        if (!(time_table.length > 0)) {
            for (var i = 0; i < response?.data?.daily_jump_count; i++) {
                time_table.push({
                    time: '',
                })
            }
        }
        setTimeTable(time_table)
        setData(response?.data);
    }
    const onSave = async () => {
        if (window.confirm('저장하시겠습니까?')) {
            const { data: response } = await axios.post(`/api/jump-time-table`, {
                pk: data?.pk,
                time_table: JSON.stringify(timeTable)
            })
            if (response?.result > 0) {
                toast.success('성공적으로 저장하였습니다.');
                setTimeout(() => {
                    window.location.href = '/';
                }, 1000)
            }
        }
    }
    return (
        <>
            <Wrappers>
                <Title>자동 점프 설정</Title>
                <div style={{ textAlign: 'center' }}>점프는 하루에 최대 20개 설정 가능합니다.</div>
                <div style={{ textAlign: 'center' }}>설정하는 시간에 자동으로 점프됩니다.</div>
                <div style={{ marginTop: '2rem' }} />
                {timeTable && timeTable.map((item, idx) => (
                    <>
                        <div style={{ display: 'flex', columnGap: '0.5rem', margin: '0.25rem auto', alignItems: 'center' }}>
                            <div>{idx + 1}</div>
                            <TextField size="small"
                                value={item?.time}
                                type="time" style={{ width: '200px' }} onChange={(e) => {
                                    let time_table = [...timeTable];
                                    time_table[idx] = {
                                        time: e.target.value,
                                    }
                                    setTimeTable(time_table)
                                }} />

                        </div>
                    </>
                ))}
                <Button variant="text" sx={{ ...twoOfThreeButtonStyle, marginTop: '2rem' }} onClick={() => {
                    onSave();
                }}>저장하기</Button>
            </Wrappers>
        </>
    )
}
JumpAutoEdit.getLayout = (page) => <UserLayout>{page}</UserLayout>;
export default JumpAutoEdit;