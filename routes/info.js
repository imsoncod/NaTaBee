var express = require('express');
var router = express.Router();
const request = require('request');
const cheerio = require("cheerio");
const axios = require("axios");

/**
 * @swagger
 * tags:
 *   name: info
 *   description: 정보광장 API
*/

/**
 * @swagger
 * /info/market:
 *   post:
 *     tags: [info]
 *     summary: 삽니다 & 팝니다
 *     parameters:
 *       - in: body
 *         name: json_object
 *         description: Kakao 기본 Request Object
 *         schema:
 *           $ref: "#/definitions/request_basic"
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
/* 정보광장 - 삽니다 & 팝니다 */
router.post('/market', function(req, res, next) {
	  let url = 'https://cms.itc.ac.kr/site/mobile/boardList.do?boardSeq=70&key=1003&part=000';
	  
	  axios.get(url).then(html => {
	    let ulList = [];
	    const $ = cheerio.load(html.data);
	    const $bodyList = $("#news_list_new li");	    

	    $bodyList.each(function(i, elem) {
	      if(i > 3){
	    	  return false;
	      }
	      ulList[i] = {
		         title: $(this).find('a').text().trim(),
		         url: "https://cms.itc.ac.kr/site/mobile/" + String($(this).find('a').attr('href')),
		         date : $(this).find('p').find('span:nth-of-type(2)').text() + ' / ' + $(this).find('p').find('span:nth-of-type(4)').text().split('분류:')[1]
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
	    			            "imageUrl": "https://user-images.githubusercontent.com/48934537/96865227-a461d880-14a4-11eb-816c-5022510185b2.png"
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


/**
 * @swagger
 * /info/lost:
 *   post:
 *     tags: [info]
 *     summary: 분실물 & 습득물
 *     parameters:
 *       - in: body
 *         name: json_object
 *         description: Kakao 기본 Request Object
 *         schema:
 *           $ref: "#/definitions/request_basic"
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
/* 정보광장 - 분실물 & 습득물 */
router.post('/lost', function(req, res, next) {
	  let url = 'https://cms.itc.ac.kr/site/mobile/boardList.do?boardSeq=105&key=1005&part=000';
	  
	  axios.get(url).then(html => {
		    let ulList = [];
		    const $ = cheerio.load(html.data);
		    const $bodyList = $("#news_list_new li");	    

		    $bodyList.each(function(i, elem) {
		    	if(i > 3){
		    		return false;
		    	}
		      ulList[i] = {
			         title: $(this).find('a').text().trim(),
			         url: "https://cms.itc.ac.kr/site/mobile/" + String($(this).find('a').attr('href')),
			         date : $(this).find('p').find('span:nth-of-type(2)').text() + ' / ' + $(this).find('p').find('span:nth-of-type(4)').text().split('분류:')[1]
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
	    			            "imageUrl": "https://user-images.githubusercontent.com/48934537/96865227-a461d880-14a4-11eb-816c-5022510185b2.png"
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