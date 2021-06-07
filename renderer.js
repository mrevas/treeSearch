const fs = require('fs')

function mergeValues(values, content) {
    //Cycle over the keys
    for(let key in values) {
        //Replace all {{key}} with the value from the values object
        content = content.replace(`{{${key}}}`, values[key])
    }
    // return merged content
    return content
}

function view(templateName, values, response) {
    // Read from the templat files
    let fileContents = fs.readFileSync(`./views/${templateName}.html`, {encoding: 'utf-8'});
    //Insert values into the content
    fileContents = mergeValues(values, fileContents)
    //Write content to the response
    response.write(fileContents)
}

//Export
module.exports.view = view;