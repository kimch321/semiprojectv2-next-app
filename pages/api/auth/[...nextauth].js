// npm install next-auth@3.29.10 --save-dev
// 경로 : /page/api/auth/[...nextauth].js

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials'

export default NextAuth({
    providers: [
        Credentials({
            name:"email-passwd-credentials",
            credentials: {
                username: {label:"이메일", placeholder: 'email'},
                password: {label:"비밀번호", type:"password"}
            }, // 로그인 폼 정의
            async authorize(credentials, req) {
                console.log('auth login -', credentials)
                return credentials;
            }
        })
    ]
})

