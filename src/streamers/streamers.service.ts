import { Injectable } from '@nestjs/common'

import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { Streamer } from '@src/streamers/streamer.entity'
import { CreateStreamerDto } from '@src/streamers/dtos/create-streamer.dto'

import { NotFoundException } from '@nestjs/common'

@Injectable()
export class StreamersService {
  constructor(@InjectRepository(Streamer) private repo: Repository<Streamer>) {}

  findStreamerById(streamerId: number) {
    if (!streamerId) {
      return null
    }

    return this.repo.findOneBy({ streamerId })
  }

  create(body: CreateStreamerDto) {
    const streamer = this.repo.create(body)

    return this.repo.save(streamer)
  }

  async update(streamerId: number, attrs: Partial<Streamer>) {
    const streamer = await this.findStreamerById(streamerId)

    if (!streamer) {
      throw new NotFoundException('streamer not found')
    }

    Object.assign(streamer, attrs)

    return this.repo.save(streamer)
  }

  async remove(streamerId: number) {
    const streamer = await this.findStreamerById(streamerId)

    if (!streamer) {
      throw new NotFoundException('streamer not found')
    }

    return this.repo.remove(streamer)
  }
}
