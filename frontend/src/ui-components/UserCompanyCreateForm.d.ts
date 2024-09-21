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
export declare type UserCompanyCreateFormInputValues = {
    userId?: string;
    companyId?: string;
};
export declare type UserCompanyCreateFormValidationValues = {
    userId?: ValidationFunction<string>;
    companyId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserCompanyCreateFormOverridesProps = {
    UserCompanyCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    userId?: PrimitiveOverrideProps<TextFieldProps>;
    companyId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserCompanyCreateFormProps = React.PropsWithChildren<{
    overrides?: UserCompanyCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: UserCompanyCreateFormInputValues) => UserCompanyCreateFormInputValues;
    onSuccess?: (fields: UserCompanyCreateFormInputValues) => void;
    onError?: (fields: UserCompanyCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserCompanyCreateFormInputValues) => UserCompanyCreateFormInputValues;
    onValidate?: UserCompanyCreateFormValidationValues;
} & React.CSSProperties>;
export default function UserCompanyCreateForm(props: UserCompanyCreateFormProps): React.ReactElement;
