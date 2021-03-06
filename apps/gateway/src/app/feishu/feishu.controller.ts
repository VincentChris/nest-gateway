import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FeishuService } from './feishu.service';
import { CreateFeishuDto } from './dto/create-feishu.dto';
import { UpdateFeishuDto } from './dto/update-feishu.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FeishuMessageDto } from './dto/feishu-message.dto';
import { GetUserTokenDto } from './dto/get-user-toke.dto';

@ApiTags('飞书')
@Controller('feishu')
export class FeishuController {
  constructor(private readonly feishuService: FeishuService) {}

  @Post()
  create(@Body() createFeishuDto: CreateFeishuDto) {
    return this.feishuService.create(createFeishuDto);
  }

  @Get()
  findAll() {
    return this.feishuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feishuService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeishuDto: UpdateFeishuDto) {
    return this.feishuService.update(+id, updateFeishuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feishuService.remove(+id);
  }

  @Get('appToken')
  getAppToken() {
    return this.feishuService.getAppToken();
  }

  @ApiOperation({
    summary: '消息推送',
  })
  @Post('sendMessage')
  sendMessage(@Body() params: FeishuMessageDto) {
    return this.feishuService.sendMessage(params);
  }

  @Post('getUserToken')
  getUserToken(@Body() params: GetUserTokenDto) {
    return this.feishuService.getUserTokenByCode(params.code);
  }
}
