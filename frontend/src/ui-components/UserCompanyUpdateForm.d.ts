/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { UserCompany } from "../models";
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
export declare type UserCompanyUpdateFormInputValues = {
    userId?: string;
    companyId?: string;
};
export declare type UserCompanyUpdateFormValidationValues = {
    userId?: ValidationFunction<string>;
    companyId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserCompanyUpdateFormOverridesProps = {
    UserCompanyUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    userId?: PrimitiveOverrideProps<TextFieldProps>;
    companyId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserCompanyUpdateFormProps = React.PropsWithChildren<{
    overrides?: UserCompanyUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    userCompany?: UserCompany;
    onSubmit?: (fields: UserCompanyUpdateFormInputValues) => UserCompanyUpdateFormInputValues;
    onSuccess?: (fields: UserCompanyUpdateFormInputValues) => void;
    onError?: (fields: UserCompanyUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserCompanyUpdateFormInputValues) => UserCompanyUpdateFormInputValues;
    onValidate?: UserCompanyUpdateFormValidationValues;
} & React.CSSProperties>;
export default function UserCompanyUpdateForm(props: UserCompanyUpdateFormProps): React.ReactElement;
