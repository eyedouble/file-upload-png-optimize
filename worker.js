(function() { 

    postMessage({ init: null });    

    /* Event router */
    self.addEventListener('message', ( message ) => {        
        let event = Object.keys( message.data )[0];        
        let data = message.data[event];
        return self[event]( data );     
    }, false); 

    postMessage({ ready: null });   

    self.compress = ( data ) => {
        importScripts('https://cdn.jsdelivr.net/gh/eyedouble/pngquantjs@v2.8.0/pngquant.min.js');    
        let result = pngquant(
            data.imageData, 
            { 
                quality: data.qualityMin + '-' + data.qualityMax, 
                speed: ''+data.speed
            },
            function ( text ) {
                postMessage({ update: text });
            }
        );
        postMessage({ compressionDone: result });        
    }

})();