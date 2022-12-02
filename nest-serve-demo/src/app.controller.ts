import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import CustomResponse from './utils/response';

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		private readonly customResponse: CustomResponse,
	) { }

	@Get()
	public getHello(): string {
		return this.appService.getHello();
	}

	@Post("/post")
	public postSubmit(@Body() createCatDto: any) {
		return createCatDto
	}

	@Get("/json")
	public getJson(): object {
		return this.customResponse.success({
			"cashierId": 1,
			"shiftTime": 8,
			"dailyMax": 100,
			"rebateTypes": ["money", "time"],
			"rebateValue": [
				{
					"type": "time",
					"value": [1800, 3600, 7200]

				},
				{
					"type": "money",
					"value": [50, 100, 200, 500, 1000]
				}
			]
		})
	}
}
