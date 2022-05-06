trigger OrderPlacementEmail on Order__c (after insert) {
	if (Trigger.isInsert) {
    	//for(Order__c a:Trigger.New){
          
        //}
   
       
        EmailManager.sendMail('lukamikatsadze@gmail.com', 'Order Placement Notification', 
                   				'Order was placed.');
    }

}