import { Request, Response } from 'express';
import axios from 'axios';
import cheerio from 'cheerio';

export class LibraryController {
	/* 도서관 - 도서검색 */
	getBooklist = async (req: Request, res: Response) => {
		const bookName: string = req.body.action.params.bookName;

		const params = {
			bookName: bookName,
		}

		const r = await (await axios.get('http://52.79.162.84:8081/library/search', { params })).data.data;
		
		const items = [];
		for await (const book of r.bookList){
			items.push({
				"title": book.title,
				"description": `${book.author} / ${book.publisher}`,
				"imageUrl": book.imageUrl,
				"link": {
					"web": book.viewLink,
				}
			});
		}

			if (r.bookList.length == 0) {
				res.status(200).json(
					{
						"version": "2.0",
						"template": {
							"outputs": [
								{
									"simpleText": {
										"text": "검색 결과가 없습니다."
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
											"title": `${bookName} 도서검색 결과`,
											"imageUrl": "https://user-images.githubusercontent.com/48934537/96865227-a461d880-14a4-11eb-816c-5022510185b2.png"
										},
										"items": items,
										"buttons": [
											{
												"label": "더 보기",
												"action": "webLink",
												"webLinkUrl": r.url,
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

	/* 도서관 - 좌석 예약 및 사용 현황 */
	registSeat = async (req: Request, res: Response) => {
		const userId: string = req.body.action.params.userId;

		const params = {
			userId: userId,
		}

		const r = await (await axios.get('http://52.79.162.84:8081/library/seat', { params })).data.data;

		if (r.text) {
			res.status(200).json(
				{
					"version": "2.0",
					"template": {
						"outputs": [
							{
								"simpleText": {
									"text": r.text,
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

		res.status(200).json(
			{
				"version": "2.0",
				"template": {
					"outputs": [
						{
							"basicCard": {
								"description": r.description,
								"buttons": [
									{
										"action": "webLink",
										"label": '사이트 이동',
										"webLinkUrl": r.url
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