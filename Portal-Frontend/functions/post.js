import axios, { AxiosHeaders } from "axios";
import { router } from "expo-router";

const backendUrl = "http://10.232.205.167:3000";

export const post = async (body) => {
  try {
    await axios.post(`${backendUrl}/post`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    });
    router.replace("/home");
    // await axios.post(`${backendUrl}/post`, formData);
  } catch (error) {
    console.log(error.message);
  }
};

export const postProfilePicture = async (formData) => {
  try {
    const response = await axios.post(
      `${backendUrl}/uploadProfilePicture`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      }
    );
    router.replace("/home");
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    throw error;
  }
};

export const getProfilePicture = async () => {
  try {
  } catch (e) {
    throw e;
  }
};
