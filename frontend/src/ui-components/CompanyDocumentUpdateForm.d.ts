/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { CompanyDocument } from "../models";
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
export declare type CompanyDocumentUpdateFormInputValues = {
    fileName?: string;
    fileUrl?: string;
    companyId?: string;
};
export declare type CompanyDocumentUpdateFormValidationValues = {
    fileName?: ValidationFunction<string>;
    fileUrl?: ValidationFunction<string>;
    companyId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CompanyDocumentUpdateFormOverridesProps = {
    CompanyDocumentUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    fileName?: PrimitiveOverrideProps<TextFieldProps>;
    fileUrl?: PrimitiveOverrideProps<TextFieldProps>;
    companyId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CompanyDocumentUpdateFormProps = React.PropsWithChildren<{
    overrides?: CompanyDocumentUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    companyDocument?: CompanyDocument;
    onSubmit?: (fields: CompanyDocumentUpdateFormInputValues) => CompanyDocumentUpdateFormInputValues;
    onSuccess?: (fields: CompanyDocumentUpdateFormInputValues) => void;
    onError?: (fields: CompanyDocumentUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CompanyDocumentUpdateFormInputValues) => CompanyDocumentUpdateFormInputValues;
    onValidate?: CompanyDocumentUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CompanyDocumentUpdateForm(props: CompanyDocumentUpdateFormProps): React.ReactElement;
