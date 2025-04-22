const LZW = {
//     compress: function (uncompressed) {
//         "use strict";
//         // Build the dictionary.
//         var i,
//             dictionary = {},
//             c,
//             wc,
//             w = "",
//             result = [],
//             dictSize = 256;
//         for (i = 0; i < 256; i += 1) {
//             dictionary[String.fromCharCode(i)] = i;
//         }
 
//         for (i = 0; i < uncompressed.length; i += 1) {
//             c = uncompressed.charAt(i);
//             wc = w + c;
//             //Do not use dictionary[wc] because javascript arrays 
//             //will return values for array['pop'], array['push'] etc
//            // if (dictionary[wc]) {
//             if (dictionary.hasOwnProperty(wc)) {
//                 w = wc;
//             } else {
//                 result.push(dictionary[w]);
//                 // Add wc to the dictionary.
//                 dictionary[wc] = dictSize++;
//                 w = String(c);
//             }
//         }
 
//         // Output the code for w.
//         if (w !== "") {
//             result.push(dictionary[w]);
//         }
//         return result;
//     },
 
 
//     decompress: function (compressed) {
//         "use strict";
//         // Build the dictionary.
//         var i,
//             dictionary = [],
//             w,
//             result,
//             k,
//             entry = "",
//             dictSize = 256;
//         for (i = 0; i < 256; i += 1) {
//             dictionary[i] = String.fromCharCode(i);
//         }
 
//         w = String.fromCharCode(compressed[0]);
//         result = w;
//         for (i = 1; i < compressed.length; i += 1) {
//             k = compressed[i];
//             if (dictionary[k]) {
//                 entry = dictionary[k];
//             } else {
//                 if (k === dictSize) {
//                     entry = w + w.charAt(0);
//                 } else {
//                     return null;
//                 }
//             }
 
//             result += entry;
 
//             // Add w+entry[0] to the dictionary.
//             dictionary[dictSize++] = w + entry.charAt(0);
 
//             w = entry;
//         }
//         return result;
//     }
// }
// https://gist.github.com/revolunet/843889
 compress: function (s){
    var dict = {};
    var data = (s + "").split("");
    var out = [];
    var currChar;
    var phrase = data[0];
    var code = 256;
    for (var i=1; i<data.length; i++) {
        currChar=data[i];
        if (dict[phrase + currChar] != null) {
            phrase += currChar;
        }
        else {
            out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
            dict[phrase + currChar] = code;
            code++;
            phrase=currChar;
        }
    }
    out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
    for (var i=0; i<out.length; i++) {
        out[i] = String.fromCharCode(out[i]);
    }
    return out.join("");
 }
 ,
 decompress: function (s) {
    var dict = {};
    var data = (s + "").split("");
    var currChar = data[0];
    var oldPhrase = currChar;
    var out = [currChar];
    var code = 256;
    var phrase;
    for (var i=1; i<data.length; i++) {
        var currCode = data[i].charCodeAt(0);
        if (currCode < 256) {
            phrase = data[i];
        }
        else {
           phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
        }
        out.push(phrase);
        currChar = phrase.charAt(0);
        dict[code] = oldPhrase + currChar;
        code++;
        oldPhrase = phrase;
    }
    return out.join("");
 }
}
export default LZW;
