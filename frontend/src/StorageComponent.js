import React, { useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { uploadData, downloadData, list, remove } from '@aws-amplify/storage';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

const StorageComponent = () => {
  const [file, setFile] = useState(null);
  const [fileList, setFileList] = useState([]);

  // Upload a file to S3
  const uploadFile = async () => {
    try {
      if (file) {
        const filePath = 'public/' + file.name; // Use 'path' only
        await uploadData({
          path: filePath,
          data: file,
          contentType: file.type,
        });
        console.log('File uploaded successfully');
        fetchFileList();
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  // Download a file from S3
  const downloadFile = async (filePath) => {
    try {
      const data = await downloadData({
        path: filePath,
      });
      const url = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = filePath.replace('public/', '');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  // List files in S3 bucket
  const fetchFileList = async () => {
    try {
      const result = await list({
        path: 'public/',
      });
      console.log('List result:', result);
      const files = result.items;
      setFileList(files);
    } catch (error) {
      console.error('Error listing files:', error);
    }
  };

  // Remove a file from S3
  const removeFile = async (filePath) => {
    try {
      await remove({
        path: filePath,
      });
      console.log('File removed successfully');
      fetchFileList();
    } catch (error) {
      console.error('Error removing file:', error);
    }
  };

  useEffect(() => {
    fetchFileList();
  }, []);

  return (
    <div>
      <h3>Upload a file</h3>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={uploadFile}>Upload</button>

      <h3>Files in Storage</h3>
      {Array.isArray(fileList) && fileList.length > 0 ? (
        <ul>
          {fileList.map((file) => (
            <li key={file.path}>
              {file.path.replace('public/', '')}
              <button onClick={() => downloadFile(file.path)}>Download</button>
              <button onClick={() => removeFile(file.path)}>Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No files found.</p>
      )}
    </div>
  );
};

export default StorageComponent;
