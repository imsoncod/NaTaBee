import { Request, Response } from 'express';
import axios from 'axios';
import cheerio from 'cheerio';

export class ChitchatController {
    getMessage = async (req: Request, res: Response) => {
        const q: string = req.body.action.params.q;

        const a = await axios.get(`http://3.37.30.51/chitchat?q=${q}`)

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