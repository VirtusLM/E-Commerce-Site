import { LightningElement, wire } from 'lwc';
import getCarts from '@salesforce/apex/CartController.getCarts'

export default class Sf_CartPageButton extends LightningElement {
    value;
    @wire(getCarts)
    wiredCartsData(result){
        this.wiredCartsData = result;
        if(result.data){
            this.cartsData = result.data;
            this.error = undefined;
            console.log("carts data " + this.wiredCartsData);
            console.log(JSON.stringify(this.wiredCartsData));
            this.value = this.cartsData[0].Total_Quantity__c;     
      
        } else if(result.error){

            const event = new ShowToastEvent({
                title : 'No Carts Found',
                message : 'There is no Cart',
                variant : 'error'
            });
            this.dispatchEvent(event);
        }
    }

}