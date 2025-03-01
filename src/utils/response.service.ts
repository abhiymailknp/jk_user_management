import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class ResponseService {
      sendSuccessResponse(res: Response, data: any, message: string = ''): object {
            return res.status(200).json({ success: true, data, message });
      }

      sendBadRequest(res: Response, message: string = 'Internal Server Error'): object {
            return res.status(400).json({ success: false, message });
      }

      sendUnauthorize(res: Response, message: string = 'Unauthorize Request'): object {
            return res.status(401).json({ success: false, message });
      }

      sendForbidden(res: Response, message: string = 'Internal Server Error'): object {
            return res.status(403).json({ success: false, message });
      }

      sendNotFount(res: Response, message: string = '404 Not Found'): object {
            return res.status(404).json({ success: false, message });
      }

      sendServerError(res: Response, message: string = 'Internal Server Error'): object {
            return res.status(500).json({ success: false, message });
      }

}