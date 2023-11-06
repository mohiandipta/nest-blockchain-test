import { Controller, Get, Post, Body, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { BlockchainService } from './blockchain.service';
import { Block } from './block';

@Controller('blockchain')
export class BlockchainController {
    constructor(private readonly blockchainService: BlockchainService) { }

    @Get('/')
    async getBlockchain(
        // @Req() request: Request,
        // @Res() response: Response
    ): Promise<Block[]> {
        try {
            return await this.blockchainService.getBlockchain()
        } catch (error) {
            console.log(error)
        }
    }

    @Post('add-block')
    addBlock(
        // @Req() request: Request,
        // @Res() response: Response,
        @Body('data') data: string
    ): Block {
        try {
            return this.blockchainService.addBlock(data);
        } catch (error) {
            console.log(error)
        }
    }
}
