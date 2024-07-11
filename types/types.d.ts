declare type api = any;

declare type CONFIG = any;

/**
 * @property firstName - The individual's first name.
 * @property lastName - The individual's last name.
 * @property gender - The individual's gender.
 * @property nationality - The individual's nationality.
 * @property birthday - The individual's birthday timestamp.
 */
declare type IndividualInfo = {
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
declare type Customer = {
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
declare type Account = {
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
declare type Subscriber = {
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
declare type UserResponse = {
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
declare type BalanceDetail = {
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
declare type BalanceInfo = {
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
declare type CreditInfo = {
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
declare type UserBalanceInfo = {
    acctId: string;
    balanceInfo: BalanceInfo[];
    creditInfo: CreditInfo[];
    outstandingInfo: any[];
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
declare type FreeUnitBeanDetail = {
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
declare type FreeUnit = {
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

