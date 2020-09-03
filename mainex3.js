$(document).ready(function () {
    var kind_of = ["Tots"];
    var markerItem;
    var layerMarkers = L.layerGroup()
    //Carreguem el JSON 
    $.getJSON("http://localhost:8080/apiRestaurants.php",
        function (data) {
            //extreu el tipus de restaurant i els divideix per la coma;

            $.each(data, function (index, item) {

                var kindArr = item.kind_food.split(', ');
                $.each(kindArr, function (indexInArray, kind) {
                    kind_of.push(kind)
                });


            });

            // Eliminem del array de tipus de restaurants els duplicats    
            kind_of = [...new Set(kind_of)];
            console.log(kind_of)

            // Pintar opcions dinàmiques del selector   

            $.each(kind_of, function (indexInArray, valor) {
                $('#select_restaurant').html($('#select_restaurant').html()+`
                <option> ${valor} </option>
                `);
            });

            // Pintar tots els restaurants 
            $.each(data, function (index, item) {

                markerItem = L.marker([item.lat, item.lng]).addTo(layerMarkers)
                    .bindPopup("<b>" + item.name + "</b><br/>" + item.kind_food + "<br/>" + item.address);

            });
            


            // Filtrar per select 
            $("#select_restaurant").change(function () {
                var selectedRestaurant = $(this).children("option:selected").val();
                layerMarkers.clearLayers();
                $.each(data, function (index, item,) {
                    if(selectedRestaurant=="Tots"){
                        layerMarkers.clearLayers();
                        $.each(data, function (index, item) {

                            markerItem = L.marker([item.lat, item.lng]).addTo(layerMarkers)
                                .bindPopup("<b>" + item.name + "</b><br/>" + item.kind_food + "<br/>" + item.address);
            
                        });



                    }
                                      
                    
                    else if (item.kind_food.indexOf(selectedRestaurant) >= 0) {
                        markerItem = L.marker([item.lat, item.lng]).addTo(layerMarkers)
                            .bindPopup("<b>" + item.name + "</b><br/>" + item.kind_food + "<br/>" + item.address);

                    }






                });





            }
        );







   
});



var mymap = L.map('mapid').setView([41.56090801119814 , 2.0109701156616215], 15);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZHZpbGxhbmV0IiwiYSI6ImNrZWpuM2FhdzI3cjQyemx0Yjg1NDFzMXIifQ.o_e6KtOoqLQf0Xdm9Xh_Zw'
}).addTo(mymap);
layerMarkers.addTo(mymap);

})

