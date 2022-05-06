public class OrdersController {
    @auraenabled
    public static List<Account> checkAddress(){
        return [SELECT Shipping_Street__c, Shipping_Country__c FROM Account WHERE Id = '0018c000029MEBLAA4'];
    }
    
    
    // Place Order
    @auraenabled
    public static void placeNewOrder(Id CurrentCartId){
   
            // Create New Order            
            Order__c newOrder = new Order__c();
           	
            newOrder.Account__c = '0018c000029MEBLAA4';
            newOrder.Cart__c = CurrentCartId;
           
            Insert newOrder;
            Id orderId = newOrder.Id;
            //Sends email after order placement
            SF_CartController.sendMail(orderId); 
                        
            // Insert Products to Order Products
            List<Cart__c> cart = [SELECT Id, Name, Status__c, Total_Quantity__c, Account__r.Name,
                                 (SELECT Id, Name, Product__c, Quantity__c,
                                  Price__c, Product_Description__c FROM Cart_Line_Items__r)
                                 FROM Cart__c WHERE Id=:CurrentCartId LIMIT 1];
            
      
            List<Order_Product__c> orderProducts = new List<Order_Product__c>();
            
            for (Cart_Line_Item__c cartLineItem : cart[0].Cart_Line_Items__r){
                Order_Product__c newOrderProduct = new Order_Product__c();
                newOrderProduct.Order__c = newOrder.Id;
                newOrderProduct.Product__c = cartLineItem.Product__c;
                newOrderProduct.Quantity__c = cartLineItem.Quantity__c;
                newOrderProduct.Net_Price__c = cartLineItem.Price__c;
                newOrderProduct.Product_Description__c = cartLineItem.Product_Description__c;
                
                orderProducts.add(newOrderProduct);

            }
                Insert orderProducts;
        

            // Change Cart Status
        
            Cart__c cartStatus = new Cart__c();
            
            cartStatus.Id = CurrentCartId;
            cartStatus.Status__c = 'Processed';
            
            Update cartStatus;             
    }

    //get orders data from database
    
    @auraenabled (cacheable = true)
    public static List<Order__c> ordersList(){
        try{
            return [SELECT Id, Name, Cart__c, Account__c, Status__c, Total_Price__c, Total_Quantity__c, Account__r.Shipping_Street__c FROM Order__c];

        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }  
    
    // get order details
    @AuraEnabled(cacheable=true)
    public static List<Order__c> getOrderById(Id orderId){
        System.debug('order id  ' + orderId);
        return [SELECT Id, Name, Cart__c, Account__c, Status__c, Total_Price__c,
                   Total_Quantity__c, Account__r.Shipping_Street__c, (SELECT Product_Name__c, Quantity__c, Net_Price__c, Product_Description__c FROM Order_Products__r) FROM
                   Order__c WHERE Id=:orderId];

    }

    
}