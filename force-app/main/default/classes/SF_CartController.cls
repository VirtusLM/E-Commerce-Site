/*
* ============================================
* @apexClassName: SF_CartController.cls
* @description: Class contains the logic of adding product to cart and sending email after order placement.
* @author: L.Mikatsadze
* @email: l.mikatsadze@makingscience.com
* @testClass: SF_CartControllerTest.cls
* @dateCreated: 27/02/2022
* @lastChange: 12/03/2022 by L.Mikatsadze
* ============================================
*/
public with sharing class SF_CartController {
    //@author: L.Mikatsadze
    //@description: Adds product to cart.
    @AuraEnabled 
    public static void addProductToCart(Id productId, Integer quantity){ 
    //Checks for active account
    List<Account> accounts = [SELECT Id FROM Account WHERE Name ='Penguin' LIMIT 1]; 
    // if(accounts.isEmpty()){
    //     throw new AuraHandledException('We did not find existing account');
    // }
    //Checks for active cart
    List<Cart__c> cart = [SELECT Id FROM Cart__c WHERE Account__c in:accounts AND Status__c ='Draft'];
    if(cart.isEmpty()){
        Id accountId = accounts[0].Id;
        createCart(accountId);

        //Creates new cart line item
        List<Product__c> product = [SELECT Id, Name, Price__c, Description__c from Product__c WHERE id =:productId LIMIT 1];
        List<Cart__c> createdNewCart = [SELECT Id FROM Cart__c WHERE Account__c =:accounts[0].Id AND Status__c ='Draft'];
        createCartLineItem(createdNewCart, product, quantity);

    }else{
        //Checks for existing cart line item
        List<Cart_Line_Item__c> cartLineItem = [SELECT Id, Product_Name__c, Quantity__c, Product_Description__c, Price__c FROM Cart_Line_Item__c 
                                                                                        WHERE Cart__c =:cart[0].Id AND Product__c =:productId];
        if(cartLineItem.isEmpty()){
            List<Product__c> product = [SELECT Id, Name, Price__c, Description__c from Product__c WHERE id =:productId LIMIT 1];
            createCartLineItem(cart, product, quantity);

        }else{
            cartLineItem[0].Quantity__c += quantity;
            update cartLineItem;    
        }
    }        
}
    // @author: L.Mikatsadze
    // @description: Creates new cart.
    private static void createCart(Id accountId){
        Cart__c newCart = new Cart__c(
        Account__c = accountId,
        Status__c = 'Draft');

        insert newCart;
    }

    // @author: L.Mikatsadze
    // @description: Creates new cart line item.
    private static void createCartLineItem(List<Cart__c> cart, List<Product__c> product, Integer quantity){
        if(quantity == null){
            quantity = 1;
        }
        Cart_Line_Item__c newCartLineItem = new Cart_Line_Item__c(
        Cart__c = cart[0].Id,
        Product__c = product[0].Id,
        Product_Description__c = product[0].Description__c,
        Price__c = product[0].Price__c,
        Quantity__c = quantity);

        insert newCartLineItem;
    }

    // @author: L.Mikatsadze    
    // @description: Sends email after order placement.
    @future 
    public static void sendMail(Id orderId) {
        List<Order__c> order = [SELECT Id, Name, Account__r.owner.email, Total_Price__c, Total_Quantity__c FROM Order__c WHERE Id =:orderId];
    
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        String[] toAddresses = new String[] {order[0].Account__r.owner.email};
        String subject = 'Your order #: ' + order[0].Name + ' was placed successfully.';
        String text = 'Total Quantity: '+ order[0].Total_Quantity__c + '\nTotal Price: ' + order[0].Total_Price__c + ' USD';                                                        
        mail.setToAddresses(toAddresses);
        mail.setSubject(subject);
        mail.setPlainTextBody(text);

        Messaging.sendEmail(new Messaging.SingleEmailMessage[]{mail});
    }
}