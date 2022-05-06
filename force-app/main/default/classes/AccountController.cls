public class AccountController {
    
    //get account details
    
    @auraenabled (cacheable = true)
    public static List<Account> getAccountDetails(){
        try {
            return [SELECT Id, Name, Phone, Shipping_Street__c, Shipping_Country__c,
                    Shipping_Postal_Code__c FROM Account WHERE Id = '0018c000029MEBLAA4'];
        } catch (Exception e){
            throw new AuraHandledException(e.getMessage());
        }
        
    }
    
    
    //get data from js and update account
    @auraenabled
    public static void updateAccountFields(String accId, String name, String phone, String street, String country, String postalCode){
        
        try{
            
            
            Account acc = new Account();
            
            acc.Id = accId;
            acc.Name = name;
            acc.Phone = phone;
            acc.Shipping_Street__c = street;
            acc.Shipping_Country__c = country;
            acc.Shipping_Postal_Code__c = postalCode;
           
            Update acc;
            
        } catch(Exception ex){
            System.debug('An Exception: '+ex);
        }          
        
    }
}