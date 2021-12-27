import { ApolloClient, makeVar, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setContext } from "@apollo/client/link/context";
import { offsetLimitPagination } from "@apollo/client/utilities";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");
export const memberVar = makeVar();
const TOKEN = "token";
const MEMBER = "member";
const KEY_VALUE = "keyFirstLaunch";

// 키값에 true로 저장한다.
function setAppLaunched() {
  AsyncStorage.setItem(KEY_VALUE, "true");
}

export const logUserIn = async (token, member) => {
  await AsyncStorage.setItem(TOKEN, token);
  await AsyncStorage.setItem(MEMBER, JSON.stringify(member));
  isLoggedInVar(true);
  tokenVar(token);
  memberVar(JSON.stringify(member));
};
export const logUserOut = async () => {
  await AsyncStorage.removeItem(TOKEN);
  await AsyncStorage.removeItem(MEMBER);
  isLoggedInVar(false);
  tokenVar(null);
  memberVar(null);
};

export const checkFirstLaunch = async () => {
  try {
    const isFirstLaunched = await AsyncStorage.getItem(KEY_VALUE); //우선 값을 읽자.
    if (isFirstLaunched === null) {
      // 값이 없다면,
      setAppLaunched(); // 키값에 true로 저장하고,
      return true; // true를 반환 ==> 최초 실행 !!
    }
    return false; // 값이 없다면, 최초 실행 아님 !!
  } catch (error) {
    // 에러 발생 시에도 false 로 반환
    console.log(" [chk first launch] :" + error);
    return false; // Error
  }
};

const httpLink = createUploadLink({
  // uri: "http://3.36.22.165:4000/graphql",
  uri: "http://api.care-korea.kr/graphql",
});
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(),
      member: memberVar(),
    },
  };
});

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        pointUsed: offsetLimitPagination(),
        citizenpaticipate: offsetLimitPagination(),
      },
    },
  },
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});
export default client;
