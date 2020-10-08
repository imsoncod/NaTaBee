var express = require('express');
var router = express.Router();
const request = require('request');
const cheerio = require("cheerio");
const axios = require("axios");

/* 공지사항_입학 */

router.post('/admission', function(req, res, next) {
	  let url = 'https://cms.itc.ac.kr/site/ipsi/boardList.do?boardSeq=44&key=133';
	  
	  axios.get(url).then(html => {
	    let ulList = [];
	    const $ = cheerio.load(html.data);
	    const $bodyList = $("table.bbs_default_list tr");	    

	    $bodyList.each(function(i, elem) {
	      ulList[i] = {
	          title: $(this).children(".subject").find('a').text(),
	          url: "https://cms.itc.ac.kr/site/ipsi" + String($(this).children(".subject").find('a').attr('href')).slice(1),
	          date : $(this).children(".gray").text().trim()
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
	    			            "title": "공지사항",
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
		                		"blockId" : "5f6465441f96670bd416201c"
		                	}
		                ]
	    			  }
	    			}
	    );
	})
});

/* 공지사항_캠퍼스라이프 */

router.post('/campuslife', function(req, res, next) {
	  let url = 'https://cms.itc.ac.kr/site/inhatc/boardList.do?boardSeq=44&key=111&part=000';
	  
	  axios.get(url).then(html => {
	    let ulList = [];
	    const $ = cheerio.load(html.data);
	    const $bodyList = $("table.bbs_default_list tr");	    

	    $bodyList.each(function(i, elem) {
	      ulList[i] = {
	          title: $(this).children(".subject").find('a').text(),
	          url: "https://cms.itc.ac.kr/site/ipsi" + String($(this).children(".subject").find('a').attr('href')).slice(1),
	          date : $(this).children(".gray").text().trim()
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
	    			            "title": "공지사항",
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
		                		"blockId" : "5f6465aa6c2427307fbe0872"
		                	}
		                ]
	    			  }
	    			}
	    );
	})
});

//모듈에 등록해야 app.js에서 app.use함수를 통해서 사용 가능
module.exports = router;