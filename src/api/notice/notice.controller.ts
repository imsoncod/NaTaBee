import { Request, Response } from 'express';
import axios from 'axios';
import cheerio from 'cheerio';

export class NoticeController {
	/* 공지사항_입학 */
	getAdmissionNotice = async (req: Request, res: Response) => {
		const r = await (await axios.get('http://52.79.162.84:8081/notice/admission')).data.data;
		
		const items = [];
		for await (const notice of r.noticeList){
			items.push({
				"title": notice.title,
				"description": notice.date,
				"link": {
					"web": notice.viewLink,
				}
			});
		}

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
								"blockId": "5f6465441f96670bd416201c"
							}
						]
					}
				}
			);
		}

	/* 공지사항_캠퍼스라이프 */
	getCampuslifeNotice = async (req: Request, res: Response) => {
		const r = await (await axios.get('http://52.79.162.84:8081/notice/campuslife')).data.data;
		
		const items = [];
		for await (const notice of r.noticeList){
			items.push({
				"title": notice.title,
				"description": notice.date,
				"link": {
					"web": notice.viewLink,
				}
			});
		}

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
									"items": items,
									"buttons": [
										{
											"label": "더 보기",
											"action": "webLink",
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
								"blockId": "5f6465aa6c2427307fbe0872"
							}
						]
					}
				}
			);
		}

	/* 주간 주요일정 */
	getWeekplan = async (req: Request, res: Response) => {
		const r = await (await axios.get('http://52.79.162.84:8081/notice/weekplan')).data.data;
		
		const items = [];
		for await (const plan of r.planList){
			items.push({
				"title": plan.title,
				"description": plan.date,
				"link": {
					"web": plan.viewLink,
				}
			});
		}

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
								"blockId": "5f6465aa6c2427307fbe0872"
							}
						]
					}
				}
			);
		}
	}