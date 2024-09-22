/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type CompanyDocumentCreateFormInputValues = {
    fileName?: string;
    fileUrl?: string;
    companyId?: string;
};
export declare type CompanyDocumentCreateFormValidationValues = {
    fileName?: ValidationFunction<string>;
    fileUrl?: ValidationFunction<string>;
    companyId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CompanyDocumentCreateFormOverridesProps = {
    CompanyDocumentCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    fileName?: PrimitiveOverrideProps<TextFieldProps>;
    fileUrl?: PrimitiveOverrideProps<TextFieldProps>;
    companyId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CompanyDocumentCreateFormProps = React.PropsWithChildren<{
    overrides?: CompanyDocumentCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CompanyDocumentCreateFormInputValues) => CompanyDocumentCreateFormInputValues;
    onSuccess?: (fields: CompanyDocumentCreateFormInputValues) => void;
    onError?: (fields: CompanyDocumentCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CompanyDocumentCreateFormInputValues) => CompanyDocumentCreateFormInputValues;
    onValidate?: CompanyDocumentCreateFormValidationValues;
} & React.CSSProperties>;
export default function CompanyDocumentCreateForm(props: CompanyDocumentCreateFormProps): React.ReactElement;
