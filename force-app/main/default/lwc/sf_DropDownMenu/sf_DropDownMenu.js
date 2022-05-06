import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class NavToAcc extends NavigationMixin(
    LightningElement
) {
    navigateToAcc(AccountDetails)
    {
           // Navigate to a URL
           this[NavigationMixin.Navigate]({
               type: 'standard__webPage',
               attributes: {
                   url: '/accountdetails'
               }
           },
           true
         );
       }
}