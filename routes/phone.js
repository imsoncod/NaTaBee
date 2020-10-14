var express = require('express');
var router = express.Router();
const request = require('request');
const cheerio = require("cheerio");
const axios = require("axios");

/**
 * @swagger
 * tags:
 *   name: phone
 *   description: 전화번호 검색 API
 *   
 * definitions:
 *   request_phone_name:
 *     type: object
 *     properties:
 *       intent:
 *         type: object
 *         properties:
 *           id:
 *             type: string
 *           name:
 *             type: string 
 *       userRequest:
 *         type: object
 *         properties:
 *           timezone:
 *             type: string
 *           params:
 *             properties:
 *               ignoreMe:
 *                 type: string
 *           block:
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string  
 *           utterance:
 *             type: string
 *           lang:
 *             type: string
 *           user:      
 *             properties:
 *               id:
 *                 type: string
 *               type:
 *                 type: string
 *               properties:
 *                 type: object  
 *       bot:
 *         type: object
 *         properties:
 *           id:
 *             type: string
 *           name:
 *             type: string
 *       action:
 *         type: object
 *         properties:
 *           name:
 *             type: string
 *           clientExtra:
 *             type: string
 *           params:
 *             type: object
 *             properties:
 *               phone_name:
 *                 type: string
 *                 example: 김기태
 *           id:
 *             type: string
 *           detailParams:
 *             type: object
 *             properties:
 *               phone_name:
 *                 type: object
 *                 properties:
 *                   origin:
 *                     type: string
 *                   value:
 *                     type: string
 *                   groupName:
 *                     type: string                  
 *   
 *   request_phone_dept:
 *     type: object
 *     properties:
 *       intent:
 *         type: object
 *         properties:
 *           id:
 *             type: string
 *           name:
 *             type: string 
 *       userRequest:
 *         type: object
 *         properties:
 *           timezone:
 *             type: string
 *           params:
 *             properties:
 *               ignoreMe:
 *                 type: string
 *           block:
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string  
 *           utterance:
 *             type: string
 *           lang:
 *             type: string
 *           user:      
 *             properties:
 *               id:
 *                 type: string
 *               type:
 *                 type: string
 *               properties:
 *                 type: object  
 *       bot:
 *         type: object
 *         properties:
 *           id:
 *             type: string
 *           name:
 *             type: string
 *       action:
 *         type: object
 *         properties:
 *           name:
 *             type: string
 *           clientExtra:
 *             type: string
 *           params:
 *             type: object
 *             properties:
 *               phone_dept:
 *                 type: string
 *                 example: 컴퓨터
 *           id:
 *             type: string
 *           detailParams:
 *             type: object
 *             properties:
 *               phone_dept:
 *                 type: object
 *                 properties:
 *                   origin:
 *                     type: string
 *                   value:
 *                     type: string
 *                   groupName:
 *                     type: string
 */


/**
 * @swagger
 * /phone/name:
 *   post:
 *     tags: [phone]
 *     summary: 전화번호 검색 - 성명
 *     parameters:
 *       - in: body
 *         name: json_object
 *         description: 성명 전달
 *         schema:
 *           $ref: "#/definitions/request_phone_name"
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
/* 전화번호_성명 */
router.post('/name', function(req, res, next) {
	
	var phone_name = req.body.action.params.phone_name;
	  let url = 'https://cms.itc.ac.kr/site/inhatc/telInfo.do?key=20&searchType=name&searchKeyword='+ encodeURI(phone_name) +'&x=0&y=0';

	  axios.get(url).then(html => {
	    let ulList = [];
	    const $ = cheerio.load(html.data);
	    const $bodyList = $("table.cts_table tbody tr");
	    var td;
	    
	    $bodyList.each(function(i, elem) {
	    	td = $(this);
		      ulList[i] = {
		          title : td.find('td:nth-of-type(3)').text() + " : " + td.find('td:nth-of-type(4)').text(),
		          description : (td.find('td:nth-of-type(1)').text() + " " + td.find('td:nth-of-type(2)').text()).trim()
		      };
		});
	    
	    var data_length = ulList.length;
	    const data = ulList.filter(n => n.title);
	    
	    if(data[0].description == '검색 결과가 없습니다'){
	    	res.status(200).json(
	    			{
	    			    "version": "2.0",
	    			    "template": {
	    			        "outputs": [
	    			            {
	    			                "simpleText": {
	    			                    "text": "검색 결과가 없습니다"
	    			                }
	    			            }
	    			        ],
	    			        "quickReplies": [
			                	{
			                		"action" : "block",
			                		"label" : "이전",
			                		"blockId" : "5f65acaf9d06b973d74f8602"
			                	}
			                ]
	    			    }
	    			}
	    	);
	    }else if(ulList.length<=4){
	    	res.status(200).json(
		    		{
		    			  "version": "2.0",
		    			  "template": {
		    			    "outputs": [
		    			      {
		    			        "listCard": {
		    			          "header": {
		    			            "title": "'" + phone_name + "' 전화번호 검색결과 " + data_length + "건",
		    			          },
		    			          "items": data
		    			        }
		    			      }
		    			    ],
		    			    "quickReplies": [
			                	{
			                		"action" : "block",
			                		"label" : "이전",
			                		"blockId" : "5f65acaf9d06b973d74f8602"
			                	}
			                ]
		    			  }
		    			}
		    );
	    }else{
	    	res.status(200).json(
		    		{
		    			  "version": "2.0",
		    			  "template": {
		    			    "outputs": [
		    			      {
		    			        "listCard": {
		    			          "header": {
		    			            "title": "'" + phone_name + "' 전화번호 검색결과 " + data_length + "건",
		    			          },
		    			          "items": data.slice(0,4),
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
			                		"blockId" : "5f65acaf9d06b973d74f8602"
			                	}
			                ]
		    			  }
		    			}
		    );
	    }
	    
	 
	})
});


/**
 * @swagger
 * /phone/dept:
 *   post:
 *     tags: [phone]
 *     summary: 전화번호 검색 - 소속명
 *     parameters:
 *       - in: body
 *         name: json_object
 *         description: 소속명 전달
 *         schema:
 *           $ref: "#/definitions/request_phone_dept"
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
/* 전화번호_소속명 */
router.post('/dept', function(req, res, next) {
	
	var phone_dept = req.body.action.params.phone_dept;
	  let url = 'https://cms.itc.ac.kr/site/inhatc/telInfo.do?key=20&searchType=dept_fullname&searchKeyword='+ encodeURI(phone_dept) +'&x=0&y=0';

	  axios.get(url).then(html => {
	    let ulList = [];
	    const $ = cheerio.load(html.data);
	    const $bodyList = $("table.cts_table tbody tr");

	    var td;
	    
	    $bodyList.each(function(i, elem) {
	    	td = $(this);
		      ulList[i] = {
		          title : td.find('td:nth-of-type(3)').text() + " : " + td.find('td:nth-of-type(4)').text(),
		          description : (td.find('td:nth-of-type(1)').text() + " " + td.find('td:nth-of-type(2)').text()).trim()
		      };
		});
	    
	    var data_length = ulList.length;
	    const data = ulList.filter(n => n.title);
	    
	    if(data[0].description == '검색 결과가 없습니다'){
	    	res.status(200).json(
	    			{
	    			    "version": "2.0",
	    			    "template": {
	    			        "outputs": [
	    			            {
	    			                "simpleText": {
	    			                    "text": "검색 결과가 없습니다"
	    			                }
	    			            }
	    			        ],
	    			        "quickReplies": [
			                	{
			                		"action" : "block",
			                		"label" : "이전",
			                		"blockId" : "5f65acaf9d06b973d74f8602"
			                	}
			                ]
	    			    }
	    			}
	    	);
	    }else if(ulList.length<=4){
	    	res.status(200).json(
		    		{
		    			  "version": "2.0",
		    			  "template": {
		    			    "outputs": [
		    			      {
		    			        "listCard": {
		    			          "header": {
		    			            "title": "'" + phone_dept + "' 전화번호 검색결과 " + data_length + "건",
		    			          },
		    			          "items": data
		    			        }
		    			      }
		    			    ],
		    			    "quickReplies": [
			                	{
			                		"action" : "block",
			                		"label" : "이전",
			                		"blockId" : "5f65acaf9d06b973d74f8602"
			                	}
			                ]
		    			  }
		    			}
		    );
	    }else{
	    	res.status(200).json(
		    		{
		    			  "version": "2.0",
		    			  "template": {
		    			    "outputs": [
		    			      {
		    			        "listCard": {
		    			          "header": {
		    			            "title": "'" + phone_dept + "' 전화번호 검색결과 " + data_length + "건",
		    			          },
		    			          "items": data.slice(0,4),
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
			                		"blockId" : "5f65acaf9d06b973d74f8602"
			                	}
			                ]
		    			  }
		    			}
		    );
	    }
	    
	 
	})
});

//모듈에 등록해야 app.js에서 app.use함수를 통해서 사용 가능
module.exports = router;