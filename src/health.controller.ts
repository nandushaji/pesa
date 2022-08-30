import {
    Controller,
    Get,
} from "@nestjs/common";

@Controller("/health")
export class HealthController {
    constructor(
    ) {}
    @Get("/")
    async getHealth(): Promise<any> {
        return {
            status:"Kollam Poli Sadanam!"
        }
    }
}
