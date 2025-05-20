import React, { useState } from 'react';

export default function ImageUploadForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    //FIX: to resolve selectedFile not converting to json
    console.log(typeof selectedFile.file);
    console.log(JSON.stringify(selectedFile));
    if (!selectedFile) {
      setUploadStatus('Please select a file.');
      return;
    }
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      setUploadStatus('Loading...');
      setUploadedImageUrl('');

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setUploadStatus('Upload successful!');
        setUploadedImageUrl(data.imageUrl);
        setSelectedFile(null);
      } else {
        setUploadStatus('Upload failed:', data.error || 'Unknown error...!');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('An error occurred during upload...');
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <form
        style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
        onSubmit={handleUpload}
      >
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit" disabled={!selectedFile}>
          Upload
        </button>
        {uploadStatus && <p>{uploadStatus}</p>}
        {uploadedImageUrl && (
          <div>
            <p>Upload image:</p>
            <img src={uploadedImageUrl} alt="Uploaded image" style={{ maxWidth: '300px' }} />
            <p>Image URL: {uploadedImageUrl}</p>
          </div>
        )}
      </form>
    </div>
  );
}
