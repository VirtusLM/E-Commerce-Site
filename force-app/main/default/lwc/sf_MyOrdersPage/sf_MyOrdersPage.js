import { LightningElement, wire, track} from 'lwc';
import ordersList from '@salesforce/apex/OrdersController.ordersList';
import {NavigationMixin} from 'lightning/navigation';

export default class Sf_MyOrdersPage extends NavigationMixin (LightningElement) {


@track orders;
@track error;

    connectedCallback(){
        ordersList()
        .then(result => {
            this.orders = result;
            this.error = undefined;
            
        })
        .catch(error => {
            this.error = error;
            this.contacts = undefined;
        });
    }    

    orderDetailsClick(event) {
        const orderId = `${event.target.dataset.id}`;
        console.log(orderId)
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: `/order/${orderId}`
            }
        },
            true
        );
    }

}