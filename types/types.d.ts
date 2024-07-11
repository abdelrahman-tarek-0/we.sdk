export declare class WeApi {
    /**
     * Authenticate user with WE API.
     * @example
     * const session = await WeApi.userAuthenticate('02-2312-3456', 'yourPassword');
     * @param number - A valid Egyptian landline number (e.g., 0223123456, +20223123456, 0020223123456).
     * @param password - Your WE account password.
     * @returns - A session object.
     */
    static userAuthenticate(number: string, password: string): Promise<UserResponse>;
    /**
     * * Get user balance
    * provide a valid session object from userAuthenticate method
     * @example
     * const balance = await WeApi.getBalance(session)
    const balance = await WeApi.getBalance(await WeApi.userAuthenticate('02-2312-3456', 'yourPassword')
     * @returns user balance
     */
    static getBalance(session: {
        uToken: string;
        token: string;
        account: {
            acctId: string;
        };
    }): Promise<UserBalanceInfo>;
    /**
     * * Get user free units (your quota for the month)
    * provide a valid session object from userAuthenticate method
     * @example
     * const freeUnits = await WeApi.getFreeUnits(session)
    const freeUnits = await WeApi.getFreeUnits(await WeApi.userAuthenticate('02-2312-3456', 'yourPassword')
     * @returns user free units
     */
    static getFreeUnits(session: {
        uToken: string;
        token: string;
        subscriber: {
            subscriberId: string;
        };
    }): Promise<FreeUnit[]>;
}

export declare class WeCachedApi {
    constructor(config: Config);
    /**
     * @returns session object
     */
    userAuthenticate(): Promise<UserResponse>;
    /**
     * @returns user balance
     */
    getBalance(): Promise<UserBalanceInfo>;
    /**
     * @returns free units
     */
    getFreeUnits(): Promise<FreeUnit[]>;
}

/**
 * Base interface for cache providers.
 * @param path - location of the cashed file in json format
 */
export declare interface CacheProviderInterface {
    set(key: string, value: any): any;
    get(key: string): any;
    remove(key: string): this;
    clear(): this;
    validateKey(key: string): boolean;
}

export declare interface CacheProviderInFile extends CacheProviderInterface {
}

/**
 * @param path - location of the cashed file in json format
 */
export declare class CacheProviderInFile implements CacheProviderInterface {
    constructor(ttl: TTLInMs, path: string);
    set(key: string, value: any): any;
    get(key: string): any;
    remove(key: string): this;
    clear(): this;
    validateKey(key: string): boolean;
}

export declare interface CacheProviderInMemory extends CacheProviderInterface {
}

export declare class CacheProviderInMemory implements CacheProviderInterface {
    constructor(ttl: TTLInMs);
    set(key: string, value: any): any;
    get(key: string): any;
    remove(key: string): this;
    clear(): this;
    validateKey(key: string): boolean;
}

/**
 * @property firstName - The individual's first name.
 * @property lastName - The individual's last name.
 * @property gender - The individual's gender.
 * @property nationality - The individual's nationality.
 * @property birthday - The individual's birthday timestamp.
 */
export declare type IndividualInfo = {
    firstName: string;
    lastName: string;
    gender: string;
    nationality: string;
    birthday: number;
};

/**
 * @property custId - The customer ID.
 * @property custName - The customer name.
 * @property custGender - The customer gender.
 * @property custCode - The customer code.
 * @property custType - The customer type.
 * @property custClass - The customer class.
 * @property individualInfo - The individual's information.
 * @property contactPersonList - The list of contact persons.
 * @property addressInfoList - The list of addresses.
 * @property serviceManagerInfo - The service manager information.
 * @property bankCards - The list of bank cards.
 */
export declare type Customer = {
    custId: string;
    custName: string;
    custGender: string;
    custCode: string;
    custType: string;
    custClass: string;
    individualInfo: IndividualInfo;
    contactPersonList: any[];
    addressInfoList: any[];
    serviceManagerInfo: any[];
    bankCards: any[];
};

/**
 * @property acctId - The account ID.
 * @property acctCode - The account code.
 * @property billCycle - The billing cycle information.
 */
export declare type Account = {
    acctId: string;
    acctCode: string;
    billCycle: any[];
};

/**
 * @property subscriberId - The subscriber ID.
 * @property custId - The customer ID.
 * @property accountId - The account ID.
 * @property primaryOfferingId - The primary offering ID.
 * @property servNumber - The service number.
 * @property paymentType - The payment type.
 * @property state - The state.
 * @property statusDetail - The status detail.
 * @property status - The status.
 * @property networkType - The network type.
 * @property firstContactChannel - The first contact channel.
 * @property firstContactNumber - The first contact number.
 * @property writtenLang - The written language.
 * @property voiceRoaming - The voice roaming status.
 * @property smsRoaming - The SMS roaming status.
 * @property dataRoaming - The data roaming status.
 * @property isDelegatorSubs - The delegator subscription status.
 */
export declare type Subscriber = {
    subscriberId: string;
    custId: string;
    accountId: string;
    primaryOfferingId: string;
    servNumber: string;
    paymentType: string;
    state: string;
    statusDetail: string;
    status: string;
    networkType: string;
    firstContactChannel: string;
    firstContactNumber: string;
    writtenLang: string;
    voiceRoaming: string;
    smsRoaming: string;
    dataRoaming: string;
    isDelegatorSubs: string;
};

/**
 * @property utoken - The user token.
 * @property loginId - The login ID.
 * @property loginType - The login type.
 * @property token - The token.
 * @property uToken - The user token (duplicate).
 * @property needChangePwd - The need to change password status.
 * @property customer - The customer information.
 * @property account - The account information.
 * @property subscriber - The subscriber information.
 * @property ownerList - The list of owners.
 */
export declare type UserResponse = {
    utoken: string;
    loginId: string;
    loginType: string;
    token: string;
    uToken: string;
    needChangePwd: string;
    customer: Customer;
    account: Account;
    subscriber: Subscriber;
    ownerList: any[];
};

/**
 * @property balanceInstanceId - The balance instance ID.
 * @property amount - The amount.
 * @property initialAmount - The initial amount.
 * @property effectiveTime - The effective time in milliseconds.
 * @property expireTime - The expire time in milliseconds.
 */
export declare type BalanceDetail = {
    balanceInstanceId: string;
    amount: string;
    initialAmount: string;
    effectiveTime: number;
    expireTime: number;
};

/**
 * @property balanceType - The balance type.
 * @property balanceTypeName - The balance type name.
 * @property totalAmount - The total amount.
 * @property depositFlag - The deposit flag.
 * @property refundFlag - The refund flag.
 * @property currencyId - The currency ID.
 * @property balanceDetail - The balance detail list.
 */
export declare type BalanceInfo = {
    balanceType: string;
    balanceTypeName: string;
    totalAmount: string;
    depositFlag: string;
    refundFlag: string;
    currencyId: string;
    balanceDetail: BalanceDetail[];
};

/**
 * @property totalCreditAmount - The total credit amount.
 * @property totalUsageAmount - The total usage amount.
 * @property totalRemainAmount - The total remain amount.
 * @property currencyId - The currency ID.
 */
export declare type CreditInfo = {
    totalCreditAmount: string;
    totalUsageAmount: string;
    totalRemainAmount: string;
    currencyId: string;
};

/**
 * @property acctId - The account ID.
 * @property balanceInfo - The balance information.
 * @property creditInfo - The credit information.
 * @property outstandingInfo - The outstanding information.
 */
export declare type UserBalanceInfo = {
    acctId: string;
    balanceInfo: BalanceInfo[];
    creditInfo: CreditInfo[];
    outstandingInfo: any[];
};

export declare type Hooks = {
    beforeRequest: (...params: any[]) => any;
    afterRequest: (...params: any[]) => any;
};

export declare type TTLInMs = {
    session: number;
    balance: number;
    freeUnit: number;
};

export declare type CustomerConfig = {
    number: string;
    password: string;
};

export declare type Config = {
    customer: CustomerConfig;
    ttlInMs: TTLInMs;
    CacheProvider: CacheProviderInFile | CacheProviderInMemory | CacheProviderInterface;
    cachePath: string;
    hooks: Hooks;
};

/**
 * @property initialAmount - The initial amount.
 * @property currentAmount - The current amount.
 * @property measureUnit - The measurement unit.
 * @property effectiveTime - The effective time in milliseconds.
 * @property expireTime - The expiration time in milliseconds.
 * @property expireTimeCz - The expiration time in another timezone in milliseconds.
 * @property originType - The origin type.
 * @property offeringName - The offering name.
 * @property isGroup - Is group flag.
 * @property serviceNumber - The service number.
 * @property itemCode - The item code.
 * @property remainingDaysForRenewal - The remaining days for renewal.
 */
export declare type FreeUnitBeanDetail = {
    initialAmount: number;
    currentAmount: number;
    measureUnit: string;
    effectiveTime: number;
    expireTime: number;
    expireTimeCz: number;
    originType: string;
    offeringName: string;
    isGroup: boolean;
    serviceNumber: string;
    itemCode: string;
    remainingDaysForRenewal: number;
};

/**
 * @property tabId - The tab ID.
 * @property freeUnitType - The free unit type.
 * @property freeUnitTypeName - The free unit type name.
 * @property tabName - The tab name.
 * @property measureUnit - The measurement unit.
 * @property offerName - The offer name.
 * @property total - The total amount.
 * @property used - The used amount.
 * @property remain - The remaining amount.
 * @property actualRemain - The actual remaining amount.
 * @property effectiveTime - The effective time in milliseconds.
 * @property expireTime - The expiration time in milliseconds.
 * @property groupOrder - The group order.
 * @property iconImage - The icon image.
 * @property freeUnitTypeId - The free unit type ID.
 * @property originUnit - The origin unit.
 * @property freeUnitBeanDetailList - The list of free unit bean details.
 */
export declare type FreeUnit = {
    tabId: string;
    freeUnitType: string;
    freeUnitTypeName: string;
    tabName: string;
    measureUnit: string;
    offerName: string;
    total: number;
    used: number;
    remain: number;
    actualRemain: number;
    effectiveTime: number;
    expireTime: number;
    groupOrder: string;
    iconImage: string;
    freeUnitTypeId: string;
    originUnit: string;
    freeUnitBeanDetailList: FreeUnitBeanDetail[];
};

/**
 * WE error class
 */
export declare class WeApiError {
    constructor(message: string, code: string, data: any);
}

