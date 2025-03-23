import { Test, TestingModule } from '@nestjs/testing'
import { ValorantMatchController } from './valorant-match.controller'

describe('ValorantMatchController', () => {
  let controller: ValorantMatchController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ValorantMatchController],
    }).compile()

    controller = module.get<ValorantMatchController>(ValorantMatchController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
