var viewer = new Cesium.Viewer('cesiumContainer', {
    baseLayerPicker : true
});

var camera = viewer.scene.camera;


function getRandomHeight() {
	var h = Math.floor(Math.random()*5)+4;
	return h;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getZoneColor(mse) {
	if (mse === '011'){
		return '#F9EBEA';
	} else if (mse == '012'){
		return '#FADBD8';
	} else if (mse == '013'){
		return '#D7BDE2';
	} else if (mse == '014'){
		return '#BB8FCE';
	} else if (mse == '015'){
		return '#5499C7';
	} else if (mse == '016'){
		return '#3498DB';
	} else if (mse == '021'){
		return '#17A589';
	} else if (mse == '022'){
		return '#117A65';
	} else if (mse == '023'){
		return '#196F3D';
	} else if (mse == '024'){
		return '#1863B0';
	} else if (mse == '031'){
		return '#9A7D0A';
	} else if (mse == '032'){
		return '#B9770E';
	} else if (mse == '033'){
		return '#CA6F1E';
	} else if (mse == '034'){
		return '#D35400';
	} else if (mse == '037'){
		return '#F0F3F4';
	} else if (mse == '041'){
		return '#D7DBDD';
	} else if (mse == '042'){
		return '#D5DBDB';
	} else if (mse == '043'){
		return '#E5E8E8';
	} else if (mse == '044'){
		return '#EBEDEF';
	} else if (mse == '045'){
		return '#D5D8DC';
	} else if (mse == '046'){
		return '#641E16';
	} else if (mse == '047'){
		return '#943126';
	} else if (mse == '050'){
		return '#76448A';
	} else {
		return '#8E44AD';
	}
}

function getScenarioHeight(mse) {
	if (mse == '013'){
		var h = Math.floor(Math.random()*10)+25;
		return h;
	} else {
		return getRandomHeight();
	}
}

function getScenarioColor(mse){
	if (mse == '013'){
		return '#00FF33';
	} else {
		return getZoneColor(mse);
	}
	///
}

// addModel(-46.591108, -23.619362, 'Archive');

//Section for adding GeoJSON
var buildingsPromise = new Cesium.GeoJsonDataSource();
	buildingsPromise.load('/data/heliopolis-lots.geojson').then(function(dataSource) {
	  viewer.dataSources.add(dataSource);
	  //Get the array of entities
	  var entities = dataSource.entities.values;
	  for (var i = 0; i < entities.length; i++) {
	      //For each entity, create a random color based on the state name.
	      //Some states have multiple entities, so we store the color in a
	      //hash so that we use the same color for the entire state.
	      var entity = entities[i];
	      var name = entity.name;
	      var mse_type = entity.properties.MSE_SETOR;
	      //Set the polygon material to our random color.
	      entity.polygon.material = Cesium.Color.fromCssColorString(getZoneColor(mse_type)).withAlpha(0.6);
	      //Remove the outlines.
	      entity.polygon.outline = true;
	      entity.polygon.outlineColor = '#CCCCCC';
	      // console.log(entity.properties);
	      entity.polygon.extrudedHeight = getRandomHeight();
	  }
	});

var helioHydro = new Cesium.GeoJsonDataSource();
	helioHydro.load('/data/heliopolis-hydro.geojson').then(function(dataSource) {
	  viewer.dataSources.add(dataSource);
	  //Get the array of entities
	  var entities = dataSource.entities.values;
	  for (var i = 0; i < entities.length; i++) {
	      //For each entity, create a random color based on the state name.
	      //Some states have multiple entities, so we store the color in a
	      //hash so that we use the same color for the entire state.
	      var entity = entities[i];
		  //color
	      entity.polygon.material = Cesium.Color.fromCssColorString('#B2EBF2').withAlpha(0.5);
	      entity.polygon.outline = false;
	      // entity.polygon.outlineColor = Cesium.Color.fromCssColorString('#58D68D').withAlpha(0.5);
	  }
	});

var helioParks = new Cesium.GeoJsonDataSource();
	helioParks.load('/data/heliopolis-parks.geojson').then(function(dataSource) {
	  viewer.dataSources.add(dataSource);
	  //Get the array of entities
	  var entities = dataSource.entities.values;
	  for (var i = 0; i < entities.length; i++) {
	      //For each entity, create a random color based on the state name.
	      //Some states have multiple entities, so we store the color in a
	      //hash so that we use the same color for the entire state.
	      var entity = entities[i];
		  //color
	      entity.polygon.material = Cesium.Color.fromCssColorString('#009900').withAlpha(0.5);
	      entity.polygon.outline = true;
	      entity.polygon.outlineColor = Cesium.Color.fromCssColorString('#FFAAFF').withAlpha(0.5);
	  }
	});

$(document).ready(function(){

	$('#fly-through-heliopolis-button').on('click', function(){
		camera.flyTo({ //camera 1 shot
		    destination : Cesium.Cartesian3.fromElements(4114396.23861135, -4341168.49123715, -2617618.0538070835),
			orientation : {
				heading : 5.974708435859849,
				pitch : -1.4277837987541169,
				roll : 0.0051826373180290375
			},
		    easingFunction : Cesium.EasingFunction.LINEAR_NONE,
		    complete : function() {
		      setTimeout(function() {
		      camera.flyTo({ //camera 2 shot
			  destination : Cesium.Cartesian3.fromElements(4048648.777992658, -4212094.4313866515, -2684227.2204619423),
			  orientation : {
				heading : 5.947071666471578,
				pitch : -0.37289084553931584,
				roll : 0.0008837617004280318
			  },
		      easingFunction : Cesium.EasingFunction.CIRCULAR_OUT,
		      complete: function() { 
		        camera.flyTo({ //camera 3 shot
					destination : Cesium.Cartesian3.fromElements(4022084.9171752017, -4243577.183598845, -2556820.9124133023),
					orientation : {
						heading : 5.94997006231741,
						pitch : -0.3529069669196292,
						roll : 0.0008408931160088784
					},
		          easingFunction : Cesium.EasingFunction.QUADRATIC_IN,
		          complete: function() { 
		          camera.flyTo({ //camera 4 shot
		         	destination : Cesium.Cartesian3.fromElements(4024036.548174772, -4245478.011623225, -2540292.305745114),
					orientation : {
						heading : 4.699513531195066,
						pitch : -0.40233007019024947,
						roll : 0.0026730265241878826
					},
		            easingFunction : Cesium.EasingFunction.EXPONENTIAL_IN_OUT,
		            duration: 5,
		            complete: function() { 
		            camera.flyTo({//camera 5 shot
		            	destination : Cesium.Cartesian3.fromElements(4020180.0980214262, -4250149.238250935, -2540483.0704719718),
						orientation : {
							heading : 5.777291367510548,
							pitch : -1.5595453485448547,
							roll : 0
						},
		              easingFunction : Cesium.EasingFunction.QUADRATIC_IN,
		              duration: 5,
		              complete: function() { 
		              camera.flyTo({//camera 6 shot
						destination : Cesium.Cartesian3.fromElements(4018776.522124197, -4248050.882937766, -2541058.341054206),
						orientation : {
							heading : 5.95224310341947,
							pitch : -0.5307512615965817,
							roll : 0.0009258716562525748
						},
		                easingFunction : Cesium.EasingFunction.SINUSOIDAL_IN_OUT,
		                duration: 5,
		              complete: function() { 
		              camera.flyTo({//camera 7 shot
						destination : Cesium.Cartesian3.fromElements(4018637.5095595857, -4248866.375326221, -2538732.7173425136),
						orientation : {
							heading : 2.6947772819164273,
							pitch : -0.088332194370496,
							roll : 6.282118377800003
						},
		                easingFunction : Cesium.EasingFunction.CIRCULAR_IN,
		                duration: 5

		                
		                }); //end camera 7 shot
		              }

		                
		                }); //end camera 6 shot
		              }
		            }); //end camera 5 shot
		          }
		          });//end camera 4 shot
		        }
		        }); //end camera 3 shot
		      }
		      

		      });//end camera 2 shot
		        
		        }, 3000);
		    }
		});//end camera 1 shot
	});

	$('#fly-through-heliopolis-button2').on('click', function(){
		camera.flyTo({ //camera 1 shot
		    destination : Cesium.Cartesian3.fromElements(4018132.929967108, -4247474.649304889, -2540296.189229362),
			orientation : {
				heading : 6.040394191604334,
				pitch : -0.23991502491938133,
				roll : 0.0006086495696262517
			},
		    easingFunction : Cesium.EasingFunction.LINEAR_NONE,
		});//end camera 1 shot
	});

	//section for changing checkboxes
	$('#layer-parks ').change(function(){
		if (this.checked) {
			console.log('turned on...');
			viewer.dataSources.add(helioParks);
	    } else {
	    	console.log('turned off...');
			viewer.dataSources.remove(helioParks);
	    }
	});

	$('#layer-water ').change(function(){
		if (this.checked) {
			console.log('turned on...');
			viewer.dataSources.add(helioHydro);
	    } else {
	    	console.log('turned off...');
			viewer.dataSources.remove(helioHydro);
	    }
	});
	$('#layer-buildings ').change(function(){
		if (this.checked) {
			console.log('turned on...');
			viewer.dataSources.add(buildingsPromise);
	    } else {
	    	console.log('turned off...');
			viewer.dataSources.remove(buildingsPromise);
	    }
	});

	$('#run-scenario-impact').on('click', function(){
	    $( "#scenario-results" ).toggle("fast");
	    $( "#run-scenario-impact2" ).toggle("fast");
	    $( "#run-scenario-impact3" ).toggle("fast");
		viewer.dataSources.remove(buildingsPromise);
		viewer.dataSources.add(buildingsPromise);
		var entities = buildingsPromise.entities.values;
		for (var i = 0; i < 3000; i++) {
		  var entity = entities[i];
		  var mse_type = entity.properties.MSE_SETOR;
		  //Set the polygon material to our random color.
		  entity.polygon.material = Cesium.Color.fromCssColorString(getScenarioColor(mse_type)).withAlpha(0.6);
		  entity.polygon.extrudedHeight = getScenarioHeight(mse_type);
		}

	});

}); //End of jQuery

//  //track the camera

   handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
   handler.setInputAction(function(movement) {
    console.log('destination : Cesium.Cartesian3.fromElements' + viewer.camera.position + ',\norientation : {\n\theading : ' + viewer.camera.heading + ',\n\tpitch : ' + viewer.camera.pitch + ',\n\troll : ' + viewer.camera.roll + '\n},');
},  Cesium.ScreenSpaceEventType.LEFT_CLICK);