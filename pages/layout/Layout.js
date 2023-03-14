import Header from "./Header";
import Footer from "./Footer";

// localhost:3000/member/join (join 부분을 엔드포인트라고 한다. 이 부분이 children에 할당되게 횐다.)

const Layout = ({children}) => {
    return(
        <div id="wrapper">
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default Layout;