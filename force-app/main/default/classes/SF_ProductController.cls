/*
* ============================================
* @apexClassName: SF_ProductController.cls
* @description: Class containing the logic of viewing products with pagination, searching, getting count and id's.
* @author: L.Mikatsadze
* @email: l.mikatsadze@makingscience.com
* @testClass: SF_ProductControllerTest.cls
* @dateCreated: 27/02/2022
* @lastChange: 10/03/2022 by L.Mikatsadze
* ============================================
*/
public with sharing class SF_ProductController{
    
    //@author: L.Mikatsadze
    //@description: Gets products count
    @AuraEnabled(cacheable=true)
    public static Integer getProductsCount(){
        return [SELECT COUNT() FROM Product__c];
    }
    
    //@author: L.Mikatsadze
    //@description: Gets products with pagination
    @AuraEnabled(cacheable=true)
    public static List<Product__c> viewProducts(Integer offsetRange){
        if(offsetRange == null){
            return [SELECT Id, Name, sf_Image_Url__c, Price__c FROM Product__c LIMIT 8];
        }else{
            return [SELECT Id, Name, sf_Image_Url__c, Price__c FROM Product__c LIMIT 8 OFFSET :offsetRange];
        }
    }

    //@author: L.Mikatsadze
    //@description: Products search
    @AuraEnabled(cacheable=true)
    public static List<Product__c> searchProducts(String searchTerm) {
        if(searchTerm == ''){
            return [SELECT Id, Name, sf_Image_Url__c, Price__c FROM Product__c LIMIT 8];
        }
        searchTerm = '%' + searchTerm + '%';
        return [SELECT Id, Name, sf_Image_Url__c, Price__c FROM Product__c WHERE Name LIKE :searchTerm];
    }

    //@author: L.Mikatsadze
    //@description: Gets product by id
    @AuraEnabled(cacheable=true)
    public static List<Product__c> getProductById(Id productId) {
        return [SELECT Id, Name, sf_Image_Url__c, Description__c, Price__c FROM Product__c WHERE Id =:productId LIMIT 1];
    }
}