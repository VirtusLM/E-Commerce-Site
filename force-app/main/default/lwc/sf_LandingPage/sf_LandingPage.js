import { LightningElement, wire, track } from 'lwc';
// import viewProducts from '@salesforce/apex/SF_Pagination.viewProducts';
// import searchProducts from '@salesforce/apex/DisplayProducts.searchProducts';
// import getProductsCount from '@salesforce/apex/SF_Pagination.getProductsCount';





export default class sf_LandingPage extends LightningElement {
    // @wire(viewProducts) 
    // products;
    // // searchTerm = '';
	// // @wire(searchProducts, {searchTerm:'$searchTerm'})
	// // products;
    

    // handleEnter(event) {
    //     if(event.keyCode === 13){
    //         this.searchTerm = event.target.value;
    //     }    
    // }
    // get resultProducts() {
	//     return (this.products.data.length > 0);
    // }


    // @wire (viewProducts) products;

    // @track products = [];
    // @track paginationRange = [];
    // //@track columns = columns;
    // @track totalProducts;

    // constructor() {
    //     super();
    //     getProductsCount().then(count => {
    //         if (count) {
    //             this.totalProducts = count;
                
    //             viewProducts().then(data => {
    //                 let i = 1;
    //                 this.products = data;
                   
    //                 const paginationNumbers = Math.ceil(this.totalProducts / 8);
                     
    //                 while (
    //                     this.paginationRange.push(i++) < paginationNumbers
                     
    //                 ) {}
    //                 console.log(this.paginationRange);
    //             });
    //         }                   
    //     });
    // }

    // handlePaginationClick(event) {
    //     let offsetNumber = event.target.dataset.targetNumber;
        
    //     viewProducts({ offsetRange: 8 * (offsetNumber - 1) })
    //         .then(data => {
    //             this.products = data;
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }
}