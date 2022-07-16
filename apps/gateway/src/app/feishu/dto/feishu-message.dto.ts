import { ApiProperty } from '@nestjs/swagger';
import { MSG_TYPE, RECEIVE_TYPE } from '../interface';

export class FeishuMessageDto {
  @ApiProperty({ example: 'email' })
  receive_id_type: RECEIVE_TYPE;

  @ApiProperty({ example: 'vincentchris@126.com' })
  receive_id: string;

  @ApiProperty({ example: '{"text":" test content"}' })
  content: string;

  @ApiProperty({ example: 'text', enum: MSG_TYPE })
  msg_type: MSG_TYPE;
}
