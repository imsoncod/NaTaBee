var express = require('express');
var router = express.Router();
const request = require('request');
const cheerio = require("cheerio");
const axios = require("axios");


/* 도서관 - 도서검색 */

router.post('/search', function(req, res, next) {
	
	var book_name = req.body.action.params.book_name;
	
	  var book_url = 'https://library.inhatc.ac.kr/Cheetah/Search/AdvenceSearch#/basic?otwa1=IDX&otbool1=A&otod1=' + encodeURI(book_name)
	  + '&otopt=all&stype=B&sp=1';

	  let url = 'https://library.inhatc.ac.kr/cheetah/api/search?otwa1=T&otod1='+ encodeURI(book_name)
	  +'&otbool1=A&otpn1=K&otwa2=A&otod2=&otbool2=A&otpn2=K&otwa3=P&otod3=&otbool3=A&otpn3=K&otopt=&lang=&stype=B&sp=1&otyear1=&otyear2=&tab=basic';

	  axios.get(url).then(html => {
	    let ulList = [];
	    var book_list = html.data.ListItem.BasicItem;
	    
	    for(var i = 0; i < book_list.length; i++){
	    	var mTitle = book_list[i].Title;
	    	var mAuthor = book_list[i].Author;
	    	var mPublisher = book_list[i].Publisher;
	    	var mImageUrl = 'https://library.inhatc.ac.kr/cheetah/Shared/CoverImage?Cno=' + book_list[i].Cno;
	    	var mUrl = 'https://library.inhatc.ac.kr/Cheetah/Search/AdvenceSearch#/basic/detail/' + book_list[i].Cno;
	    	
	    	ulList[i] = {
	    		title : mTitle,
	    		description : mAuthor + ' / ' + mPublisher,
	    		imageUrl : mImageUrl,
	    		link : {
	    			web : mUrl
	    		}
	    	}
	    };
	    
	    var data_length = ulList.length;
	    const data = ulList.filter(n => n.title);
	    
	    if(data_length == 0){
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
			                		"blockId" : "5f65ad656b1a753222a0be7b"
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
		    			            "title": "'" + book_name + "' 도서 검색결과 " + data_length + "건",
		    			          },
		    			          "items": data
		    			        }
		    			      }
		    			    ],
		    			    "quickReplies": [
			                	{
			                		"action" : "block",
			                		"label" : "이전",
			                		"blockId" : "5f65ad656b1a753222a0be7b"
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
		    			            "title": "'" + book_name + "' 도서 검색결과 " + data_length + "건",
		    			          },
		    			          "items": data.slice(0,4),
		    			          "buttons": [
		    			            {
		    			              "label": "더 보기",
		    			              "action": "webLink",
		    			              "webLinkUrl": book_url
		    			            }
		    			          ]
		    			        }
		    			      }
		    			    ],
		    			    "quickReplies": [
			                	{
			                		"action" : "block",
			                		"label" : "이전",
			                		"blockId" : "5f65ad656b1a753222a0be7b"
			                	}
			                ]
		    			  }
		    			}
		    );
	    }
	})
});


/* 도서관 - 좌석 예약 및 사용 현황 */
router.post('/seat', function(req, res){
	var user_id = req.body.action.params.user_id;
	
	if(user_id.length != 9 || user_id.slice(0,2) != '20' || isNaN(user_id)){
		res.status(200).json(
				{
	    			"version": "2.0",
	    			"template": {
	    				"outputs": [
	    					{
	    						"simpleText": {
	    							"text": "올바르지 않은 학번 형식입니다."
	    						}
	    					}
	    				],
	    				"quickReplies": [
		                	{
		                		"action" : "block",
		                		"label" : "이전",
		                		"blockId" : "5f65ad656b1a753222a0be7b"
		                	}
		                ]
	    			}
	    		}
		);
	}
	
	var url = "http://221.154.90.171:8085/MA/roomList.php?userId=" + user_id;

	res.status(200).json(		
			{
			    "version": "2.0",
			    "template": {
			        "outputs": [
			            {
			                "basicCard": {
			                    "description": "입력 학번 : " + user_id,
			                    "buttons": [
			                        {
			                            "action": "webLink",
			                            "label": '사이트 이동',
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
	                		"blockId" : "5f65ad656b1a753222a0be7b"
	                	}
	                ]
			    }
			}
	);	
});


// 모듈에 등록해야 app.js에서 app.use함수를 통해서 사용 가능
module.exports = router;