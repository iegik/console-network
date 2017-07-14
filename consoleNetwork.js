import {map} from 'lodash';

const NETWORK_PREFIX = 'Network ';
const parseProp = prop => map(prop, (v,k) => {
    console.group && console.group(k);
    map(v, (v,k) => console.log(k, v));
    console.groupEnd && console.groupEnd(k)
});

/**
 *
 *   Prints in console debugging information about network requests
 *
 *   import debug from 'console-network';
 *   debug.network('http://example.com')
 *   debug.networkEnd('http://example.com', {
 *       'General': {
 *           url: '',
 *           method: 'GET',
 *           status: 100,
 *           query: null,
 *       },
 *       'Response Headers': this._headers,
 *       'Response': error ? {
 *           Error: error
 *       } : {
 *           Raw: data
 *       }
 *   });
 */
export default {
    network: (id, ...props) => {
        if (process.env.NODE_ENV === 'production') {
            return;
        }
        console.groupCollapsed && console.groupCollapsed(NETWORK_PREFIX + id);
        console.time && console.time('Response time');
        props.map(parseProp);
    },
    networkEnd: (id, ...props) => {
        if (process.env.NODE_ENV === 'production') {
            return;
        }
        props.map(parseProp);
        console.timeEnd && console.timeEnd('Response time');
        console.groupEnd && console.groupEnd(NETWORK_PREFIX + id);
    }
}