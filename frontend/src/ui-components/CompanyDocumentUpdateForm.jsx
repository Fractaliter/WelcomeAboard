/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { CompanyDocument } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify/datastore";
export default function CompanyDocumentUpdateForm(props) {
  const {
    id: idProp,
    companyDocument: companyDocumentModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    fileName: "",
    fileUrl: "",
    companyId: "",
  };
  const [fileName, setFileName] = React.useState(initialValues.fileName);
  const [fileUrl, setFileUrl] = React.useState(initialValues.fileUrl);
  const [companyId, setCompanyId] = React.useState(initialValues.companyId);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = companyDocumentRecord
      ? { ...initialValues, ...companyDocumentRecord }
      : initialValues;
    setFileName(cleanValues.fileName);
    setFileUrl(cleanValues.fileUrl);
    setCompanyId(cleanValues.companyId);
    setErrors({});
  };
  const [companyDocumentRecord, setCompanyDocumentRecord] = React.useState(
    companyDocumentModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(CompanyDocument, idProp)
        : companyDocumentModelProp;
      setCompanyDocumentRecord(record);
    };
    queryData();
  }, [idProp, companyDocumentModelProp]);
  React.useEffect(resetStateValues, [companyDocumentRecord]);
  const validations = {
    fileName: [{ type: "Required" }],
    fileUrl: [{ type: "Required" }],
    companyId: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          fileName,
          fileUrl,
          companyId,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await DataStore.save(
            CompanyDocument.copyOf(companyDocumentRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "CompanyDocumentUpdateForm")}
      {...rest}
    >
      <TextField
        label="File name"
        isRequired={true}
        isReadOnly={false}
        value={fileName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              fileName: value,
              fileUrl,
              companyId,
            };
            const result = onChange(modelFields);
            value = result?.fileName ?? value;
          }
          if (errors.fileName?.hasError) {
            runValidationTasks("fileName", value);
          }
          setFileName(value);
        }}
        onBlur={() => runValidationTasks("fileName", fileName)}
        errorMessage={errors.fileName?.errorMessage}
        hasError={errors.fileName?.hasError}
        {...getOverrideProps(overrides, "fileName")}
      ></TextField>
      <TextField
        label="File url"
        isRequired={true}
        isReadOnly={false}
        value={fileUrl}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              fileName,
              fileUrl: value,
              companyId,
            };
            const result = onChange(modelFields);
            value = result?.fileUrl ?? value;
          }
          if (errors.fileUrl?.hasError) {
            runValidationTasks("fileUrl", value);
          }
          setFileUrl(value);
        }}
        onBlur={() => runValidationTasks("fileUrl", fileUrl)}
        errorMessage={errors.fileUrl?.errorMessage}
        hasError={errors.fileUrl?.hasError}
        {...getOverrideProps(overrides, "fileUrl")}
      ></TextField>
      <TextField
        label="Company id"
        isRequired={true}
        isReadOnly={false}
        value={companyId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              fileName,
              fileUrl,
              companyId: value,
            };
            const result = onChange(modelFields);
            value = result?.companyId ?? value;
          }
          if (errors.companyId?.hasError) {
            runValidationTasks("companyId", value);
          }
          setCompanyId(value);
        }}
        onBlur={() => runValidationTasks("companyId", companyId)}
        errorMessage={errors.companyId?.errorMessage}
        hasError={errors.companyId?.hasError}
        {...getOverrideProps(overrides, "companyId")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || companyDocumentModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || companyDocumentModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
