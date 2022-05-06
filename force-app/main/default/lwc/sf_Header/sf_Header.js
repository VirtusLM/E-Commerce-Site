import { LightningElement, wire} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { refreshApex } from '@salesforce/apex';
import getCarts from '@salesforce/apex/CartController.getCarts'

export default class NavToAcc extends NavigationMixin(
    LightningElement
) {

    // value = [];
    newValue;
    values;

   // Navigate to account details page
    navigateToAcc(AccountDetails)
    {
           this[NavigationMixin.Navigate]({
               type: 'standard__webPage',
               attributes: {
                   url: '/accountdetails'
               }
           },
           true
         );
       }


   // Navigate to cart page
       navigateToCart(Cart)
       {
              this[NavigationMixin.Navigate]({
                  type: 'standard__webPage',
                  attributes: {
                      url: '/cart'
                  }
              },
              true
            );
          }

    
    //display total quantity on header

    // displayTotalQuantity(){
    //     getCarts().then(response => {
    //         console.log('response from apex method', response)
    //         console.log(response[0].Total_Quantity__c);
    //         if(response != undefined){

    //             this.values = response[0].Total_Quantity__c;

    //         } else {
    //             this.values = "";

    //         }           
    //     }).catch(error => {console.log(error)});  
        
    //     refreshApex(getCarts);
    // }

    // connectedCallback(){
    //     this.displayTotalQuantity();
    // }



    @wire(getCarts)
    wiredCarts({ error, data }) {
        if (data) {
            this.newValue = data;
            this.values = this.newValue[0].Total_Quantity__c;
        } else {
            this.values = [];
        }
    }
 
}