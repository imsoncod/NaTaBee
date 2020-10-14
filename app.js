var express = require('express');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');

//express 서버 포트 설정
app.set('port', process.env.PORT || 8087);

//서버 생성
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

//라우팅 모듈 선언
var notice = require('./routes/notice');
var phone = require('./routes/phone');
var library = require('./routes/library');
var menu = require('./routes/menu');
var info = require('./routes/info');
var etc = require('./routes/etc');
var test = require('./routes/test');

//request body json parser
app.use(bodyParser.json());

//request 요청 URL과 처리 로직을 선언한 라우팅 모듈 매핑
app.use('/natabee/notice', notice);
app.use('/natabee/phone', phone);
app.use('/natabee/library', library);
app.use('/natabee/menu', menu);
app.use('/natabee/info', info);
app.use('/natabee/etc', etc);
app.use('/natabee/test', test);

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerOption = require('./routes/swagger');
const swaggerSpec = swaggerJSDoc(swaggerOption);
const swaggerUi = require('swagger-ui-express');
 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
