import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Title, Wrappers } from "src/components/elements/UserContentTemplete";
import { backUrl, communityCategoryList } from "src/data/Data";
import $ from 'jquery'
import styled from "styled-components";
import { commarNumber, getViewerMarginByNumber, categoryToNumber  } from "src/functions/utils";
import { Input } from "src/components/elements/ManagerTemplete";
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})
import AddButton from "src/components/elements/button/AddButton";
import UserLayout from "src/layouts/UserLayout";
import { useRouter } from "next/router";

const AddCommunity = () => {
    const router = useRouter();
    const params = router.query;

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    const [note, setNote] = useState('')
    const [shop, setShop] = useState({});
    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [
                    { header: [1, 2, 3, 4, 5, 6] },
                    { font: [] }
                ],
                [{ size: [] }],
                [{ color: [] }, { background: [] }],
                ["bold", "italic", "underline", "strike", "blockquote", "regular"],
                [{ align: [] }],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image", "video"],
                ["emoji"],
                ["clean"],
                ["code-block"]
            ],
        },
    }), [])
   
    useEffect(() => {
        async function isUser() {
            const { data: response } = await axios.get('/api/auth', {
                headers: {
                    'Content-type': 'application/json',
                }
            },
                { withCredentials: true });
            if (response.pk > 0) {
                setUser(response);
            } else {
                alert('로그인 후 이용 가능합니다.');
                router.push('/login');
            }
            if(params?.table.includes('shop_')){
                if(!router.query?.shop_pk){
                    alert("잘못된 접근입니다.");
                    router.push('/home');
                }else{
                    setShop(router.query);
                }
            }
        }
        isUser();
        
    }, [])
    const onSave = async () => {
        if (window.confirm("정말로 저장 하시겠습니까?")) {
            let obj = {
                title: $('.title').val(),
                note: note,
                table:params?.table
            }
            if(shop?.shop_pk){
                obj['shop_pk'] = shop?.shop_pk;
            }
            const { data: response } = await axios.post('/api/additembyuser', obj)
            if(response?.result>0){
                alert('성공적으로 저장 되었습니다.');
                router.back();
            }else{
                alert(response?.message);
            }
        }
    }
    return (
        <>
            <Wrappers className="post-container">
                {shop?.shop_name?
                <>
                <Title style={{marginBottom:'0'}}>{shop?.shop_name}</Title>
                </>
                :
                <>
                </>}
                <Title>{communityCategoryList[categoryToNumber(params?.table)].name} 작성</Title>
                <Input style={{ width: '98%', margin: '1rem auto 1rem 0', padding: '0.75rem 1%', maxWidth:'1157px'  }} placeholder="제목을 입력해 주세요." className="title" />
                <div id='editor' style={{ width: '100%', margin: '1rem auto'}}>
                    <ReactQuill
                        modules={modules}
                        theme="snow"
                        defaultValue={note}
                        value={note}
                        onChange={async (e) => {
                            try {
                                let note = e;
                                if (e.includes('<img src="') && e.includes('base64,')) {
                                    let base64_list = e.split('<img src="');
                                    for (var i = 0; i < base64_list.length; i++) {
                                        if (base64_list[i].includes('base64,')) {
                                            let img_src = base64_list[i];
                                            img_src = await img_src.split(`"></p>`);
                                            let base64 = img_src[0];
                                            img_src = await base64toFile(img_src[0], 'note.png');
                                            let formData = new FormData();
                                            await formData.append('note', img_src);
                                            const { data: response } = await axios.post('/api/addimageitems', formData);
                                            note = await note.replace(base64, `${backUrl + response?.data[0]?.filename}`)
                                        }
                                    }
                                }
                                setNote(note);
                            } catch (err) {
                                console.log(err);
                            }
                        }}
                    />
                </div>
                <AddButton style={{ margin: '1rem 0 0 auto' }} onClick={onSave}>저장</AddButton>
            </Wrappers>
        </>
    )
}
AddCommunity.getLayout = (page) => <UserLayout>{page}</UserLayout>;
export default AddCommunity;