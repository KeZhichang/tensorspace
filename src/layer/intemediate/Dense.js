/**
 * @author syt123450 / https://github.com/syt123450
 */

import { Layer1d } from "../abstract/Layer1d";

function Dense( config ) {

	Layer1d.call( this, config );

	this.loadLayerConfig( config );

	this.layerType = "dense";

}

Dense.prototype = Object.assign( Object.create( Layer1d.prototype ), {

	loadLayerConfig: function( layerConfig ) {

		this.loadBasicLayerConfig( layerConfig );
		this.loadLayer1dConfig( layerConfig );

		if ( layerConfig !== undefined ) {

			if ( layerConfig.units !== undefined ) {

				this.units = layerConfig.units;
				this.width = layerConfig.units;
				this.outputShape = [ layerConfig.units ];

				this.totalSegments = Math.ceil( this.units / this.segmentLength );

			} else {

				console.error( "The \"unit\" property is required for dense layer." );

			}

		}

	},

	loadModelConfig: function( modelConfig ) {

		this.loadBasicModelConfig( modelConfig );

		if ( this.color === undefined ) {

			this.color = modelConfig.color.dense;

		}

	},

	assemble: function( layerIndex ) {

		this.layerIndex = layerIndex;

		this.unitLength = this.lastLayer.unitLength;
		this.actualWidth = this.width * this.unitLength;

		if ( this.lastLayer.layerDimension === 1 ) {

			this.lastActualWidth = this.lastLayer.lastActualWidth;
			this.lastActualHeight = this.lastLayer.lastActualHeight;

		} else {

			this.lastActualWidth = this.lastLayer.actualWidth;
			this.lastActualHeight = this.lastLayer.actualHeight;

		}

	},

	getRelativeElements: function( selectedElement ) {

		let relativeElements = [];

		if ( selectedElement.elementType === "aggregationElement" || selectedElement.elementType === "featureLine" ) {

			let request = {

				all: true

			};

			relativeElements = this.lastLayer.provideRelativeElements( request ).elementList;

		}

		return relativeElements;

	}

} );

export { Dense };