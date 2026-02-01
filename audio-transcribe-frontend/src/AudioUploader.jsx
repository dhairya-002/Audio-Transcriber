import { useState } from "react";
import { transcribeAudio } from "./services/transcriptionService";

const AudioUploader = () => {
  const [file, setFile] = useState(null);
  const [transcription, setTranscription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setError("");
    setTranscription("");

    try {
      const result = await transcribeAudio(file);
      setTranscription(result);
    } catch (err) {
      console.error(err);
      setError("Failed to transcribe audio. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Audio to Text Transcriber</h1>
      <p className="subtitle">
        Upload an audio file and get instant transcription
      </p>

      <label className="drop-zone">
        <span className="icon">🎙️</span>
        <span className="text">
          {file ? file.name : "Drop audio file or click to upload"}
        </span>
        <input
          type="file"
          accept="audio/*"
          hidden
          onChange={handleFileChange}
        />
      </label>

      <button
        className="upload-button"
        onClick={handleUpload}
        disabled={loading || !file}
      >
        {loading ? "Transcribing..." : "Upload and Transcribe"}
      </button>

      {error && <p className="error">{error}</p>}

      {transcription && (
        <div className="transcription-result">
          <h2>📝 Transcription</h2>
          <p>{transcription}</p>
        </div>
      )}
    </div>
  );
};

export default AudioUploader;
