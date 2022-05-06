public class updateAccount {
    @AuraEnabled
    public static void updateAccountFields(String Id, String Name, String Phone, String Street, String Country, String PostalCode){
        try{
        List<Account> accountToUpdate = [SELECT Id, Name, Phone, Shipping_Street__c, Shipping_Country__c,
                    Shipping_Postal_Code__c FROM Account WHERE Id = '0018c000029LaD1AAK'];   
        for (Account acc : accountToUpdate){
            acc.Name = Name;
            acc.Phone = Phone;
            acc.Shipping_Street__c = Street;
            acc.Shipping_Country__c = Country;
            acc.Shipping_Postal_Code__c = PostalCode;
        }
        
     
        update accountToUpdate;
        
        } catch(Exception ex){
        System.debug('An Exception: '+ex);
        }          
    
    }
}