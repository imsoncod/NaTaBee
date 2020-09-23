var express = require('express');
var router = express.Router();
const request = require('request');
const cheerio = require("cheerio");
const axios = require("axios");

/* RestAPI Code Style

router.{Method}('{String}', function(req, res)){

	res.send() : 문자열로 응답
	res.json() : Json으로 응답
	res.render() : html변환 템플릿을 렌더링(ejs)
	res.sendfile() : 파일 다운로드

}

*/

/* Server Testing */
router.get('/', function(req, res){	
	res.status(200).json(		
		{
			"Server Status" : "ON"
		}
	);	
});

/* Crawling Testing */

var url;
var notice;

router.post('/test', function(req, res, next) {
	  let url = 'https://cms.itc.ac.kr/site/ipsi/boardList.do?boardSeq=44&key=133';
	  
	  axios.get(url).then(html => {
	    let ulList = [];
	    const $ = cheerio.load(html.data);
	    const $bodyList = $("table.bbs_default_list tr");
			//each : list 마다 함수 실행, forEach와 동일
	    

	    $bodyList.each(function(i, elem) {
	      ulList[i] = {
	        //find : 해당 태그가 있으면 그 요소 반환
	          title: $(this).children(".subject").find('a').text(),
	          url: $(this).children(".subject").find('a').attr('href'),
	          date : $(this).children(".gray").text().trim()
	      };
	    });
	    
	    const data = ulList.filter(n => n.title);
	    //json으로 변환하여 app으로 전송
	    return res.json(data.slice(0, 4));
	})
});


//모듈에 등록해야 app.js에서 app.use함수를 통해서 사용 가능
module.exports = router;