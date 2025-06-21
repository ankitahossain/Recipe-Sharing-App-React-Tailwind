import { useState } from "react";
import { getDatabase, ref, push } from "firebase/database";

const useFileUpload = () => {
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);

  const uploadFile = async (file) => {
    try {
      if (!file) return;

      const db = getDatabase();
      const fileRef = ref(db, "uploads");

      // Optional: Read file content as Base64 (for small files)
      const reader = new FileReader();
      reader.onloadend = async () => {
        const metadata = {
          name: file.name,
          size: file.size,
          type: file.type,
          content: reader.result, // base64 string (can omit for large files)
          uploadedAt: new Date().toISOString(),
        };

        await push(fileRef, metadata);
        setProgress(100);
        setUrl("Uploaded to Firebase DB");
      };

      reader.readAsDataURL(file); // or readAsText(file) for plain text

    } catch (err) {
      setError(err);
    }
  };

  return { uploadFile, progress, url, error };
};

export default useFileUpload;