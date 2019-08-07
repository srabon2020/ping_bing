"use strict";

const request = require( "request" ),
    url = require( "url" );

function isURL( src ) {

    try {

        let result = url.parse( src );

        return !!result;

    } catch ( error ) {

        return false;

    }

}

function isValidUrlList( urlList ) {

    if ( !urlList || !urlList.length || urlList.length < 1 ) {
        return false;
    }

    let isValid = true;

    for ( let index = 0; index < urlList.length; index++ ) {

        if ( !isURL( urlList[ index ] ) ) {

            isValid = false;
            index = urlList.length;

        }

    }

    return isValid;

}

function cleanURL( src ) {

    return src.replace( /\//g, "\/" );
}

function cleanUrlList( urlList ) {

    for ( let index = 0; index < urlList.length; index++ ) {

        urlList[ index ] = cleanURL( urlList[ index ] );

    }

    return urlList;
}


exports.pingBing = function ( options ) {

    return new Promise( ( resolve, reject ) => {

        if ( !options.apiKey ) {

            reject( "missing Bing API Key - https://docs.microsoft.com/en-us/bingwebmaster/getting-access" );

            return;

        }

        if ( !options.siteUrl || !isURL( options.siteUrl ) ) {

            reject( "missing site URL that is verified in the Bing Webmaster Tools" );

            return;
        }

        if ( ( !options.url || !isURL( options.url ) ) &&
            ( !isValidUrlList( options.urlList ) ) ) {

            reject( "missing URL(s) to submit to Bing for Indexing" );

            return;
        }

        let payload = {},
            bingURL;

        if ( options.url ) {

            bingURL = "https://ssl.bing.com/webmaster/api.svc/json/SubmitUrl?apikey=" + options.apiKey;

            payload = {
                "siteUrl": cleanURL( options.siteUrl ),
                "url": cleanURL( options.url )
            };

        } else {

            bingURL = "https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch?apikey=" + options.apiKey;

            payload = {
                "siteUrl": cleanURL( options.siteUrl ),
                "urlList": cleanUrlList( options.urlList )
            };

        }

        request.post(
            bingURL, {
                json: payload
            },
            function ( error, response, body ) {

                if ( !error && response.statusCode === 200 ) {

                    //right now should just be a simple JSON object with a d property === null

                    resolve( body );

                } else {

                    if ( response ) {

                        reject( response.body );

                    } else {

                        reject( error );

                    }

                }
            }
        );

    } );

};