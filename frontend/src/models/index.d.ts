import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerUserCompany = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserCompany, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId: string;
  readonly companyId: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserCompany = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserCompany, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId: string;
  readonly companyId: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserCompany = LazyLoading extends LazyLoadingDisabled ? EagerUserCompany : LazyUserCompany

export declare const UserCompany: (new (init: ModelInit<UserCompany>) => UserCompany) & {
  copyOf(source: UserCompany, mutator: (draft: MutableModel<UserCompany>) => MutableModel<UserCompany> | void): UserCompany;
}

type EagerCompany = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Company, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly location?: string | null;
  readonly industry?: string | null;
  readonly FoundedYear?: string | null;
  readonly companyPassword: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCompany = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Company, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly location?: string | null;
  readonly industry?: string | null;
  readonly FoundedYear?: string | null;
  readonly companyPassword: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Company = LazyLoading extends LazyLoadingDisabled ? EagerCompany : LazyCompany

export declare const Company: (new (init: ModelInit<Company>) => Company) & {
  copyOf(source: Company, mutator: (draft: MutableModel<Company>) => MutableModel<Company> | void): Company;
}