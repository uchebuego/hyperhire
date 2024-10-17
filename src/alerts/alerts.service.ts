import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { Alert } from './entities/alert.entity';
import { AssetsService } from '../assets/assets.service';

@Injectable()
export class AlertsService {
  constructor(
    @InjectRepository(Alert)
    private alertsRepository: Repository<Alert>,
    private assetsService: AssetsService,
  ) {}

  async create(createAlertDto: CreateAlertDto): Promise<Alert> {
    const { assetId, targetPrice, email } = createAlertDto;
    const asset = await this.assetsService.findOne({ id: assetId });
    if (!asset) {
      throw new NotFoundException(`Asset with ID ${assetId} not found`);
    }

    const newAlert = this.alertsRepository.create({
      asset,
      targetPrice,
      email,
    });

    return this.alertsRepository.save(newAlert);
  }

  async findAll(filter: FindOptionsWhere<Alert> = {}): Promise<Alert[]> {
    return this.alertsRepository.find({ where: filter, relations: ['asset'] });
  }

  async findOne(id: number): Promise<Alert> {
    const alert = await this.alertsRepository.findOne({
      where: { id },
      relations: ['asset'],
    });
    if (!alert) {
      throw new NotFoundException(`Alert with ID ${id} not found`);
    }
    return alert;
  }

  async update(
    id: number,
    updateAlertDto: UpdateAlertDto | Partial<Omit<Alert, 'id'>>,
  ): Promise<Alert> {
    const alert = await this.findOne(id);
    Object.assign(alert, updateAlertDto);
    return this.alertsRepository.save(alert);
  }

  async remove(id: number): Promise<void> {
    const alert = await this.findOne(id);
    await this.alertsRepository.remove(alert);
  }
}
