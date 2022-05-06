import { LightningElement, wire } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
import getProductsCount from '@salesforce/apex/SF_ProductController.getProductsCount';
import viewProducts from '@salesforce/apex/SF_ProductController.viewProducts';
import searchProducts from '@salesforce/apex/SF_ProductController.searchProducts';
import addProductToCart from '@salesforce/apex/SF_CartController.addProductToCart';
	
export default class SF_NewLanding extends NavigationMixin (LightningElement) {
    loader;
    searchTerm = '';
    error;
    products = [];
    retrieveProducts = [];
    @wire(searchProducts, {searchTerm:'$searchTerm'})
    retrieveProducts({error, data}){
        if(data){
            this.products = data;
        }else{
            console.log(error);
        }
    }
    //Searches product on enter click
    handleEnter(event) {
        if(event.keyCode === 13){
            this.searchTerm = event.target.value;
        }
    }   
    get resultProducts() {
        return (this.products.length > 0);
    }

    paginationRange = [];
    totalProducts;
    //Pagination method
    connectedCallback() {
        getProductsCount().then(count => {
            if (count) {
                this.totalProducts = count;
                viewProducts().then(data => {
                    this.products = data;
                    const paginationNumbers = Math.ceil(this.totalProducts / 8);
                    for (let i=1; i<=paginationNumbers; i++){
                        this.paginationRange.push(i);
                    }
                });
            }                   
        });
    }
    //Calls pagination method from apex
    handlePaginationClick(event) {
        let offsetNumber = event.target.dataset.targetNumber;
        viewProducts({ offsetRange: 8 * (offsetNumber - 1) })
            .then(data => {
                this.products = data;
            })
            .catch(error => {
                console.log(error);
            });
    }
    //Redirects to product details page
    productDetailsClick(event) {
        const productId = event.target.dataset.id;
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: 'product/' + productId
            }
        },
            true
        );
    }
    //Modals
    openModal = false;
    showModal() {
        this.openModal = true;
    }
    closeModal() {
        this.openModal = false;
    }
    //Adds product to cart and shows validation rule
    async addProductToCartClick(event){
        this.loader = true;
        const productId = event.target.dataset.id;
        try{
            await addProductToCart({productId:productId, quantity:1} );
            this.loader = false;
            }
        catch(error){
            this.showModal();
            this.header = 'Attention!';
            this.text = 'Sorry, you can\'t add more than 5 products.';
            this.loader = false;  
        }
    }
}


























 