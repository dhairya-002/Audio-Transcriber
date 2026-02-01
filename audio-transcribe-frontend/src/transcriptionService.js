import axios from "axios";

const API_BASE_URL =
  "https://audio-transcriber-backend-bdmm.onrender.com";

export const transcribeAudio = async (audioFile) => {
  const formData = new FormData();
  formData.append("file", audioFile);

  const response = await axios.post(
    `${API_BASE_URL}/api/transcribe`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
