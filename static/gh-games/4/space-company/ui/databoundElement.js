(function(){

    var elementRegister = {};
    var autoBindingRegister = [];

    function DataBoundElement(valueLambda, id, element) {
        if(!id) {
            id = null;
        }

        if(!element) {
            element = null;
        }

        this.id = id;
        this.element = element;
        this.valueLambda = valueLambda;
        this.value = null;
    }

    // ---------------------------------------------------------------------------
    // basic functions
    // ---------------------------------------------------------------------------
    DataBoundElement.prototype.update = function(delta) {
        if(this.element === null) {
            if(this.id !== null) {
                this.element = $('#' + this.id);
                if(this.element.length === 0){
                    console.error("Could not find bound element: " + this.id);
                    this.element = null;
                    return;
                }
            }
        }

        var newValue = this.valueLambda();
        if(this.value !== null && this.value === newValue) {
            // No change
            return;
        }

        this.element.setText(newValue);
        this.value = newValue;
    };

    Game.ui.bindElement = function(id, valueLambda) {
        if(elementRegister[id]) {
            console.error("Element " + id + " is already bound!");
            return;
        }

        var element = new DataBoundElement(valueLambda, id);
        elementRegister[id] = element;
        return element;
    };

    Game.ui.updateBoundElements = function(delta) {
        for(var key in elementRegister) {
            elementRegister[key].update(delta)
        }

        for(var i = 0; i < autoBindingRegister.length; i++){
            autoBindingRegister[i].update(delta);
        }
    };

    Game.ui.updateAutoDataBindings = function() {
        // Clear the register first
        autoBindingRegister = [];

        $('span[data-bind]').each(function(){
            var element = $(this);
            var target = element.data("bind");

            var registeredBinding = elementRegister[target];
            if(!registeredBinding) {
                return;
            }

            var binding = new DataBoundElement(registeredBinding.valueLambda, null, element);
            autoBindingRegister.push(binding);
        });
    };

}());