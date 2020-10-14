var express = require('express');
var router = express.Router();
const request = require('request');

/*
 * RestAPI Code Style
 * 
 * router.{Method}('{String}', function(req, res)){
 * 
 * res.send() : 문자열로 응답 res.json() : Json으로 응답 res.render() : html변환 템플릿을
 * 렌더링(ejs) res.sendfile() : 파일 다운로드 }
 * 
 */

/**
 * @swagger
 * tags:
 *   name: test
 *   description: 서버 테스트 API
*/

/**
 * @swagger
 * /test:
 *   get:
 *     tags: [test]
 *     summary: 서버 테스트
 *     responses:
 *       200:
 *         description: 성공
 *       403:
 *         description: Forbidden
 *       404:
 *         description: NotFound
 *       500:
 *         description: BadRequest
 */
/* Server Testing */
router.get('/', function(req, res){	
	res.status(200).json(		
		{
			"Server Status" : "ON"
		}
	);	
});

//모듈에 등록해야 app.js에서 app.use함수를 통해서 사용 가능
module.exports = router;