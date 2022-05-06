public with sharing class GetAccountDetails {
    @AuraEnabled(cacheable=true)
    public static List<Account> accountDet(){
        try {
            return [SELECT Id, Name, Phone, Shipping_Street__c, Shipping_Country__c,
                    Shipping_Postal_Code__c FROM Account WHERE Id = '0018c000029LaD1AAK' WITH SECURITY_ENFORCED];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}