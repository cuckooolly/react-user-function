import { cookieFetch } from "@/lib/fetchClient";

export const userService = {
  // 사용자 정보 요청
  getMe: () => {
    return cookieFetch("/users/me");
  },

  // 사용자 링크 요청
  getMyLinks: () => {
    return cookieFetch("/users/me/links");
  },
};
