import { Request, Response } from 'express';
import axios from 'axios';
import cheerio from 'cheerio';

export class NoticeController {

	/**
	  * @swagger
	  * tags:
	  *   name: notice
	  *   description: 공지사항 API
	*/

	/**
	 * @swagger
	 * /notice/admission:
	 *   post:
	 *     tags: [notice]
	 *     summary: 입학 공지사항
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
	/* 공지사항_입학 */
	getAdmissionNotice = async (req: Request, res: Response) => {
		console.log('fdsafdssa');
		let url = 'https://cms.itc.ac.kr/site/mobile/boardList.do?boardSeq=44&key=1391&part=000';

		await axios.get(url).then((html: { data: string | Buffer; }) => {
			let ulList: any[] = [];
			const $ = cheerio.load(html.data);
			const $bodyList = $("#news_list_new li");

			$bodyList.each((i, elem) => {
				if (i > 3) {
					return false;
				}
				ulList[i] = {
					title: $(this).find('a').text().trim(),
					url: "https://cms.itc.ac.kr/site/mobile/" + String($(this).find('a').attr('href')),
					date: $(this).find('p').find('span:nth-of-type(2)').text()
				};
				if (i >= 3) return false;
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
								"action": "block",
								"label": "이전",
								"blockId": "5f6465441f96670bd416201c"
							}
						]
					}
				}
			);
		})
	};

	/**
	* @swagger
	* /notice/campuslife:
	*   post:
	*     tags: [notice]
	*     summary: 캠퍼스라이프 공지사항
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
	/* 공지사항_캠퍼스라이프 */
	getCampuslifeNotice = async (req: Request, res: Response) => {
		let url = 'https://cms.itc.ac.kr/site/mobile/boardList.do?boardSeq=44&key=1001&part=000';

		axios.get(url).then((html: { data: string | Buffer; }) => {
			let ulList: any[] = [];
			const $ = cheerio.load(html.data);
			const $bodyList = $("#news_list_new li");

			$bodyList.each((i, elem) => {
				ulList[i] = {
					title: $(this).find('a').text().trim(),
					url: "https://cms.itc.ac.kr/site/mobile/" + String($(this).find('a').attr('href')),
					date: $(this).find('p').find('span:nth-of-type(2)').text()
				};
				if (i >= 3) return false;
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

	/**
	* @swagger
	* /notice/plan:
	*   post:
	*     tags: [notice]
	*     summary: 주간 주요일정
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
	/* 주간 주요일정 */
	getWeekplan = async (req: Request, res: Response) => {
		let url = 'https://cms.itc.ac.kr/site/mobile/weeklist.do?key=1519&part=000';

		axios.get(url).then((html: { data: string | Buffer; }) => {
			let title: any[] = [];
			let link: any[] = [];
			let date: any[] = [];

			const $ = cheerio.load(html.data);
			const $bodyList1 = $("div.contents h3");
			const $bodyList2 = $("div.contents ul");



			$bodyList1.each( (i, elem) => {
				title[i] = $(this).text().trim();
				if (i >= 3) return false;
			});

			var temp;
			$bodyList2.each( (i, elem) => {
				temp = $(this).find('li:nth-of-type(1)').text().trim().split('~');
				link[i] = "https://cms.itc.ac.kr/site/mobile/" + String($(this).find('li:nth-of-type(2)').find('a').attr('href')).slice(1);
				date[i] = temp[0].trim() + ' ~ ' + temp[1].trim();
				if (i >= 3) return false;
			});

			res.status(200).json(
				{
					"version": "2.0",
					"template": {
						"outputs": [
							{
								"listCard": {
									"header": {
										"title": "주간 주요일정",
										"imageUrl": "https://user-images.githubusercontent.com/48934537/96865227-a461d880-14a4-11eb-816c-5022510185b2.png"
									},
									"items": [
										{
											"title": title[0],
											"description": date[0],
											"link": {
												"web": link[0]
											}
										},
										{
											"title": title[1],
											"description": date[1],
											"link": {
												"web": link[1]
											}
										},
										{
											"title": title[2],
											"description": date[2],
											"link": {
												"web": link[2]
											}
										},
										{
											"title": title[3],
											"description": date[3],
											"link": {
												"web": link[3]
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