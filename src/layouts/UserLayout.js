import { useEffect, useState } from "react";
import BottomMenu from "./BottomMenu";
import Footer from "./Footer";
import Headers from "./Headers";
import ScrollToTop from "./ScrollToTop";
import ScrollToTopButton from "./ScrollToTopButton";

const UserLayout = (props) => {

    const { children } = props;

    const [showPage, setShowPage] = useState(false);

    useEffect(() => {
        setShowPage(true);
    }, [])
    return (
        <>
            {showPage &&
                <>
                    <Headers />
                    <ScrollToTop />
                    {typeof window !== 'undefined' &&
                        <>
                            {children}
                        </>}
                    <ScrollToTopButton />
                    <BottomMenu />
                    <Footer />
                </>}
        </>
    )
}
export default UserLayout;