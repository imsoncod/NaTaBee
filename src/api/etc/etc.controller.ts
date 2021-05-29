import { Request, Response } from 'express';
import axios from 'axios';
import cheerio from 'cheerio';

export class EtcController {
	/* 학과명 입력 */
	getDeptInfo = async (req:any, res:any) => {
		const deptName: string = req.body.action.params.deptName;
		
		const params = {
			deptName: deptName,
		}

		const r = await (await axios.get('http://52.79.162.84:8081/etc/dept', { params })).data.data;

		if (r.text) {
			res.status(200).json(
				{
					"version": "2.0",
					"template": {
						"outputs": [
							{
								"simpleText": {
									"text": r.text
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
		};

		res.status(200).json(
			{
				"version": "2.0",
				"template": {
					"outputs": [
						{
							"basicCard": {
								"description": `입력 학과명 : ${r.dept}`,
								"buttons": [
									{
										"action": "webLink",
										"label": '소개 사이트 이동',
										"webLinkUrl": r.viewLink,
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

	/* 원점메아리 */
	getInhaNews = async (req: Request, res: Response) => {
		const r = await (await axios.get('http://52.79.162.84:8081/etc/news')).data.data;

			res.status(200).json(
				{
					"version": "2.0",
					"template": {
						"outputs": [
							{
								"basicCard": {
									"title": `원점메아리 ${r.no}호`,
									"thumbnail": {
										"imageUrl": r.imgSrc,
										"fixedRatio": true,
										"width": 730,
										"height": 999
									},
									"buttons": [
										{
											"action": "webLink",
											"label": "보러가기",
											"webLinkUrl": r.viewLink,
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