import { Request, Response } from 'express';
import axios from 'axios';
import cheerio from 'cheerio';

export class EtcController {
	/**
 * @swagger
 * tags:
 *   name: etc
 *   description: 기타 API
 *   
 * definitions:
 *   request_dept:
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
 *               dept:
 *                 type: string
 *                 example: 컴퓨터시스템과
 *           id:
 *             type: string
 *           detailParams:
 *             type: object
 *             properties:
 *               dept:
 *                 type: object
 *                 properties:
 *                   origin:
 *                     type: string
 *                   value:
 *                     type: string
 *                   groupName:
 *                     type: string                  
 *
 */

	/**
	 * @swagger
	 * /etc/dept:
	 *   post:
	 *     tags: [etc]
	 *     summary: 학과 소개 사이트
	 *     parameters:
	 *       - in: body
	 *         name: json_object
	 *         description: 학과명 전달
	 *         schema:
	 *           $ref: "#/definitions/request_dept"
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
	/* 학과명 입력 */
	getDeptInfo = async (req: Request, res: Response) => {
		let dept = req.body.action.params.dept;
		const dept_array: any = {
			"기계과": "777",
			"기계설계과": "778",
			"메카트로닉스과": "779",
			"조선해양과": "780",
			"항공기계과": "782",
			"자동차과": "781",
			"전기정보과": "783",
			"디지털전자과": "785",
			"정보통신과": "786",
			"컴퓨터정보과": "787",
			"컴퓨터시스템과": "788",
			"토목환경과": "789",
			"항공지리정보과": "790",
			"건축과": "791",
			"실내건축과": "792",
			"화공환경과": "793",
			"금속재료과": "794",
			"항공운항과": "795",
			"항공경영과": "796",
			"관광경영과": "797",
			"비서과": "799",
			"호텔경영과": "798",
			"산업디자인과": "800",
			"패션디자인과": "801"
		};

		let dept_code = dept_array[dept];
		if (dept_code == undefined) {
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
								"action": "block",
								"label": "이전",
								"blockId": "5f65a07c011936335d332e63"
							}
						]
					}
				}
			);
		}
		let url = "https://cms.itc.ac.kr/site/ipsi/sub.do?key=" + dept_code;

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
							"action": "block",
							"label": "이전",
							"blockId": "5f65a07c011936335d332e63"
						}
					]
				}
			}
		);
	}

	/**
 * @swagger
 * /etc/news:
 *   post:
 *     tags: [etc]
 *     summary: 원점메아리
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
	/* 원점메아리 */
	getInhaNews = async (req: Request, res: Response) => {
		let url = 'https://cms.itc.ac.kr/site/inhatc/boardList.do?boardSeq=68&key=99&part=000';

		axios.get(url).then(html => {
			let ulList = [];
			const $ = cheerio.load(html.data);
			const $bodyList = $("div.webzine ul.clearfix li");

			var ho;
			var imgUrl;
			var temp;

			$bodyList.each( (i, elem) => {
				if (i > 0) {
					return false;
				}
				imgUrl = "https://cms.itc.ac.kr" + String($(this).find('a').children(".photo").find('img').attr('src')).replace('thumb/', '');
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
										"fixedRatio": true,
										"width": 730,
										"height": 999
									},
									"buttons": [
										{
											"action": "webLink",
											"label": "보러가기",
											"webLinkUrl": "http://asp2.ezebn.com/Viewer/inha" + ho
										}
									]
								}
							}
						],
						"quickReplies": [
							{
								"action": "block",
								"label": "이전",
								"blockId": "5f6465aa6c2427307fbe0872"
							}
						]
					}
				}
			);
		})
	}
}