import React, { useEffect,useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { CompanyDocument,Company } from '../models'; // Assuming this is the model for documents

const CompanyAdminComponent = ({ companyId }) => {
  const [file, setFile] = useState(null);  
  const [companyName, setCompanyName] = useState('');


  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const company = await DataStore.query(Company, companyId);
        if (company) {
          setCompanyName(company.name); // Set the company name if found
        } else {
          console.error('Company not found');
        }
      } catch (error) {
        console.error('Error fetching company:', error);
      }
    };

    fetchCompany();
  }, [companyId]);
  
  const uploadDocument = async () => {
    try {
      if (!file) {
        console.error('No file selected');
        return;
      }

      // Generate a file URL for this example (you would normally upload to S3)
      const fileUrl = URL.createObjectURL(file);

      // Save the document in DataStore, linked to the selected company
      await DataStore.save(
        new CompanyDocument({
          companyId,      // Pass the companyId to link the document
          fileUrl,        // Include the file URL
          fileName: file.name,
        })
      );
      console.log('Document uploaded successfully');
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  };


return (
    <div>
      <h2>Upload Document for Company {companyName} </h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={uploadDocument}>Upload Document</button>
    </div>
  );
};

export default CompanyAdminComponent;
