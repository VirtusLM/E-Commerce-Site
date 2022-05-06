import { LightningElement, api, wire } from 'lwc';
import getProductById from '@salesforce/apex/SF_ProductController.getProductById';
import addProductToCart from '@salesforce/apex/SF_CartController.addProductToCart';
import {NavigationMixin} from 'lightning/navigation';

export default class sf_ProductDetails extends NavigationMixin (LightningElement) {
    @api recordId;
    quantity;
    product;
    error;
    quantity = 1;
    loader;

    @wire(getProductById, ({productId:'$recordId'}))
    retrieveProducts({error, data}){
      if(data){
          this.product = data[0];
          this.error = undefined;
      }else{
          this.product = undefined;
          this.error = error;
      }
  }

  openModal = false;
  showModal() {
    this.openModal = true;
  }
  closeModal() {
    this.openModal = false;
  }

  changeQuantity(event){
    this.quantity = event.target.value;
  }

  async addProductToCartClick(event){
    this.loader = true;
    const productId = event.target.dataset.id;

    try{
      await addProductToCart({productId:productId, quantity:this.quantity});
      this.loader = false;
    }catch(error){
      this.loader = false;
      this.text = 'Sorry, you can\'t add more than 5 products.';
      this.header = 'Attention!';
      this.showModal();
      if(this.quantity <= 0){
        this.loader = false;
        this.text = 'You should add at least 1 product.';
        this.header = 'Attention!';
        this.showModal();
      }
    }
  }
}
