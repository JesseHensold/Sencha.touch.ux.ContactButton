Ext.ns("Ext.touch.ux.plugin");

Ext.touch.ux.plugin.ContactButton = Ext.extend(Ext.Button, {
	iconMask: true,
	initComponent: function(){
		Ext.applyIf(this,{
			iconAlign: 'right',
		});
		Ext.touch.ux.plugin.ContactButton.superclass.initComponent.apply(this, arguments);
		this.text=this.getTextString(this.buttonType);
		this.handler=function(){
			this.handleTap();
		};		
	},
	getTextString: function(type){
		if(type.toLowerCase()=='address'){
			var str=Ext.util.Format.ellipsis(this.text[0], 40)+'<br>';
			var str2=Ext.util.Format.ellipsis(this.text[1], 40);
			return str+str2;
		}else{
			return this.text;
		}
	},
	getIcon: function(){
		var type=this.address.codeAddrType;
		if (type=='Home'){
    		return 'home';
    	}else if (type=='Business'){
    		return 'briefcase1';
    	}else if (type=='Cell'){
    		return 'phone2';
    	}
	},
	
	handleTap: function(){
			var actions= new Ext.ActionSheet({
				layout: {
					type: 'vbox',
					direction: 'reverse',
					align: 'stretch'
				},
				defaults:{
					ui: 'confirm'
				},
				items: [{
					text : 'Cancel',
					ui: 'decline',
					scope : this,
					handler : function(){
						actions.hide();
					}
				}]
			});
		this.getActionButtons(actions);	
    	actions.show();
	},
	
	getActionButtons: function(actions){
		var contactString=this.text;
		if(this.buttonType.toLowerCase()=='phone'){
			actions.add(
			{
				text: 'Text',
				ui: 'confirm',
				handler: function(){
					actions.hide();
					window.location='sms:'+contactString;
				}
			},{
				text: 'Call',
				ui: 'confirm',
				handler: function(){
					actions.hide();
					window.location='tel:'+contactString;
				}
			});
		}else if(this.buttonType.toLowerCase()=='address'){
			actions.add({
				text: '<a href="http://maps.google.com?q='+contactString.replace("<br>",",")+'" style="text-decoration: none;color:inherit;">Go To Maps</a>',
				ui: 'confirm'
			});
		}else if(this.buttonType.toLowerCase()=='email'){
			actions.add({
				text: 'Email',
				handler : function(){
					actions.hide();
					window.location='mailto:'+contactString;
				}
			});
		}
		actions.doLayout();
	}

});
Ext.reg('contactButton',Ext.touch.ux.plugin.ContactButton);