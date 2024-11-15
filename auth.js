import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { login, reissueToken } from './apis/authAPI';
import { jwtDecode } from 'jwt-decode';

const refreshAccessToken = async (token) => {
  console.log(`refreshAccessToken`);
  const { accessToken, refreshToken } = await reissueToken(token.refreshToken);

  if (accessToken && refreshToken) {
    return {
      ...token,
      accessToken,
      refreshToken,
      access_exp: jwtDecode(accessToken).exp * 1000,
      refresh_exp: jwtDecode(refreshToken).exp * 1000,
    };
  }

  return {
    ...token,
    error: 'RefreshAccessTokenError',
  };
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: { label: '이메일', type: 'email', placeholder: '이메일을 입력해주세요.' },
        password: { label: '비밀번호', type: 'password', placeholder: '비밀번호를 입력해주세요.' },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null;
        try {
          const response = await login({
            email: credentials.email,
            password: credentials.password,
          });

          const { accessToken, refreshToken } = response;

          return {
            email: credentials.email,
            role: jwtDecode(accessToken).role,
            accessToken,
            refreshToken,
          };
        } catch (error) {
          throw new Error(`Auth error [${error}]`);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log('구간0');
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          role: user.role,
          access_exp: jwtDecode(user.accessToken).exp * 1000,
          refresh_exp: jwtDecode(user.refreshToken).exp * 1000,
        };
      }

      console.log('구간1');
      console.log(Date.now() < token.access_exp);
      console.log('date: ', Date.now());
      // console.log('token.access_exp: ', token.access_exp);
      // console.log('Date.now() < token.access_exp', Date.now() < token.access_exp);

      if (Date.now() < token.access_exp) {
        console.log('구간2');
        return token;
      }
      console.log('구간3');
      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.access_exp = token.access_exp;
        session.refresh_exp = token.refresh_exp;
        session.role = token.role;
        session.error = token.error;
      }
      return session;
    },
    async redirect({ url, baseUrl, session }) {
      console.log('redirect');
      if (session?.role) {
        if (session.role == 'ROLE_ADMIN') {
          return `${baseUrl}/admin`;
        } else if (session.role === 'ROLE_USER') {
          return `${baseUrl}/service`;
        }
      }

      return baseUrl;
    },
  },
  pages: {
    signIn: '/service/login',
  },
});
