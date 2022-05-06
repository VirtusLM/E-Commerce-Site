@isTest
public class SF_ProductControllerTest {

    @TestSetup
    static void makeData(){
        Product__c product = new Product__c(Name ='TestName');
        insert product;   
    }

    @isTest //When offsetrange = 8
    static void viewProductsTest1(){
        Integer offsetRange = 8;
        List<Product__c> viewproducts = SF_ProductController.viewProducts(offsetRange);
        System.assert(viewproducts != null, 'Products not found');
    }

    @isTest //When offsetrange = null
    static void viewProductsTest2(){
        Integer offsetRange = null;
        List<Product__c> viewproducts = SF_ProductController.viewProducts(offsetRange);
        System.assert(viewproducts.size() > 0, 'Products not found');
    }
    
    @isTest //When searchterm is TestName
    static void searchProductsTest1(){
        String searchTerm = 'TestName';
        List<Product__c> testProduct = SF_ProductController.searchProducts(searchTerm);
        System.assert(testProduct.size() > 0, 'Search product was not found');
    }

    @isTest //When searchterm is empty
    static void searchProductsTest2(){
        String searchTerm = '';
        List<Product__c> testProduct = SF_ProductController.searchProducts(searchTerm);
        System.assert(testProduct.size() > 0, 'Search product was not found');
    }

    @isTest //Gets products by id
    static void getProductByIdTest(){
        List<Product__c> products = [SELECT Id, Name FROM Product__c WHERE Name = 'TestName'];
        Id productId = products[0].Id;
        List<Product__c> testProduct = SF_ProductController.getProductById(productId);
        System.assert(testProduct.size() > 0, 'Product was not found by Id');
    }
    
    @isTest //Gets products count
    static void getProductsCountTest(){
        System.assert(SF_ProductController.getProductsCount() > 0, 'Products were not found');
    }
}