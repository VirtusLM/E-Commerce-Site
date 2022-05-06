import { LightningElement, wire, api, track } from 'lwc';
import getCarts from '@salesforce/apex/CartController.getCarts';
import updateItemQuantity from '@salesforce/apex/CartController.updateItemQuantity';
import deleteCartLineItem from '@salesforce/apex/CartController.deleteCartLineItem';
import deleteCart from '@salesforce/apex/CartController.deleteCart';
import placeNewOrder from '@salesforce/apex/OrdersController.placeNewOrder';
import checkAddress from '@salesforce/apex/OrdersController.checkAddress';
import SuccessfulLabel from '@salesforce/label/c.SuccessfulLabel';
import ErrorLabel from '@salesforce/label/c.ErrorLabel';
import NoAddressLabel from '@salesforce/label/c.NoAddressLabel';
import { refreshApex } from '@salesforce/apex';

export default class Sf_CartPage extends LightningElement {
    loader;
    @api recordId;
    @track
    cartLineItems=[];
    name; //cart name
    status; //cart status
    totalQty;
    totalPrice;
    wiredCartsData;
    cartId;
    cart;
    errors;

    shippingAddress;
    shippingCountry;

    label;
    isModalOpen = false;

    closeModal() {
        this.isModalOpen = false;
    }

    // getting carts data
    @wire(getCarts)
    wiredDetails(wireResult) {
        const { data, error } = wireResult;
        this.wiredCartsData = wireResult;
        if(data) {
            this.cart = data; 
            this.cartLineItems = data.Cart_Line_Items__r; 
            this.name = data.Name;  
            this.status = data.Status__c; 
            this.totalQty = data.Total_Quantity__c; 
            this.totalPrice = data.Total_Price__c;
            this.cartId = data.Id;
        } else {
            this.errors = error;
        } 
    }

    getInputFieldValue(event){
        this.inputFieldValue = event.target.value;
    }

    // change cart line items quantity 
    changeQuantity(event){
        const index = event.currentTarget.dataset;
        const itemId1 = index.id;
        const itemQuantitydata = this.template.querySelector('input[data-id=' + itemId1 + ']').value;

        
        if(parseInt(itemQuantitydata, 10) <= 0 || undefined){ // if quantity is below 0 cart line item will be deleted
            const inputPar = {deleteId : itemId1}
            deleteCartLineItem(inputPar).then(result =>{
                refreshApex(this.wiredCartsData);
            }).catch(error =>{
                this.isModalOpen = true;
                this.label = ErrorLabel;
            })
        } else if(parseInt(itemQuantitydata, 10) > 0){
            const inputPar = { itemId : itemId1, itemQuantity : itemQuantitydata};
            console.log(inputPar)
            updateItemQuantity(inputPar)
            .then(result => {
                refreshApex(this.wiredCartsData);})
            .catch(error => {
                this.label = ErrorLabel;
                this.isModalOpen = true;
                });
            }   
        }

    // Delete cart line item 
    deleteLineItem(event){
        const itemIndex = event.currentTarget.dataset;
        const lineItemId = itemIndex.id;
        const deleteIdItem = {deleteId : lineItemId}
        deleteCartLineItem(deleteIdItem)
        .then(result => {
            refreshApex(this.wiredCartsData);})
       .catch(error => {
            this.label = ErrorLabel;
            this.isModalOpen = true;
            });
        }

    // Delete cart 
    deleteCart(){
        const delCartbyId = {deleteCartId : this.cartId}
        deleteCart(delCartbyId).then(result => {
            refreshApex(this.wiredCartsData);
            this.isModalOpen = true;
            this.label = SuccessfulLabel;  
        }).catch(error => {
            this.isModalOpen = true;
            this.label = ErrorLabel;    
        });
    }
    //getting shipping address and shipping country values
    connectedCallback(){
        checkAddress().then(response => {
            console.log('response from apex method', response)
            this.shippingAddress = response[0].Shipping_Street__c;
            this.shippingCountry = response[0].Shipping_Country__c;
        }).catch(error => {console.log(error)});
    }
    // Place Order 
    placeOrder(event){
        const inputPar = {CurrentCartId : this.cart.Id}
        //checking is shipping address is null, if not order will be placed
        if(!this.shippingAddress || !this.shippingCountry){
            this.isModalOpen = true;
            this.label = NoAddressLabel; 
        } else{
            placeNewOrder(inputPar).then(result => {
                refreshApex(this.wiredCartsData);
                this.isModalOpen = true;
                this.label = SuccessfulLabel;  
            }).catch(error => {
                this.isModalOpen = true;
                this.label = ErrorLabel;        
            });
        }   
    }
}