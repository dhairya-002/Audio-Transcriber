import { useState } from "react";
import axios from 'axios';


const AudioUploader = () => {

    const[file, setFile] = useState(null);
    const[transcription, setTranscription] = useState("");
    const [loading, setLoading] = useState(false);

    
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        try{
            const response = await axios.post('http://localhost:8080/api/transcribe',formData,{
                headers: {
                    'Content-Type': 'multipart/formData',
                }
            });
            setTranscription(response.data);
        }catch(error){
            console.error("Error transcribing audio", error);

        } finally{
            setLoading(false);
        }
    };

    return(
        <div className="container">
            <h1>Audio to text transcriber</h1>
            <p className="subtitle">
               Upload an audio file and get instant transcription
            </p>

            <label className="drop-zone">
                 <span className="icon">🎙️</span>
                  <span className="text">
                   {file ? file.name : "Drop audio file or click to upload"}
                 </span>
                 <input type="file" accept="audio/*" hidden onChange={handleFileChange} />
                 </label>


            <button
             className="upload-button"
               onClick={handleUpload}
               disabled={loading || !file}
                                           >
                               {loading ? "Transcribing..." : "Upload and Transcribe"}
            </button>

            <div className="transcription-result">
             <h2>📝 Transcription</h2>
             <p>{transcription}</p>
            </div>
        </div>
    );
}

export default AudioUploader;