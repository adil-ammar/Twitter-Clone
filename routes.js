const displayContent = (req, res) => {
    const url = req.url;
    const method = req.method;

    if(url == "/profile"){
        res.setHeader('Content-Type', 'text/html');
        res.write('This is profile page');
        return res.end();
    }

    else if(url == "/"){
        res.setHeader('Content-Type', 'text/html');
        res.write('Biryani');
        return res.end();
    }

    else if(url == "/settings" && method == "POST"){
        res.setHeader('Content-Type', 'text/html');
        res.write('<h1>Form was submitted</h1>');
        return res.end();
    }

    else if(url == "/settings"){
        res.setHeader('Content-Type', 'text/html');
        res.write('<h1>Settings</h1><form action="/settings" method="POST"><input type="text"><button type="submit">Press Me</button></form>');
        return res.end();
    }
    
    res.setHeader('Content-Type', 'text/html');
    res.write('Page Not Found');
    res.end();
}

module.exports = displayContent;