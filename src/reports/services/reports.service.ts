import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateReportDto } from '../dto/create-report.dto';
import { UpdateReportDto } from '../dto/update-report.dto';
import { ConfigService } from '@nestjs/config';
const pinataSDK = require('@pinata/sdk');
import { UploadedMulterFileI } from '../../common/utils/upload-img';
import * as fs from 'fs';
import { ReportEntity } from '../entities/report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HashEntity } from '../entities/hash.entity';

@Injectable()
export class ReportService {

  constructor(
    private readonly _configService: ConfigService,
    @InjectRepository(ReportEntity)
    private _reportRepository: Repository<ReportEntity>,
    @InjectRepository(HashEntity)
    private _hashRepository: Repository<HashEntity>,
    ) {}

  async createreport(address_id, createReportDto: CreateReportDto, file: UploadedMulterFileI) {
    const imgName = file.fieldname;
    const rootPath = 'src/img/'
    await fs.promises.writeFile(`${rootPath}${imgName}`, file.buffer);

    const imagePath = `${rootPath}${imgName}`;
    const readableStreamForFile = fs.createReadStream(imagePath);
    
    const pinata = new pinataSDK({ pinataJWTKey: this._configService.get('PINATA_JWT_KEY') });

    const options = {
      pinataMetadata: {
        name: imgName,
      },
    };
    const hash = await pinata.pinFileToIPFS(readableStreamForFile, options);

    const metadata = {
      name: imgName,
      keyvalues: {
        address: address_id,
        latitude: createReportDto.latitude,
        longitude: createReportDto.longitude,
        plate_number: createReportDto.plate_number,
        description: createReportDto.description,
      }
    }
    await this.uploadMetadata(hash.IpfsHash, metadata);

    try {
      const report = await this._reportRepository.save({
        address_id: address_id,
      })

      const newHash = await this._hashRepository.save({
        report: report,
        hash: hash.IpfsHash,
      })

    } catch (error) {
      console.log(error)
    }

    return hash.IpfsHash;
  }


  //upload metadata to pinata
  async uploadMetadata(hash, metadata) {
    const pinata = new pinataSDK({ pinataJWTKey: this._configService.get('PINATA_JWT_KEY') });
    try {
      await pinata.hashMetadata(hash, metadata)
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(
        'Ha habido un problema, inténtelo nuevamente.',
      );
    }
  }


  async findAll(id) {
    const reports = await this._reportRepository.findBy({address_id: id})
    console.log(reports)
    return reports;
  }

}
