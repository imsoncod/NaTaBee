import { Request, Response } from 'express';
import axios from 'axios';
import cheerio from 'cheerio';

export class InfoController {
	/* 정보광장 - 삽니다 & 팝니다 */
	getMarketlist = async (req: Request, res: Response) => {
		const r = await (await axios.get('http://52.79.162.84:8081/info/market')).data.data;

		const items = [];
		for await (const market of r.marketList){
			items.push({
				"title": market.title,
				"description": `${market.kind} / ${market.date}`,
				"link": {
					"web": market.viewLink,
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
									"title": "삽니다 & 팝니다",
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
							"blockId": "5f65ae6d04c92653cf64980a"
						}
					]
				}
			}
		);
	}

	/* 정보광장 - 분실물 & 습득물 */
	getLostlist = async (req: Request, res: Response) => {
		const r = await (await axios.get('http://52.79.162.84:8081/info/lost')).data.data;

		const items = [];
		for await (const lost of r.lostList){
			items.push({
				"title": lost.title,
				"description": `${lost.kind} / ${lost.date}`,
				"link": {
					"web": lost.viewLink,
				}
			});
		}

		res.status(200).json({
			"version": "2.0",
			"template": {
				"outputs": [
					{
						"listCard": {
							"header": {
								"title": "분실물 & 습득물",
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
						"blockId": "5f65ae6d04c92653cf64980a"
					}
				]
			}
		});
	}
}