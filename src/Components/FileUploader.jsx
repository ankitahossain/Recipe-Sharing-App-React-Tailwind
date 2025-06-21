import React, { useState } from "react";
import useFileUpload from "../hooks/useFileUpload";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const { uploadFile, progress, url, error } = useFileUpload();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) uploadFile(file);
  };

  return (
    
    <div className="p-4 border rounded shadow max-w-md mx-auto mt-10">
      <h2 className="text-lg font-semibold mb-4">Upload a File</h2>
      <input type="file" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Upload
      </button>

      {progress > 0 && <p className="mt-2">Progress: {Math.round(progress)}%</p>}
      {url && <p className="mt-2 text-green-600">{url}</p>}
      {error && <p className="mt-2 text-red-500">Error: {error.message}</p>}
    </div>
  );
};

export default FileUpload;