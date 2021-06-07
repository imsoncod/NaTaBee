import { Request, Response } from 'express';
import axios from 'axios';
import cheerio from 'cheerio';

export class ChitchatController {
    getMessage = async (req: any, res: any) => {
        const q: string = req.body.action.params.q;

        const a = await(await axios.get('http://3.37.30.51/chitchat?q='+encodeURI(q))).data.a;
       
        res.status(200).json(
            {
                "version": "2.0",
                "template": {
                    "outputs": [
                        {
                            "simpleText": {
                                "text": a
                            }
                        }
                    ]
                }
            }
        );
    }
}