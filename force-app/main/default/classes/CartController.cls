public with sharing class CartController {
    
    //Getting cart data
    @auraenabled(cacheable=true)
    public static Cart__c getCarts(){
            Cart__c[] cart = [SELECT Id, Name, Order__c, Status__c, Total_Quantity__c, Total_Price__c, (SELECT Id, Product_Name__c, Quantity__c,
                                                                                         Product_Description__c, Price__c, Total_Price__c FROM Cart_Line_Items__r) 
                																		FROM Cart__c WHERE Account__c = '0018c000029MEBLAA4' and Status__c = 'Draft'                 
                order by CreatedDate desc LIMIT 1
                
            ];
            
            return cart.isEmpty() ? null : cart[0];
    
    }
    
    

    //Get item quantity from js and update
    @auraenabled
    public static void updateItemQuantity(Id itemId, String itemQuantity){
        try{
            Cart_Line_Item__c item = new Cart_Line_Item__c();
            
            item.Id = itemId;
            item.Quantity__c = Decimal.valueOf(itemQuantity);
            
            Update item;
        } catch (Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    
    //Get item id from js and delete item
    
    @auraenabled
    public static void deleteCartLineItem(Id deleteId){
        try{
            Cart_Line_Item__c deleteItem = new Cart_Line_Item__c();
            
            deleteItem.Id = deleteId;
            
            Delete deleteItem;
            
        } catch (Exception e){
            throw new AuraHandledException(e.getMessage());
        }
        
    }
    
    // deleting active cart
    
    @auraenabled
    public static void deleteCart(Id deleteCartId){
        try{
            Cart__c delCart = new Cart__c();
            
            delCart.Id = deleteCartId;
            
            Delete delCart;
        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    
    }
}