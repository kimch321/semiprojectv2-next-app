import Header from "./Header";
import Footer from "./Footer";
import HEAD from 'next/head';

// localhost:3000/member/join (join 부분을 엔드포인트라고 한다. 이 부분이 children에 할당되게 횐다.)


const Layout = ({children, menu, meta}) => {
    console.log('layout -',menu)


    const {title, description, icon} = meta;
    return(
        <>
            <HEAD>
                <title>{title}</title>
                <link rel={"icon"} href={icon || '/favicon.ico'} />
            </HEAD>
            <div id={'wrapper'}>
                <Header menu={menu} />
                {children}
                <Footer />
            </div>
        </>

    )
}

export default Layout;