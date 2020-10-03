function DisplayMessage(){

    var inputs = document.getElementsByClassName('IMEDate');
    for(var i = 0; i < inputs.length; i++) {
        if(inputs[i].type.toLowerCase() == 'text') {
           let findItem=document.getElementById('rnd'+i);
           if(findItem) 
             inputs[i].id= 'rnd'+i;
           else{
            inputs[i].id= 'rnd'+i;
            var customOptions = {
             placeholder: ""
             , twodigit: true
             , nextButtonIcon: "assets/icon/timeir_next.png"
             , previousButtonIcon: "assets/icon/timeir_prev.png"
             , buttonsColor: "blue"
             , forceFarsiDigits: true
             , markToday: true
             , markHolidays: true
             , highlightSelectedDay: true
             , sync: true
             , closeAfterSelect:true
             , gotoToday: true
           }
           kamaDatepicker('rnd'+i, customOptions);
           }
      
        }
    }

}
function inputValueChanged(val){
    var event = new CustomEvent("CallAngularService");
    window.dispatchEvent(event);
  };