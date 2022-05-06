@isTest
public class SF_CartControllerTest {

    @TestSetup
    static void makeData(){
        Account testAcc = new Account(Name = 'Penguin');                         
        insert testAcc;

        Product__c product1 = new Product__c(Name ='TestProduct1');
        insert product1;

        Product__c product2 = new Product__c(Name ='TestProduct2');
        insert product2;

        Product__c product3 = new Product__c(Name ='TestProduct3');
        insert product3;

        Product__c product4 = new Product__c(Name ='TestProduct4');
        insert product4;

    }

    @isTest //Creates new cart and cart line item
    static void addProductToCartTest1(){
        List<Product__c> product1 = [SELECT Id FROM Product__c WHERE Name ='TestProduct1'];
        Integer quantity = 1;
        Id productId = product1[0].Id;

        SF_CartController.addProductToCart(productId, quantity);
        List<Account> acc = [SELECT Id FROM Account WHERE Name = 'Penguin'];
        List<Cart__c> cart = [SELECT Id FROM Cart__c WHERE Account__c =:acc[0].Id LIMIT 1];
        List<Cart_Line_Item__c> item = [SELECT Id FROM Cart_Line_Item__c WHERE Cart__c =:cart[0].Id LIMIT 1];
        System.assert(item.size() > 0, 'Cart line item was not created');
    }

    @isTest //Creates new cart line item
    static void addProductToCartTest2(){
        List<Product__c> product2 = [SELECT Id FROM Product__c WHERE Name ='TestProduct2'];

        List<Account> acc = [SELECT Id FROM Account WHERE Name = 'Penguin'];
        Cart__c testCart = new Cart__c(Account__c = acc[0].Id, Status__c = 'Draft');
        insert testCart;

        Integer quantity = 1;
        Id productId = product2[0].Id;

        SF_CartController.addProductToCart(productId, quantity);
        List<Cart_Line_Item__c> item = [SELECT Id FROM Cart_Line_Item__c WHERE Product__c =:productId LIMIT 1];
        System.assert(item.size() > 0, 'Cart line item was not created');
    }
    
    @isTest //Creates new cart line item when quantity is null
    static void addProductToCartTest3(){
        List<Product__c> product3 = [SELECT Id FROM Product__c WHERE Name ='TestProduct3'];

        List<Account> acc = [SELECT Id FROM Account WHERE Name = 'Penguin'];
        Cart__c testCart = new Cart__c(Account__c = acc[0].Id, Status__c = 'Draft');
        insert testCart;

        Integer quantity = null;
        Id productId = product3[0].Id;

        SF_CartController.addProductToCart(productId, quantity);
        List<Cart_Line_Item__c> item = [SELECT Id FROM Cart_Line_Item__c WHERE Product__c =:productId LIMIT 1];
        System.assert(item.size() > 0, 'Cart line item was not created');
    }

    @isTest //Updates cart line item quantity
    static void addProductToCartTest4(){

        List<Product__c> product4 = [SELECT Id FROM Product__c WHERE Name ='TestProduct4'];
        List<Account> acc = [SELECT Id FROM Account WHERE Name = 'Penguin'];
        Cart__c testCart = new Cart__c(Account__c = acc[0].Id, Status__c = 'Draft');
        insert testCart;
    
        Integer quantity = 1;
        Id productId = product4[0].Id;

        SF_CartController.addProductToCart(productId, quantity);
        SF_CartController.addProductToCart(productId, quantity);

        List<Cart_Line_Item__c> item = [SELECT Id, Quantity__c FROM Cart_Line_Item__c WHERE Product__c =:productId LIMIT 1];
        System.assert(item[0].Quantity__c > 1, 'Cart line item quantity was not updated');
    }

    @isTest //Sends email after order placement
    static void sendMailTest(){
        List<Account> acc = [SELECT Id FROM Account WHERE Name = 'Penguin'];
        Order__c testOrder = new Order__c(Account__c = acc[0].Id, Status__c = 'Shipping');
        insert testOrder;

        Id orderId = testOrder.Id;
        SF_CartController.sendMail(orderId);
    }
}


    // Account testAcc = new Account(
    //     Id = TestUtility.getFakeId(Account.SObjectType),
    //     Name = 'testAccount'
    // );