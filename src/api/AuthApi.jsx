import authApi from "./axios";

export async function getOtp(data) {
  try {
    const response = await authApi.post("/auth/sent-otp", data);
    return response.data
  } catch (err) {
    console.log(err);
  }
}

export async function verifyOto(data) {
    try {
      const response = await authApi.post("/auth/verify-otp", data);
      return response.data
    } catch (err) {
      console.log(err);
    }
  }
  
  export async function postData(data) {
    try {
      const response = await authApi.post("/auth/register",data);
      return response.data
    } catch (err) {
      console.log(err);
    }
  }
  export async function getUsers(params) {
    try {
      const response = await authApi.get("/users",{params});
      return response.data
    } catch (err) {
      console.log(err);
    }
  }
  export async function getUserDetail(id) {
    try {
      const response = await authApi.get(`/user-detail/${id}`);
      return response.data
    } catch (err) {
      console.log(err);
    }
  }

