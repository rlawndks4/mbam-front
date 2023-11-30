import SignUpCard from "src/components/SignUpCard";
import { Wrappers } from "src/components/elements/UserContentTemplete";
import UserLayout from "src/layouts/UserLayout";
const SignUp = () => {
    return (
        <>
            <Wrappers className="wrapper">
                <SignUpCard />
            </Wrappers>
        </>
    )
}
SignUp.getLayout = (page) => <UserLayout>{page}</UserLayout>;
export default SignUp;