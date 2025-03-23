import { Test, TestingModule } from '@nestjs/testing'
import { ValorantMatchService } from './valorant-match.service'

describe('ValorantMatchService', () => {
  let service: ValorantMatchService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValorantMatchService],
    }).compile()

    service = module.get<ValorantMatchService>(ValorantMatchService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
