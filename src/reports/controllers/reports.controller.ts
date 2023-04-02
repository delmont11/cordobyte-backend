import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards, Req } from '@nestjs/common';
import { CreateReportDto } from '../dto/create-report.dto';
import { UpdateReportDto } from '../dto/update-report.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedMulterFileI } from 'src/common/utils/upload-img';
import { ReportService } from '../services/reports.service';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { Request } from 'express'

@Controller('report')
export class ReportController {
  constructor(private readonly _reportService: ReportService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(FileInterceptor('file'))
  uploadImg(@UploadedFile() file: UploadedMulterFileI, @Body() createReportDto: CreateReportDto, @Req() req) {
    return this._reportService.createreport(req.user['id'], createReportDto, file);
  }

  @Get()
  @UseGuards(AccessTokenGuard)
  getReports(@Req() req){

    return this._reportService.findAll(req.user['id']);
  }
}
