Ext.setup({
    onReady: function() {
    	this.viewPort=new Ext.Panel({
    		fullscreen: true,
    		layout: {
    			type:'vbox',
    		},
    		items:[{
    			xtype: 'contactButton',
    			buttonType: 'phone',
    			text: '(555)555-555'
    		},{
    			xtype: 'contactButton',
    			buttonType: 'address',
    			text: ['1600 Pennsylvania Ave', 'Washington D.C., DC 20500']
    		},{
    			xtype: 'contactButton',
    			buttonType: 'email',
    			text: 'me@email.com'
    		}]
    	});
    }
});