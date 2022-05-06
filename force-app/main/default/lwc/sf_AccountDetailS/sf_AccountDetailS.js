import { LightningElement, track } from 'lwc';
import accountDet from '@salesforce/apex/GetAccountDetails.accountDet';
import updateAccountFields from '@salesforce/apex/updateAccount.updateAccountFields';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class accDetails extends LightningElement{
    @track shippingCountry;
    @track editMode=true;
    @track buttonLabel = 'Edit';
    @track shippingPostalCode;
    connectedCallback(){
        accountDet().then( response => {
            console.log('response from apex method', response)
            this.accId = response[0].Id;
            this.accName = response[0].Name;
            this.accPhone = response[0].Phone;
            this.shippingCountry = response[0].Shipping_Country__c;
            this.shippingPostalCode = response[0].Shipping_Postal_Code__c;
            this.shippingAddress = response[0].Shipping_Street__c;
        }).catch(error => {console.log(error)});
        
    }
    a_Id_Ref;
    a_Name_Ref;
    a_Phone_Ref;
    a_Street_Ref;
    a_Country_Ref;
    a_PostalCode_Ref;
   
    handle_Name_Change(event) {
        this.a_Name_Ref = event.detail.value;
    }
   
    handle_Phone_Change(event) {
        this.a_Phone_Ref = event.detail.value;
    }
   
    handle_Street_Change(event) {
        this.a_Street_Ref = event.detail.value;
    }

    handle_Country_Change(event) {
        this.a_Country_Ref = event.detail.value;
    }
   
    handle_PostalCode_Change(event) {
        this.a_PostalCode_Ref = event.detail.value;
    }

    editButton(){
        if(this.editMode === true){
            this.editMode = false;
            this.buttonLabel = 'Save';
        } else if (this.editMode === false){
            this.editMode = true;
            this.buttonLabel = 'Edit';
            updateAccountFields({ 
                Id : this.a_Id_Ref,
                Name : this.a_Name_Ref, 
                Phone : this.a_Phone_Ref, 
                Street : this.a_Street_Ref,
                Country : this.a_Country_Ref, 
                PostalCode : this.a_PostalCode_Ref
            })
            .then(result => {
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
    }
        }
}