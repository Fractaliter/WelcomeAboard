import React, { useState, useEffect } from 'react';
import { remove, downloadData } from '@aws-amplify/storage';  // Import specific functions
import { DataStore } from '@aws-amplify/datastore';
import { CompanyDocument } from '../models';

const CompanyDocumentManager = ({ companyId }) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchCompanyDocuments = async () => {
      const companyDocuments = await DataStore.query(CompanyDocument, (doc) =>
        doc.companyId.eq(companyId)
      );
      setDocuments(companyDocuments);
    };

    fetchCompanyDocuments();
  }, [companyId]);

  const downloadDocument = async (fileUrl) => {
    try {
      const result = await downloadData({ key: fileUrl });
      window.open(URL.createObjectURL(result.body), '_blank');
    } catch (error) {
      console.error('Error downloading document:', error);
    }
  };

  const deleteDocument = async (fileUrl, documentId) => {
    try {
      // Delete file from S3
      await remove({ key: fileUrl });

      // Delete the CompanyDocument entry
      await DataStore.delete(CompanyDocument, documentId);

      // Remove the document from the state
      setDocuments((prevDocs) => prevDocs.filter((doc) => doc.id !== documentId));
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  return (
    <div>
      <h4>Company Documents:</h4>
      <ul>
        {documents.map((doc) => (
          <li key={doc.id}>
            {doc.fileName}
            <button onClick={() => downloadDocument(doc.fileUrl)}>Download</button>
            <button onClick={() => deleteDocument(doc.fileUrl, doc.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyDocumentManager;
