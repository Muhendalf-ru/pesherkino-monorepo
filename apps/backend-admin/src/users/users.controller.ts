import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
  ApiHeader,
  ApiParam,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdjustBalanceDto } from './dto/adjust-balance.dto';
import { ListUsersDto } from './dto/list-users.dto';
import { ApiKeyGuard } from '../auth/api-key.guard';

@ApiTags('Admin / Users')
@ApiHeader({ name: 'x-api-key', description: 'Admin API key', required: true })
@UseGuards(ApiKeyGuard)
@Controller('admin/api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, description: 'Created', type: Object })
  async create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List users with pagination and filters' })
  @ApiResponse({ status: 200, description: 'List result', type: Object })
  async list(@Query() query: ListUsersDto) {
    // controller transforms query types
    const page = query.page ? Number(query.page) : undefined;
    const limit = query.limit ? Number(query.limit) : undefined;
    const tags = query.tags
      ? query.tags.split(',').map((t) => t.trim())
      : undefined;
    const isBlocked =
      typeof query.isBlocked !== 'undefined'
        ? query.isBlocked === 'true'
        : undefined;
    const isActive =
      typeof query.isActive !== 'undefined'
        ? query.isActive === 'true'
        : undefined;

    return this.usersService.list({
      page,
      limit,
      search: query.search,
      tags,
      isBlocked,
      isActive,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiParam({ name: 'id', description: 'Mongo user id' })
  @ApiResponse({ status: 200, description: 'User', type: Object })
  async get(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user fields' })
  @ApiResponse({ status: 200, description: 'Updated user', type: Object })
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, description: 'Deleted user', type: Object })
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Patch(':id/block')
  @ApiOperation({ summary: 'Block user' })
  @ApiResponse({ status: 200, description: 'User blocked', type: Object })
  async block(@Param('id') id: string) {
    return this.usersService.block(id);
  }

  @Patch(':id/unblock')
  @ApiOperation({ summary: 'Unblock user' })
  @ApiResponse({ status: 200, description: 'User unblocked', type: Object })
  async unblock(@Param('id') id: string) {
    return this.usersService.unblock(id);
  }

  @Post(':id/adjust-balance')
  @ApiOperation({ summary: 'Adjust user balance' })
  @ApiResponse({ status: 200, description: 'Balance adjusted', type: Object })
  async adjustBalance(@Param('id') id: string, @Body() dto: AdjustBalanceDto) {
    return this.usersService.adjustBalance(id, dto);
  }

  @Post(':id/set-tariff')
  @ApiOperation({ summary: 'Set tariff for user' })
  @ApiResponse({ status: 200, description: 'Tariff set', type: Object })
  async setTariff(
    @Param('id') id: string,
    @Body() body: { tariff: string; expires?: string },
  ) {
    return this.usersService.setTariff(
      id,
      body.tariff,
      body.expires ? new Date(body.expires) : undefined,
    );
  }
}
