import FindMyInfoCard from "src/components/FindMyInfoCard";
import { Wrappers } from "src/components/elements/UserContentTemplete";
import UserLayout from "src/layouts/UserLayout";

const FindMyInfo = () =>{
    
    return (
        <>
        <Wrappers>
            <FindMyInfoCard/>
        </Wrappers>
        </>
    )
}
FindMyInfo.getLayout = (page) => <UserLayout>{page}</UserLayout>;
export default FindMyInfo