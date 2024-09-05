AFRAME.registerComponent("atoms", {
    init: async function(){
        //obtener los detalles de la composición del elemento
        var compouns = await this.getCompounds()
        var barcodes = Object.keys(compouns)

        barcodes.map(barcode =>{
            var element = compouns[barcode]
            //llamamos la función
            this.createAtoms(element)
        })
    },
    getCompounds: function(){
        return fetch("./js/compoundList.json")
        .then(res => res.json())
        .then(data => data)
    },
    getElementColors: function(){
        return fetch("./js/elementColors.json")
        .then(res => res.json())
        .then(data => data)
    },
    createAtoms: async function (element) {
        //Datos del elementos
        var elementName = element.element_name
        var barcodeValue = element.barcode_value
        var numOfElectron = element.number_of_electron

        //Obtener el color del elemento
        var colors = await this.getElementColors()
        
        //
        var scene = document.querySelector("a-scene")

        //añadir la entidad marcador para el marcador de codigo de barras
        var marker = document.createElement("a-marker")
        marker.setAttribute("id", `marker-${barcodeValue}`)
        marker.setAttribute("type", "barcode")
        marker.setAttribute("element_name", elementName)
        marker.setAttribute("value", barcodeValue)

        scene.appendChild(marker)
    }
  
});
