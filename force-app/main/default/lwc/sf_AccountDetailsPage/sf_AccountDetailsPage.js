import { LightningElement, track } from 'lwc';
import getAccountDetails from '@salesforce/apex/AccountController.getAccountDetails';
import updateAccountFields from '@salesforce/apex/AccountController.updateAccountFields';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';



export default class Sf_AccountDetailsPage extends LightningElement {

        @track editMode=true;
        @track buttonLabel = 'Edit';
        @track shippingPostalCode;
        areDetailsVisible = false;

        connectedCallback(){
            getAccountDetails().then(response => {
                console.log('response from apex method', response)
                this.accId = response[0].Id;
                this.accName = response[0].Name;
                this.accPhone = response[0].Phone;
                this.shippingCountry = response[0].Shipping_Country__c;
                this.shippingPostalCode = response[0].Shipping_Postal_Code__c;
                this.shippingAddress = response[0].Shipping_Street__c;
            }).catch(error => {console.log(error)});
            
        }

        
        // a_Id_Ref;
        // a_Name_Ref;
        // a_Phone_Ref;
        // a_Street_Ref;
        // a_Country_Ref;
        // a_PostalCode_Ref;

        // handle_Name_Change(event) { 
        //     this.a_Name_Ref = event.detail.value;
        // }
       
        // handle_Phone_Change(event) {
        //     this.a_Phone_Ref = event.detail.value;         
        // }
       
        // handle_Street_Change(event) {
        //     this.a_Street_Ref = event.detail.value;
        // }
    
        // handle_Country_Change(event) {
        //     this.a_Country_Ref = event.detail.value;
        // }
    
        // handle_PostalCode_Change(event) {
        //     this.a_PostalCode_Ref = event.detail.value;
        // }

        hasNull(arry) {
            return arry.includes('');
        }
        

        editButton(){
            if(this.editMode === true){
                this.editMode = false;
                this.buttonLabel = 'Save';
            } else if (this.editMode === false){
                this.editMode = true;
                this.buttonLabel = 'Edit';

                const inputcheckArray = [
                this.template.querySelector('[data-id=accName]').value, 
                this.template.querySelector('[data-id=accPhone]').value,
                this.template.querySelector('[data-id=accShippingAddress]').value,
                this.template.querySelector('[data-id=accCountry]').value, 
                this.template.querySelector('[data-id=accPostalCode]').value
            ]

            if(!this.hasNull(inputcheckArray)){
                const inputPar = { 
                    accId : '0018c000029MEBLAA4',
                    name : inputcheckArray[0], 
                    phone : inputcheckArray[1], 
                    street : inputcheckArray[2],
                    country : inputcheckArray[3], 
                    postalCode : inputcheckArray[4]
                };
                updateAccountFields(inputPar)
                .then(result => {
                    this.areDetailsVisible = false;
                    const event = new ShowToastEvent({
                        title: 'Account Update Complete',
                        variant: 'success'
                    });
                    this.dispatchEvent(event);
                })
                .catch(error => {
                    const event = new ShowToastEvent({
                        title : 'Error',
                        message : 'Error creating contact. Please Contact System Admin',
                        variant : 'error'
                    });
                    this.dispatchEvent(event);
                });
            } else {
                this.editMode = false;
                this.buttonLabel = 'Save';
                this.areDetailsVisible = true;
                console.log(this.areDetailsVisible);
            }
                


            
                // for(const Element in inputPar){     
                //     if(inputPar[Element].length > 0){
                //         console.log(inputPar[Element], Element);                             
                //     } else {
                //         console.log(Element);
                //     }
                // }

                
        
                //console.log(JSON.stringify(inputPar));


                
        }
            }

}