import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { Asset } from './entities/asset.entity';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(Asset)
    private assetsRepository: Repository<Asset>,
  ) {}

  async create(createAssetDto: CreateAssetDto): Promise<Asset> {
    const newAsset = this.assetsRepository.create(createAssetDto);
    return this.assetsRepository.save(newAsset);
  }

  async find(filter: FindOptionsWhere<Asset> = {}): Promise<Asset[]> {
    return this.assetsRepository.find({ where: filter });
  }

  async findOne(filter: FindOptionsWhere<Asset>): Promise<Asset> {
    const asset = await this.assetsRepository.findOne({ where: filter });
    if (!asset) {
      throw new NotFoundException(`Asset  not found`);
    }
    return asset;
  }

  async findByName(name: string): Promise<Asset | undefined> {
    return this.assetsRepository.findOne({ where: { name } });
  }

  async update(id: number, updateAssetDto: UpdateAssetDto): Promise<Asset> {
    const asset = await this.findOne({ id });
    Object.assign(asset, updateAssetDto);
    return this.assetsRepository.save(asset);
  }

  async remove(id: number): Promise<void> {
    const asset = await this.findOne({ id });
    await this.assetsRepository.remove(asset);
  }
}
