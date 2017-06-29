# file-upload-png-optimize
An ES6 library to upload files and optimize png using pngquant.


## Features
   - Upload files
   - Otimize png files using Pngquant in the browser

## Documentation
### Instantiate 

` 
let uploadUrl = 'http://localhost/file/upload'
let postData = { foo:'bar' };
let ImageProcessor = new Imageprocess ( uploadUrl, postData ); 
`

returns promise.

### Upload a file
`
let file = new File ( [ "" ], "example" );
ImageProcessor.process ( file )
.then ( ( response ) => {
	console.log ( response );
} );
`


## ECMAScript 6 
Please note this lib uses Javascript functionality only introduced in ECMAScript 6. Hence browsers not supporting the ES6 spec are incopatible with this lib.
Have a look at [ ES6 Compatibility table ](https://kangax.github.io/compat-table/es6/) for more information on ES6 implementation status on your target. 


## License   
MIT   
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


## Get in touch
This package is provided by [eyedouble](https://eyedouble.nl) .Please get in touch with us if you have any questions or remarks.