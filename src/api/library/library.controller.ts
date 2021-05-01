import { Request, Response } from 'express';
import axios from 'axios';
import cheerio from 'cheerio';

export class LibraryController {
	/**
 * @swagger
 * tags:
 *   name: library
 *   description: 도서관 API
 *   
 * definitions:
 *   request_search:
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
 *               book_name:
 *                 type: string
 *                 example: 데이터베이스
 *           id:
 *             type: string
 *           detailParams:
 *             type: object
 *             properties:
 *               book_name:
 *                 type: object
 *                 properties:
 *                   origin:
 *                     type: string
 *                   value:
 *                     type: string
 *                   groupName:
 *                     type: string                  
 *   request_seat:
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
 *               user_id:
 *                 type: string
 *                 example: "201645018"
 *           id:
 *             type: string
 *           detailParams:
 *             type: object
 *             properties:
 *               user_id:
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
	 * /library/search:
	 *   post:
	 *     tags: [library]
	 *     summary: 도서 검색
	 *     parameters:
	 *       - in: body
	 *         name: json_object
	 *         description: 도서명 전달
	 *         schema:
	 *           $ref: "#/definitions/request_search"
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
	/* 도서관 - 도서검색 */
	getBooklist = async (req: Request, res: Response) => {
		let book_name = req.body.action.params.book_name;

		let book_url = 'https://library.inhatc.ac.kr/Cheetah/Search/AdvenceSearch#/basic?otwa1=IDX&otbool1=A&otod1=' + encodeURI(book_name)
			+ '&otopt=all&stype=B&sp=1';

		let url = 'https://library.inhatc.ac.kr/cheetah/api/search?otwa1=T&otod1=' + encodeURI(book_name)
			+ '&otbool1=A&otpn1=K&otwa2=A&otod2=&otbool2=A&otpn2=K&otwa3=P&otod3=&otbool3=A&otpn3=K&otopt=&lang=&stype=B&sp=1&otyear1=&otyear2=&tab=basic';

		axios.get(url).then(html => {
			let ulList = [];
			let book_list = html.data.ListItem.BasicItem;

			for (var i = 0; i < book_list.length; i++) {
				if (i > 3) {
					break;
				}
				let mTitle = book_list[i].Title;
				let mAuthor = book_list[i].Author;
				let mPublisher = book_list[i].Publisher;
				let mImageUrl = 'https://library.inhatc.ac.kr/cheetah/Shared/CoverImage?Cno=' + book_list[i].Cno;
				let mUrl = 'https://library.inhatc.ac.kr/Cheetah/Search/AdvenceSearch#/basic/detail/' + book_list[i].Cno;

				ulList[i] = {
					title: mTitle,
					description: mAuthor + ' / ' + mPublisher,
					imageUrl: mImageUrl,
					link: {
						web: mUrl
					}
				}
			};

			let data_length = book_list.length;
			const data = ulList.filter(n => n.title);

			if (data_length == 0) {
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
									"action": "block",
									"label": "이전",
									"blockId": "5f65ad656b1a753222a0be7b"
								}
							]
						}
					}
				);
			} else if (data_length <= 4) {
				res.status(200).json(
					{
						"version": "2.0",
						"template": {
							"outputs": [
								{
									"listCard": {
										"header": {
											"title": "'" + book_name + "' 도서 검색결과",
											"imageUrl": "https://user-images.githubusercontent.com/48934537/96865227-a461d880-14a4-11eb-816c-5022510185b2.png"
										},
										"items": data
									}
								}
							],
							"quickReplies": [
								{
									"action": "block",
									"label": "이전",
									"blockId": "5f65ad656b1a753222a0be7b"
								}
							]
						}
					}
				);
			} else {
				res.status(200).json(
					{
						"version": "2.0",
						"template": {
							"outputs": [
								{
									"listCard": {
										"header": {
											"title": "'" + book_name + "' 도서 검색결과",
											"imageUrl": "https://user-images.githubusercontent.com/48934537/96865227-a461d880-14a4-11eb-816c-5022510185b2.png"
										},
										"items": data.slice(0, 4),
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
									"action": "block",
									"label": "이전",
									"blockId": "5f65ad656b1a753222a0be7b"
								}
							]
						}
					}
				);
			}
		})
	}

	/**
			* @swagger
			* /library/seat:
			*   post:
			*     tags: [library]
			*     summary: 좌석 예약
			*     parameters:
			*       - in: body
			*         name: json_object
			*         description: 학번 전달
			*         schema:
			*           $ref: "#/definitions/request_seat"
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
	/* 도서관 - 좌석 예약 및 사용 현황 */
	registSeat = async (req: Request, res: Response) => {
		let user_id = req.body.action.params.user_id;

		if (user_id.length != 9 || user_id.slice(0, 2) != '20' || isNaN(user_id)) {
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
								"action": "block",
								"label": "이전",
								"blockId": "5f65ad656b1a753222a0be7b"
							}
						]
					}
				}
			);
		}

		let url = "http://seat.inhatc.ac.kr/MA/roomList.php?userId=" + user_id;

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
							"action": "block",
							"label": "이전",
							"blockId": "5f65ad656b1a753222a0be7b"
						}
					]
				}
			}
		);
	}
}