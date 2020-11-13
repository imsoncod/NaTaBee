var express = require('express');
var router = express.Router();
const request = require('request');
const cheerio = require("cheerio");
const axios = require("axios");

//html-entities decoder
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

/**
 * @swagger
 * tags:
 *   name: menu
 *   description: 식당메뉴 API
*/

/**
 * @swagger
 * /menu/student:
 *   post:
 *     tags: [menu]
 *     summary: 학생 식당 메뉴
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
/* 식당메뉴 - 학생 */
router.post('/student', function(req, res, next) {
	  let url = 'https://cms.itc.ac.kr/site/inhatc/foodList.do?key=902&type=1&part=000';
	  
	  var week = new Array('일','월','화','수','목','금','토');
	  
	  var today = new Date(); 
	  today.setHours(today.getHours()+9);
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


/**
 * @swagger
 * /menu/professor:
 *   post:
 *     tags: [menu]
 *     summary: 교직원 식당 메뉴
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
/* 식당메뉴 - 교직원 */
router.post('/professor', function(req, res, next) {
	  let url = 'https://cms.itc.ac.kr/site/inhatc/foodList.do?key=903&type=2&part=000';
	  
	  var week = new Array('일','월','화','수','목','금','토');
	  
	  var today = new Date();
	  today.setHours(today.getHours()+9);
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

//모듈에 등록해야 app.js에서 app.use함수를 통해서 사용 가능
module.exports = router;