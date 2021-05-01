import { ContactBox } from "./ContactForm.js";


const aFunction = {
     open : function() {
        console.log('yamminy open');
     },
     close : function() {
         console.log('yamminy close');
     }
}

const aSecondFunction = {
    donuts: 'donut eater',

    open : function() {
        console.log('beano open');
     },
     close : function() {
         console.log('beano close');
     },

     print: function() {
         console.log(donuts);
     }
}

export const AllPanelsList = {
    panels : [aFunction,
    aSecondFunction,
    ContactBox],

    closeAnyPanelIfOpen : function() {  
        for (let panel of this.panels) {
            if (panel.isOpen) {
                panel.close()
            }
        }
    },




}

 