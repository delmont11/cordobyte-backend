import { Module } from '@nestjs/common';
import { ReportService } from './services/reports.service';
import { ReportController } from './controllers/reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportEntity } from './entities/report.entity';
import { HashEntity } from './entities/hash.entity';
@Module({
  imports: [TypeOrmModule.forFeature([ReportEntity, HashEntity])],
  controllers: [ReportController],
  providers: [ReportService]
})
export class ReportsModule {}
