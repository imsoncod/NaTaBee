import { Request, Response } from 'express';
import axios from 'axios';
import cheerio from 'cheerio';

export class MenuController {
	/* 식당메뉴 - 학생 */
	getStudentMenu = async (req: Request, res: Response) => {
		const params = {
			kind: '학생',
		}

		const r = await (await axios.get('http://52.79.162.84:8081/menu', { params })).data.data;

		var text = '🥄오늘의 학생 식당 메뉴🥢\n\n' +
			`[일품]\n${r.menuList.food1.title}\n\n` +
			`[양식]\n${r.menuList.food2.title}\n\n` +
			`[정식]\n${r.menuList.food3.title}\n\n`;

			res.status(200).json(
				{
					"version": "2.0",
					"template": {
						"outputs": [
							{
								"simpleText": {
									"text": text
								}
							}
						],
						"quickReplies": [
							{
								"action": "block",
								"label": "이전",
								"blockId": "5f65add31f96670bd416210c"
							}
						]
					}
				}
			);
		}	

	/* 식당메뉴 - 교직원 */
	getProfessorMenu = async (req: Request, res: Response) => {
		const params = {
			kind: '교직원',
		}

		const r = await (await axios.get('http://52.79.162.84:8081/menu', { params })).data.data;

		var text = '🥄오늘의 교직원 식당 메뉴🥢\n\n' +
			`[일품]\n${r.menuList.food1.title}\n\n` +
			`[양식]\n${r.menuList.food2.title}\n\n` +
			`[정식]\n${r.menuList.food3.title}\n\n`;

			res.status(200).json(
				{
					"version": "2.0",
					"template": {
						"outputs": [
							{
								"simpleText": {
									"text": text
								}
							}
						],
						"quickReplies": [
							{
								"action": "block",
								"label": "이전",
								"blockId": "5f65add31f96670bd416210c"
							}
						]
					}
				}
			);
		}	
	}