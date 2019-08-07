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


exports.pingBing = function ( options ) {

    return new Promise( ( resolve, reject ) => {

        if ( !options.siteUrl || !isURL( options.siteUrl ) ) {

            reject( "missing site URL that is verified in the Bing Webmaster Tools" );

            return;
        }

        if ( ( !options.url || !isURL( options.url ) ) ||
            ( !options.urlList || !options.urlList.length || options.urlList.length < 1 ) ) {

            reject( "missing URL(s) to submit to Bing for Indexing" );

            return;
        }

        let payload = {
            "siteUrl": options.siteUrl.replace( /\//g, "\/" )
        };

        if ( options.url ) {
            payload.url = options.url.replace( /\//g, "\/" );
        } else {
            payload.urlList = options.urlList;
        }

        request.post(
            "https://ssl.bing.com/webmaster/api.svc/json/SubmitUrl?apikey=" + options.apiKey, {
                json: payload
            },
            function ( error, response, body ) {

                if ( !error && response.statusCode === 200 ) {

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