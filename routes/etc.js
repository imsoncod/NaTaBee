var express = require('express');
var router = express.Router();
const request = require('request');
const cheerio = require("cheerio");
const axios = require("axios");

/* 학과명 입력 */
router.post('/dept', function(req, res){
	var dept = req.body.action.params.dept;
	var dept_array = {
			"기계과" : "777",
			"기계설계과" : "778",
			"메카트로닉스과" : "779",
			"조선해양과" : "780",
			"항공기계과" : "782",
			"자동차과" : "781",
			"전기정보과" : "783",
			"디지털전자과" : "785",
			"정보통신과" : "786",
			"컴퓨터정보과" : "787",
			"컴퓨터시스템과" : "788",
			"토목환경과" : "789",
			"항공지리정보과" : "790",
			"건축과" : "791",
			"실내건축과" : "792",
			"화공환경과" : "793",
			"금속재료과" : "794",
			"항공운항과" : "795",
			"항공경영과" : "796",
			"관광경영과" : "797",
			"비서과" : "799",
			"호텔경영과" : "798",
			"산업디자인과" : "800",
			"패션디자인과" : "801"
	};
	
	var dept_code = dept_array[dept];
	if(dept_code == undefined){
		res.status(200).json(
				{
    			    "version": "2.0",
    			    "template": {
    			        "outputs": [
    			            {
    			                "simpleText": {
    			                    "text": "존재하지 않는 학과입니다."
    			                }
    			            }
    			        ],
    			        "quickReplies": [
		                	{
		                		"action" : "block",
		                		"label" : "이전",
		                		"blockId" : "5f65a07c011936335d332e63"
		                	}
		                ]
    			    }
    			}
		);
	}
	var url = "https://cms.itc.ac.kr/site/ipsi/sub.do?key=" + dept_code;
	
	res.status(200).json(		
			{
			    "version": "2.0",
			    "template": {
			        "outputs": [
			            {
			                "basicCard": {
			                    "description": "입력 학과명 : " + dept,
			                    "buttons": [
			                        {
			                            "action": "webLink",
			                            "label": '소개 사이트 이동',
			                            "webLinkUrl": url
			                        }
			                    ]
			                }
			            }
			        ],
			        "quickReplies": [
	                	{
	                		"action" : "block",
	                		"label" : "이전",
	                		"blockId" : "5f65a07c011936335d332e63"
	                	}
	                ]
			    }
			}
	);	
});

/* 원점메아리 */

router.post('/news', function(req, res, next) {
	  let url = 'https://cms.itc.ac.kr/site/inhatc/boardList.do?boardSeq=68&key=99&part=000';
	  
	  axios.get(url).then(html => {
	    let ulList = [];
	    const $ = cheerio.load(html.data);
	    const $bodyList = $("div.webzine ul.clearfix li");
	    
	    var ho;
	    var imgUrl;
	    var temp;

	    $bodyList.each(function(i, elem) {
	    	if(i>0){
	    		return false;
	    	}
	    	imgUrl = "https://cms.itc.ac.kr" + String($(this).find('a').children(".photo").find('img').attr('src')).replace('thumb/','');
	    	temp = $(this).children(".title").text().trim().split('제')[1];
	    	ho = temp.split('호')[0];
	    });
	    
	    res.status(200).json(
	    		{
	    			  "version": "2.0",
	    			  "template": {
	    			    "outputs": [
	    			      {
	    			        "basicCard": {
	    			          "title": "원점메아리 " + ho + "호",
	    			          "thumbnail": {
	    			            "imageUrl": imgUrl,
	    			            "fixedRatio" : true,
	    			            "width" : 730,
	    			            "height" : 999
	    			          },
	    			          "buttons": [
	    			            {
	    			              "action":  "webLink",
	    			              "label": "보러가기",
	    			              "webLinkUrl": "http://asp2.ezebn.com/Viewer/inha" + ho
	    			            }
	    			          ]
	    			        }
	    			      }
	    			    ]
	    			  }
	    			}
	    );
	})
});

//모듈에 등록해야 app.js에서 app.use함수를 통해서 사용 가능
module.exports = router;