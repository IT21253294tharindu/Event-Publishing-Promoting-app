import ApiManager from "./api-manager";

export const user_login = async (data) => {
  try {
    const result = await ApiManager("/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "appilication/json",
      },
      data: data,
    });

    return result;
  } catch (error) {
    return error.response.data;
  }
};
