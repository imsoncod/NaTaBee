import { Request, Response } from 'express';
import axios from 'axios';
import cheerio from 'cheerio';

export class PhoneController {
	/* 전화번호_성명 */
	getPhoneByName = async (req: Request, res: Response) => {
		const findWord: string = req.body.action.params.findWord;

		const params = {
			findType: 'NAME',
			findWord: findWord,
		}

		const r = await (await axios.get('http://52.79.162.84:8081/phone', { params })).data.data;

		const items = [];
		for await (const phone of r.phoneList){
			items.push({
				"title": phone.title,
				"description": phone.date,
				"link": {
					"web": phone.viewLink,
				}
			});
		}

			if (r.phoneList.length == 0) {
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
									"blockId": "5f65acaf9d06b973d74f8602"
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
											"title": `${findWord} 전화번호 검색결과`,
											"imageUrl": "https://user-images.githubusercontent.com/48934537/96865227-a461d880-14a4-11eb-816c-5022510185b2.png"
										},
										"items": items,
									}
								}
							],
							"quickReplies": [
								{
									"action": "block",
									"label": "이전",
									"blockId": "5f65acaf9d06b973d74f8602"
								}
							]
						}
					}
				);
			}
		}

	/* 전화번호_소속 */
	getPhoneByDept = async (req: Request, res: Response) => {
		const findWord: string = req.body.action.params.findWord;

		const params = {
			findType: 'DEPT_NAME',
			findWord: findWord,
		}

		const r = await (await axios.get('http://52.79.162.84:8081/phone', { params })).data.data;

		const items = [];
		for await (const phone of r.phoneList){
			items.push({
				"title": phone.title,
				"description": phone.date,
				"link": {
					"web": phone.viewLink,
				}
			});
		}

			if (r.phoneList.length == 0) {
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
									"blockId": "5f65acaf9d06b973d74f8602"
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
											"title": `${findWord} 전화번호 검색결과`,
											"imageUrl": "https://user-images.githubusercontent.com/48934537/96865227-a461d880-14a4-11eb-816c-5022510185b2.png"
										},
										"items": items,
									}
								}
							],
							"quickReplies": [
								{
									"action": "block",
									"label": "이전",
									"blockId": "5f65acaf9d06b973d74f8602"
								}
							]
						}
					}
				);
			}
		}
	}