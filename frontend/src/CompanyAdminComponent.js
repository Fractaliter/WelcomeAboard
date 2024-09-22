import React, { useState } from 'react';
import { uploadData } from '@aws-amplify/storage';  // Import the uploadData function
import { DataStore } from '@aws-amplify/datastore';  // Correct import for DataStore
import { CompanyDocument } from './models';  // Ensure the path is correct

const CompanyAdminComponent = ({ companyId }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadDocument = async () => {
    if (!file) return;

    setUploading(true);

    try {
      // Upload file to S3 using the specific uploadData function
      const result = await uploadData({
        key: `company-${companyId}/${file.name}`,
        data: file,
        contentType: file.type,
      });

      console.log('File uploaded successfully:', result);

      // Create a new CompanyDocument entry
      await DataStore.save(
        new CompanyDocument({
          fileName: file.name,
          fileUrl: result.key,
          companyId: companyId,  // Link document to the company
        })
      );

      console.log('Document linked to company successfully');
    } catch (error) {
      console.error('Error uploading document:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h2>Upload Document for Company</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadDocument} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
};

export default CompanyAdminComponent;
