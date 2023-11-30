import ResignCard from "src/components/ResignCard";
import { Wrappers } from "src/components/elements/UserContentTemplete";
import UserLayout from "src/layouts/UserLayout";

const Resign = () =>{
    
    return (
        <>
        <Wrappers>
            <ResignCard/>
        </Wrappers>
        </>
    )
}
Resign.getLayout = (page) => <UserLayout>{page}</UserLayout>;
export default Resign;