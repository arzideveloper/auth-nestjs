import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


@Controller()
export class AppController {
  constructor() {}



  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req) {
    return req.user;
  }


}
