import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import type { AdjustBalanceDto } from './dto/adjust-balance.dto';
import type { CreateUserDto } from './dto/create-user.dto';
import type { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private readonly userModel: Model<any>, // удобнее any чтобы избежать мелких проблем с типами typegoose
  ) {}

  async create(dto: CreateUserDto) {
    const created = await this.userModel.create(dto);
    return created.toObject();
  }

  async findById(id: string) {
    const u = await this.userModel.findById(id).lean();
    if (!u) throw new NotFoundException('User not found');
    return u;
  }

  async findOneByTelegramId(tgId: number) {
    return this.userModel.findOne({ telegramId: tgId }).lean();
  }

  async update(id: string, dto: UpdateUserDto) {
    const updated = await this.userModel
      .findByIdAndUpdate(id, dto, { new: true })
      .lean();
    if (!updated) throw new NotFoundException('User not found');
    return updated;
  }

  async remove(id: string) {
    const res = await this.userModel.findByIdAndDelete(id).lean();
    if (!res) throw new NotFoundException('User not found');
    return res;
  }

  // пагинация и фильтрация
  async list(params: {
    page?: number;
    limit?: number;
    search?: string;
    tags?: string[];
    isBlocked?: boolean;
    isActive?: boolean;
  }) {
    const { page = 1, limit = 20, search, tags, isBlocked, isActive } = params;
    const filter: any = {};
    if (typeof isBlocked === 'boolean') filter.isBlocked = isBlocked;
    if (typeof isActive === 'boolean') filter.isActive = isActive;
    if (tags && tags.length) filter.tags = { $all: tags };
    if (search) {
      const s = search.trim();
      // поиск по telegramId или invitedBy или email-like fields
      const maybeId = Number(s);
      if (!Number.isNaN(maybeId)) filter.telegramId = maybeId;
      else
        filter.$or = [
          { invitedBy: { $regex: s, $options: 'i' } },
          { avatarUrl: { $regex: s, $options: 'i' } },
        ];
    }

    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      this.userModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      this.userModel.countDocuments(filter),
    ]);

    return {
      items,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    };
  }

  async block(id: string) {
    return this.update(id, { isBlocked: true });
  }

  async unblock(id: string) {
    return this.update(id, { isBlocked: false });
  }

  async adjustBalance(id: string, dto: AdjustBalanceDto) {
    const { amount } = dto;
    const res = await this.userModel
      .findByIdAndUpdate(id, { $inc: { balance: amount } }, { new: true })
      .lean();
    if (!res) throw new NotFoundException('User not found');
    return res;
  }

  async setTariff(id: string, tariff: string, expires?: Date) {
    return this.update(id, { tariff, tariffExpires: expires });
  }
}
