import { LightningElement, api, wire, track } from 'lwc';
import getOrderById from '@salesforce/apex/OrdersController.getOrderById';
export default class Sf_OrderDetails extends LightningElement {
    @api recordId;
    @api orderId;
    @track orders;
    error;


    @wire(getOrderById, {orderId:'$recordId'})    
    retrieveProducts({error, data}){
          if(data){
                this.orders = data[0];
                this.error = undefined;
                console.log(data)
               }else{
                this.orders = undefined;
                this.error = error;
              }
           }
      
}