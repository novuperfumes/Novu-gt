import { Test, TestingModule } from '@nestjs/testing';
import { SalesReportsController } from './sales-reports.controller';

describe('SalesReportsController', () => {
  let controller: SalesReportsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalesReportsController],
    }).compile();

    controller = module.get<SalesReportsController>(SalesReportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
