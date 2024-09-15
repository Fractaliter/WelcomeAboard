/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getCompany } from "../graphql/queries";
import { updateCompany } from "../graphql/mutations";
const client = generateClient();
export default function CompanyUpdateForm(props) {
  const {
    id: idProp,
    company: companyModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    location: "",
    industry: "",
    FoundedYear: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [location, setLocation] = React.useState(initialValues.location);
  const [industry, setIndustry] = React.useState(initialValues.industry);
  const [FoundedYear, setFoundedYear] = React.useState(
    initialValues.FoundedYear
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = companyRecord
      ? { ...initialValues, ...companyRecord }
      : initialValues;
    setName(cleanValues.name);
    setLocation(cleanValues.location);
    setIndustry(cleanValues.industry);
    setFoundedYear(cleanValues.FoundedYear);
    setErrors({});
  };
  const [companyRecord, setCompanyRecord] = React.useState(companyModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getCompany.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getCompany
        : companyModelProp;
      setCompanyRecord(record);
    };
    queryData();
  }, [idProp, companyModelProp]);
  React.useEffect(resetStateValues, [companyRecord]);
  const validations = {
    name: [{ type: "Required" }],
    location: [],
    industry: [],
    FoundedYear: [],
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
          name,
          location: location ?? null,
          industry: industry ?? null,
          FoundedYear: FoundedYear ?? null,
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
          await client.graphql({
            query: updateCompany.replaceAll("__typename", ""),
            variables: {
              input: {
                id: companyRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "CompanyUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              location,
              industry,
              FoundedYear,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Location"
        isRequired={false}
        isReadOnly={false}
        value={location}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              location: value,
              industry,
              FoundedYear,
            };
            const result = onChange(modelFields);
            value = result?.location ?? value;
          }
          if (errors.location?.hasError) {
            runValidationTasks("location", value);
          }
          setLocation(value);
        }}
        onBlur={() => runValidationTasks("location", location)}
        errorMessage={errors.location?.errorMessage}
        hasError={errors.location?.hasError}
        {...getOverrideProps(overrides, "location")}
      ></TextField>
      <TextField
        label="Industry"
        isRequired={false}
        isReadOnly={false}
        value={industry}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              location,
              industry: value,
              FoundedYear,
            };
            const result = onChange(modelFields);
            value = result?.industry ?? value;
          }
          if (errors.industry?.hasError) {
            runValidationTasks("industry", value);
          }
          setIndustry(value);
        }}
        onBlur={() => runValidationTasks("industry", industry)}
        errorMessage={errors.industry?.errorMessage}
        hasError={errors.industry?.hasError}
        {...getOverrideProps(overrides, "industry")}
      ></TextField>
      <TextField
        label="Founded year"
        isRequired={false}
        isReadOnly={false}
        value={FoundedYear}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              location,
              industry,
              FoundedYear: value,
            };
            const result = onChange(modelFields);
            value = result?.FoundedYear ?? value;
          }
          if (errors.FoundedYear?.hasError) {
            runValidationTasks("FoundedYear", value);
          }
          setFoundedYear(value);
        }}
        onBlur={() => runValidationTasks("FoundedYear", FoundedYear)}
        errorMessage={errors.FoundedYear?.errorMessage}
        hasError={errors.FoundedYear?.hasError}
        {...getOverrideProps(overrides, "FoundedYear")}
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
          isDisabled={!(idProp || companyModelProp)}
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
              !(idProp || companyModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
