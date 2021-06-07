const { request } = require("http");
const Profile = require("./profile.js");
const renderer = require("./renderer.js")
const commonHeader = {'Content-Type': 'text/html'}
const querystring = require('querystring')

// Handle HTTP route Get / and POST / i.e. Home
function home(req, res) {
    //if url == "/" && GET
    if(req.url === '/') {
        if(req.method === "GET") {
        //show search
        res.writeHead(200, commonHeader);
        renderer.view('header', {}, res)
        renderer.view('search',{}, res)
        renderer.view('footer',{}, res)
        res.end();
    } else {
        //if url == "/" && POST
        //get the post data from body
        req.on('data', postBody => {
            const query = querystring.parse(postBody.toString());
            res.writeHead(303,{'Location': `/${query.username}`});
            res.end();
        })
        //extract the username
        
        //redirect to /:username
    }
}

}
// Handle HTTP route Get /:username i.e. /marcrivas
function user(req, res) {
    //if url == "/..."
    const username = req.url.replace('/', '');
    if(username.length > 0) {
        res.writeHead(200, commonHeader);
        renderer.view('header', {}, res);

        //get json from treehouse
        const studentProfile = new Profile(username);

        //on "end"
        studentProfile.on("end", (profileJSON) => {
            //show profile

            //store the values we need
            const values = {
                avatarUrl: profileJSON.gravatar_url,
                username: profileJSON.profile_name,
                badges: profileJSON.badges.length,
                jsPoints: profileJSON.points.JavaScript
            }
            //Simple response
            renderer.view('profile', values, res)
            renderer.view('footer', {}, res);
            res.end();
        });


        
        //on "error"
        studentProfile.on("error", (error) => {
            //show error
            renderer.view('error',{errorMessage: error.message}, res);
            renderer.view('search', {}, res)
            renderer.view('footer', {}, res)
            res.end();
        });
    }  
}

// Export as module
module.exports.home = home;
module.exports.user = user;
