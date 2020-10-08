var express = require('express');
var router = express.Router();
const request = require('request');
const cheerio = require("cheerio");
const axios = require("axios");


/* 정보광장 - 삽니다 & 팝니다 */

router.post('/market', function(req, res, next) {
	  let url = 'https://cms.itc.ac.kr/site/inhatc/boardList.do?boardSeq=70&key=114&part=000';
	  
	  axios.get(url).then(html => {
	    let ulList = [];
	    const $ = cheerio.load(html.data);
	    const $bodyList = $("table.bbs_default_list tr");	    

	    $bodyList.each(function(i, elem) {
	      ulList[i] = {
	          title: $(this).children(".subject").find('a').text(),
	          url: "https://cms.itc.ac.kr/site/ipsi" + String($(this).children(".subject").find('a').attr('href')).slice(1),
	          date : $(this).children(".gray").text().trim() + " / " + $(this).find('td:nth-of-type(2)').text()
	      };
	    });
	    
	    const data = ulList.filter(n => n.title);
	    
	    res.status(200).json(
	    		{
	    			  "version": "2.0",
	    			  "template": {
	    			    "outputs": [
	    			      {
	    			        "listCard": {
	    			          "header": {
	    			            "title": "삽니다 & 팝니다",
	    			          },
	    			          "items": [
	    			            {
	    			              "title": data[0].title,
	    			              "description": data[0].date,
	    			              "link": {
	    			                "web": data[0].url
	    			              }
	    			            },
	    			            {
	    			            	"title": data[1].title,
		    			              "description": data[1].date,
		    			              "link": {
		    			                "web": data[1].url
		    			              }
	    			            },
	    			            {
	    			            	"title": data[2].title,
		    			              "description": data[2].date,
		    			              "link": {
		    			                "web": data[2].url
		    			              }
	    			            },
	    			            {
	    			            	"title": data[3].title,
		    			              "description": data[3].date,
		    			              "link": {
		    			                "web": data[3].url
		    			              }
	    			            }
	    			          ],
	    			          "buttons": [
	    			            {
	    			              "label": "더 보기",
	    			              "action": "webLink",
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
		                		"blockId" : "5f65ae6d04c92653cf64980a"
		                	}
		                ]
	    			  }
	    			}
	    );
	})
});

/* 정보광장 - 분실물 & 습득물 */

router.post('/lost', function(req, res, next) {
	  let url = 'https://cms.itc.ac.kr/site/inhatc/boardList.do?boardSeq=105&key=116&part=000';
	  
	  axios.get(url).then(html => {
	    let ulList = [];
	    const $ = cheerio.load(html.data);
	    const $bodyList = $("table.bbs_default_list tr");	    

	    $bodyList.each(function(i, elem) {
	      ulList[i] = {
	          title: $(this).children(".subject").find('a').text(),
	          url: "https://cms.itc.ac.kr/site/ipsi" + String($(this).children(".subject").find('a').attr('href')).slice(1),
	          date : $(this).children(".gray").text().trim() + " / " + $(this).find('td:nth-of-type(2)').text()
	      };
	    });
	    
	    const data = ulList.filter(n => n.title);
	    
	    res.status(200).json(
	    		{
	    			  "version": "2.0",
	    			  "template": {
	    			    "outputs": [
	    			      {
	    			        "listCard": {
	    			          "header": {
	    			            "title": "분실물 & 습득물",
	    			          },
	    			          "items": [
	    			            {
	    			              "title": data[0].title,
	    			              "description": data[0].date,
	    			              "link": {
	    			                "web": url
	    			              }
	    			            },
	    			            {
	    			            	"title": data[1].title,
		    			              "description": data[1].date,
		    			              "link": {
		    			                "web": url
		    			              }
	    			            },
	    			            {
	    			            	"title": data[2].title,
		    			              "description": data[2].date,
		    			              "link": {
		    			                "web": url
		    			              }
	    			            },
	    			            {
	    			            	"title": data[3].title,
		    			              "description": data[3].date,
		    			              "link": {
		    			                "web": url
		    			              }
	    			            }
	    			          ],
	    			          "buttons": [
	    			            {
	    			              "label": "더 보기",
	    			              "action": "webLink",
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
		                		"blockId" : "5f65ae6d04c92653cf64980a"
		                	}
		                ]
	    			  }
	    			}
	    );
	})
});

//모듈에 등록해야 app.js에서 app.use함수를 통해서 사용 가능
module.exports = router;