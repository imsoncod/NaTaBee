var express = require('express');
var router = express.Router();
const request = require('request');
const cheerio = require("cheerio");
const axios = require("axios");

/*
 * RestAPI Code Style
 * 
 * router.{Method}('{String}', function(req, res)){
 * 
 * res.send() : 문자열로 응답 res.json() : Json으로 응답 res.render() : html변환 템플릿을
 * 렌더링(ejs) res.sendfile() : 파일 다운로드 }
 * 
 */

/* Server Testing */
router.get('/', function(req, res){	
	res.status(200).json(		
		{
			"Server Status" : "ON"
		}
	);	
});


/* 학과 소개 - 학과 조회 */
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


/* 공지사항_입학 */

router.post('/notice/admission', function(req, res, next) {
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

router.post('/notice/campuslife', function(req, res, next) {
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

/* 전화번호_성명 */

router.post('/phone/name', function(req, res, next) {
	
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

/* 전화번호_소속명 */

router.post('/phone/dept', function(req, res, next) {
	
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

/* 도서관 - 도서검색 */

router.post('/library', function(req, res, next) {
	
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
router.post('/library/seat', function(req, res){
	var user_id = req.body.action.params.user_id;
	
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

//html-entities decoder
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

/* 식당메뉴 - 학생 */

router.post('/menu/student', function(req, res, next) {
	  let url = 'https://cms.itc.ac.kr/site/inhatc/foodList.do?key=902&type=1&part=000';
	  
	  var week = new Array('일','월','화','수','목','금','토');
	  
	  var today = new Date(); 
	  var year = today.getFullYear(); 
	  var month = new String(today.getMonth()+1); 
	  var date = new String(today.getDate());
	  var day = week[today.getDay()];

	  // 한자리수일 경우 0을 채워준다.
	  if(month.length == 1){ 
	    month = "0" + month; 
	  } 
	  if(date.length == 1){ 
	    date = "0" + date; 
	  } 
	  
	  let full_date = String(year) + '.' + month + '.' + date;
	  
	  axios.get(url).then(html => {
	    let ulList = [];
	    const $ = cheerio.load(html.data);
	    const $bodyList = $("table.cts_table tbody tr");	    
	    var td;
	    
	    var food_1='운영없음\n';
	    var food_2='운영없음\n';
	    var food_3='운영없음\n';
	    
	    var op_check = false;
	    
	    $bodyList.each(function(i, elem) {
	    	td = $(this);
	    	if(td.find('td:nth-of-type(1)').text() == full_date){
	    		op_check = true;

	    		food_1 = td.find('td:nth-of-type(3)').html();
	    		food_2 = td.find('td:nth-of-type(4)').html();
	    		food_3 = td.find('td:nth-of-type(5)').html();
	    	}
	    });
	    
	    food_1 = entities.decode(food_1);
	    food_2 = entities.decode(food_2);
	    food_3 = entities.decode(food_3);
	    
	    if(op_check == true){
	    	var strong_text;
		    var temp;
		    
		    //food_1
		    strong_text = food_1.match('<strong>' + '(.*?)' + '</strong>')[1];
		    temp = food_1.split('<br>');
		    if(temp[temp.length-1] == ''){
		    	temp.pop();
		    }
		    
		    food_1 = strong_text + '\n';
		    
		    for(var i = 1; i < temp.length; i++){
		    	temp[i] = temp[i].trim().replace('\n', '');
		    	if(temp[i] != 'null' && temp[i] != '&#xA0;'){
		    		food_1 += temp[i] + '\n';
		    	}
		    }
		    
		    //food_2
		    strong_text = food_2.match('<strong>' + '(.*?)' + '</strong>')[1];
		    temp = food_2.split('<br>');
		    if(temp[temp.length-1] == ''){
		    	temp.pop();
		    }
		    
		    food_2 = strong_text + '\n';
		    
		    for(var i = 1; i < temp.length; i++){
		    	temp[i] = temp[i].trim().replace('\n', '');
		    	if(temp[i] != 'null' && temp[i] != '&#xA0;'){
		    		food_2 += temp[i] + '\n';
		    	}
		    }
		    
		    //food_3
		    strong_text = food_3.match('<strong>' + '(.*?)' + '</strong>')[1];
		    temp = food_3.split('<br>');
		    if(temp[temp.length-1] == ''){
		    	temp.pop();
		    }
		    
		    food_3 = strong_text + '\n';
		    
		    for(var i = 1; i < temp.length; i++){
		    	temp[i] = temp[i].trim().replace('\n', '');
		    	if(temp[i] != 'null' && temp[i] != '&#xA0;'){
		    		food_3 += temp[i] + '\n';
		    	}
		    }
	    }
  
	    
	    var output_text = '🥄' + full_date + '(' + day + ')' + ' 학생 식당 메뉴🥢\n\n' + 
		  '[일품]\n' + food_1.slice(0,-1) + '\n\n' +
		  '[양식]\n' + food_2.slice(0,-1) + '\n\n' +
		  '[정식]\n' + food_3.slice(0,-1) + '\n\n';

	    res.status(200).json(
	    		{
	    			"version": "2.0",
	    			"template": {
	    				"outputs": [
	    					{
	    						"simpleText": {
	    							"text": output_text
	    						}
	    					}
	    				],
	    				"quickReplies": [
		                	{
		                		"action" : "block",
		                		"label" : "이전",
		                		"blockId" : "5f65add31f96670bd416210c"
		                	}
		                ]
	    			}
	    		}
	    );
	    
	})
});


/* 식당메뉴 - 교직원 */

router.post('/menu/professor', function(req, res, next) {
	  let url = 'https://cms.itc.ac.kr/site/inhatc/foodList.do?key=903&type=2&part=000';
	  
	  var week = new Array('일','월','화','수','목','금','토');
	  
	  var today = new Date(); 
	  var year = today.getFullYear(); 
	  var month = new String(today.getMonth()+1); 
	  var date = new String(today.getDate());
	  var day = week[today.getDay()];

	  // 한자리수일 경우 0을 채워준다.
	  if(month.length == 1){ 
	    month = "0" + month; 
	  } 
	  if(date.length == 1){ 
	    date = "0" + date; 
	  } 
	  
	  let full_date = String(year) + '.' + month + '.' + date;
	  
	  axios.get(url).then(html => {
	    let ulList = [];
	    const $ = cheerio.load(html.data);
	    const $bodyList = $("table.cts_table tbody tr");
	    var td;
	    
	    var food_1='운영없음\n';
	    var food_2='운영없음\n';
	    var food_3='운영없음\n';
	    
	    var op_check = false;
	    
	    $bodyList.each(function(i, elem) {
	    	td = $(this);
	    	if(td.find('td:nth-of-type(1)').text() == full_date){
	    		op_check = true;

	    		food_1 = td.find('td:nth-of-type(3)').html();
	    		food_2 = td.find('td:nth-of-type(4)').html();
	    		food_3 = td.find('td:nth-of-type(5)').html();
	    	}
	    });
	    
	    food_1 = entities.decode(food_1);
	    food_2 = entities.decode(food_2);
	    food_3 = entities.decode(food_3);
	    
	    if(op_check == true){
	    	var strong_text;
		    var temp;
		    
		    //food_1
		    strong_text = food_1.match('<strong>' + '(.*?)' + '</strong>')[1];
		    temp = food_1.split('<br>');
		    
		    if(temp[temp.length-1] == ''){
		    	temp.pop();
		    }
		    
		    food_1 = strong_text + '\n';
		    
		    for(var i = 1; i < temp.length; i++){
		    	temp[i] = temp[i].trim().replace('\n', '');
		    	if(temp[i] != 'null' && temp[i] != ''){
		    		food_1 += temp[i] + '\n';
		    	}
		    }
		    
		    //food_2
		    strong_text = food_2.match('<strong>' + '(.*?)' + '</strong>')[1];
		    temp = food_2.split('<br>');
		    if(temp[temp.length-1] == ''){
		    	temp.pop();
		    }
		    
		    food_2 = strong_text + '\n';
		    
		    for(var i = 1; i < temp.length; i++){
		    	temp[i] = temp[i].trim().replace('\n', '');
		    	if(temp[i] != 'null' && temp[i] != ''){
		    		food_2 += temp[i] + '\n';
		    	}
		    }
		    
		    //food_3
		    strong_text = food_3.match('<strong>' + '(.*?)' + '</strong>')[1];
		    temp = food_3.split('<br>');
		    if(temp[temp.length-1] == ''){
		    	temp.pop();
		    }
		    
		    food_3 = strong_text + '\n';
		    
		    for(var i = 1; i < temp.length; i++){
		    	temp[i] = temp[i].trim().replace('\n', '');

		    	if(temp[i] != 'null' && temp[i] != ''){
		    		food_3 += temp[i] + '\n';
		    	}
		    }
	    }
  	
	    
	    var output_text = '🥄' + full_date + '(' + day + ')' + ' 교직원 식당 메뉴🥢\n\n' + 
		  '[중식 - 한식]\n' + food_1.slice(0,-1) + '\n\n' +
		  '[중식 - 특식]\n' + food_2.slice(0,-1) + '\n\n' +
		  '[석식]\n' + food_3.slice(0,-1) + '\n\n';
	    
	    res.status(200).json(
	    		{
	    			"version": "2.0",
	    			"template": {
	    				"outputs": [
	    					{
	    						"simpleText": {
	    							"text": output_text
	    						}
	    					}
	    				],
	    				"quickReplies": [
		                	{
		                		"action" : "block",
		                		"label" : "이전",
		                		"blockId" : "5f65add31f96670bd416210c"
		                	}
		                ]
	    			}
	    		}
	    );
	    
	    
	})
});


/* 정보광장 - 삽니다&팝니다 */

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

/* 정보광장 - 삽니다&팝니다 */

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



// 모듈에 등록해야 app.js에서 app.use함수를 통해서 사용 가능
module.exports = router;