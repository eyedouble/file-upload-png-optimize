class Imageprocess{

	constructor( target, parameters ){	
		this.target = target;
		this.parameters = parameters;
		this.png = new Png ( );
		this.data = new Data ( );
	}

	process ( file ){

		let defer = new Deferred ( );


		let fileUpload = new FileUpload ( file.name, file.type, file.lastModified );
		console.log( file );

		this.data.readUrl( file )
		.then( ( blob ) => {

			if ( file.name.match(/\.png/) ){
				this.compressPng ( blob )
				.then( ( result ) => {
					console.log( 'res', result );
					fileUpload.sent ( this.data.blobToFile ( result, file.name ), this.target, this.parameters )
					.then( ( e ) => { 
						defer.resolve( 'png compressed and uploaded' );
					});						
				})
			}else{
				fileUpload.sent ( this.data.blobToFile ( blob, file.name ), this.target, this.parameters )
				.then( ( e ) => { 
					defer.resolve( 'image uploaded' );
				});				
			};		

		});

		return defer.promise;
	}

	compressPng ( imageData ){
		return this.png.compress( imageData );
	}

}

class FileUpload {

	constructor ( fileName, fileType, fileSize, fileLastModified ) {
		this.fileName = fileName;
		this.fileType = fileType;
		this.fileLastModified = fileLastModified;
	}

	sent ( file, target, parameters ) {
		let defer = new Deferred ( );

		let formData = new FormData ( );
		formData.append ( 'file', file );	
		console.log( parameters )
		for( let key in parameters ){
		    formData.append ( key, parameters[key] );
		};			
		let xhr = new XMLHttpRequest ( );		
		xhr.open ( 'POST', target );
		xhr.onload = ( e ) => {			
			console.log( this , e );
			defer.resolve( e );
		};
		xhr.onerror = ( e ) => {
			console.log( 'err', this , e );
			defer.reject( e );
		};
		xhr.send ( formData );	

		return defer.promise;
	}
}

class Png {

	constructor ( ) {
		this.data = new Data ( );
		this.worker = new Worker("worker.js");

		this.worker.addEventListener('message', ( message ) => {
			let event = Object.keys( message.data )[0];
			let data = message.data[event];	
			return this['_'+event]( data );		 
		}, false);

		this.worker.addEventListener('error', ( event ) => {
			dd( event );  
		}, false);		
	}

	compress ( imageData ) {
		let data = {
			imageData:imageData,
			qualityMin: 60,
			qualityMax: 70,
			speed: 2
		};	
		this.worker.postMessage ( { 'compress' : data } );
		this.compressing = new Deferred ( );
		return this.compressing.promise;		
	}

	_init ( data ) {
		console.log( 'init', data );	
	}

	_ready ( data ) {
		console.log( 'ready', data );	
	}

	_compressionDone ( newImageData ) {
		console.log( 'compressionDone', newImageData.data );
		let fileNew = this.data.uint8ToBlob ( newImageData.data, 'image/png' );
		this.compressing.resolve ( fileNew );
	}

	_update ( data ) {
		console.log( 'update', data );
	}	

}

class Data{

	constructor(){
		
	}

	makeBlob ( raw ) { 
		return blob = new Blob([fileData]);
	}

	urlToUint8 ( dataUrl ) {
		let arr = dataUrl.split(','),
	        mime = arr[0].match(/:(.*?);/)[1],
	        bstr = atob(arr[1]),
	        n = bstr.length,
	        u8arr = new Uint8Array(n);
	    while (n--) {
	        u8arr[n] = bstr.charCodeAt(n);
	    }
	    return u8arr;
	}

	uint8ToBlob ( Uint8, mimeType ) {
		return new Blob([new Uint8Array( Uint8 )], {
	        type: mimeType
	    });
	}

	blobToFile ( blob, fileName ) {
		return new File([blob], ''+fileName );
	}

	readUrl ( file ) {
		let defer = new Deferred ( );
	
		let dataUrlReader = new FileReader();
	  	dataUrlReader.onload = ( e ) => {  
	  		defer.resolve( this.urlToUint8( e.target.result ) );        
    	}
    	dataUrlReader.readAsDataURL(file);	
		return defer.promise;      
	}
	
}

class Deferred {

  	constructor() {

	    this.promise = new Promise( ( resolve, reject ) => {
		      this.reject = reject;
		      this.resolve = resolve;
	    } );

  	}

}