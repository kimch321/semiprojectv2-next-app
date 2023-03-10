import Header from "./Header";
import Footer from "./Footer";

// localhost:3000/member/join (join 부분을 엔드포인트라고 한다. 이 부분이 children에 할당되게 횐다.)

const Layout = ({children}) => {
    return(
            <html lang="ko">
                <head>
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="stylesheet" href="/css/normalize.css" />
                    <link rel="stylesheet" href="/css/main.css" />
                    <link rel="stylesheet" href="/css/project2.css" />
                    <link rel="stylesheet" href="/css/Myinfo.css" />
                    <link rel="stylesheet" href="/css/list.css" />
                    <link rel="stylesheet" href="/css/view.css" />

                    <title>index</title>
                </head>
                <body>
                    <div id="wrapper">
                        <Header />
                        {children}
                        <Footer />
                    </div>
                </body>
            </html>
    )
}

export default Layout;