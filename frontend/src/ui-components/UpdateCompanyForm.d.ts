/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Company } from "../models";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type UpdateCompanyFormInputValues = {
    name?: string;
    location?: string;
    industry?: string;
    FoundedYear?: string;
    companyPassword?: string;
};
export declare type UpdateCompanyFormValidationValues = {
    name?: ValidationFunction<string>;
    location?: ValidationFunction<string>;
    industry?: ValidationFunction<string>;
    FoundedYear?: ValidationFunction<string>;
    companyPassword?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UpdateCompanyFormOverridesProps = {
    UpdateCompanyFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    location?: PrimitiveOverrideProps<TextFieldProps>;
    industry?: PrimitiveOverrideProps<TextFieldProps>;
    FoundedYear?: PrimitiveOverrideProps<TextFieldProps>;
    companyPassword?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UpdateCompanyFormProps = React.PropsWithChildren<{
    overrides?: UpdateCompanyFormOverridesProps | undefined | null;
} & {
    id?: string;
    company?: Company;
    onSubmit?: (fields: UpdateCompanyFormInputValues) => UpdateCompanyFormInputValues;
    onSuccess?: (fields: UpdateCompanyFormInputValues) => void;
    onError?: (fields: UpdateCompanyFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UpdateCompanyFormInputValues) => UpdateCompanyFormInputValues;
    onValidate?: UpdateCompanyFormValidationValues;
} & React.CSSProperties>;
export default function UpdateCompanyForm(props: UpdateCompanyFormProps): React.ReactElement;
