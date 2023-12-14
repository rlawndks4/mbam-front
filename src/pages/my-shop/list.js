import { Wrappers } from "src/components/elements/UserContentTemplete";
import UserLayout from "src/layouts/UserLayout";

const MyShopList = () => {

    return (
        <>
            <Wrappers>

            </Wrappers>
        </>
    )
}
MyShopList.getLayout = (page) => <UserLayout>{page}</UserLayout>;

export default MyShopList;