var http= require('http');
var url= require('url');
var fs= require('fs');
var nodemailer = require('nodemailer');
const { parse } = require('querystring');
http.createServer(function(req,res){
  var q=req.url;
  console.log(q);
  if(q==='/')
    {
      fs.readFile('index.html', function(err,data){
        res.writeHead(200,{'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
      });
    }
    else if(q==='/index.html')
       {
         fs.readFile('index.html', function(err,data){
           res.writeHead(200,{'Content-Type': 'text/html'});
           res.write(data);
           return res.end();
         });
       }
   else if(q==='/about.html')
      {
        fs.readFile('about.html', function(err,data){
          res.writeHead(200,{'Content-Type': 'text/html'});
          res.write(data);
          return res.end();
        });
      }
      else if(q==='/sendMail'){

        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'harshit.yaduka@gmail.com',
            pass: 'password'
          }
        });

        var mailOptions = {
          from: 'harshit.yaduka@gmail.com',
          to: 'req.body.email',
          subject: 'Sending Email using Node.js',
          envelope:{
            from: 'harshit.yaduka@gmail.com',
            to: 'req.body.email',
            subject: 'Sending Email using Node.js',
          }
        };

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        res.end();

      }
      else if(q==='/contact.html')
        {
          fs.readFile('contact.html', function(err,data){
            res.writeHead(200,{'Content-Type': 'text/html'});
            res.write(data);
            console.log(data);
            console.log("this is working");
            if(res.method==='post'){
            let body='';
              console.log(data);
             req.on('data', chunk=>{
               body+= chunk.toString();
               console.log(parse(body));
             });
             req.on('end',(body)=>{
               console.log(parse(body));
               res.end('Ok');
             });
           }
           else{
             console.log(null);

           }
                return res.end();
          });
          }
        else {
            fs.readFile('404.html', function(err,data){
              res.writeHead(404,{'Content-Type': 'text/html'});
              res.write(data);
              return res.end();
            });
          }
}).listen(8080);
