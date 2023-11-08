import { Controller, Get, Post, Body, Req, Res, Param } from '@nestjs/common';
import { Request, Response } from 'express';
import { BlockchainService } from './blockchain.service';
import { CryptoBlock } from './cryptoblock';

@Controller('blockchain')
export class BlockchainController {
    constructor(private readonly blockchainService: BlockchainService) { }

    @Post('get-by-index')
    async getBlockchain(
        // @Req() request: Request,
        // @Res() response: Response
        @Body('index') index: number
    ) {
        try {
            console.log(index)
            return await this.blockchainService.getBlockByIndex(index)
        } catch (error) {
            console.log(error)
        }
    }

    @Post('verify')
    async verifyHash(
        @Body() data: {index: number, hash: string}
    ) {
        try {
            const blockToVerify = await this.blockchainService.getBlockByIndex(data.index)
            const previousBlock = await this.blockchainService.getBlockByIndex(data.index - 1)
            // console.log(blockToVerify)
            // if (blockToVerify) {
            //     const calculatedHash = blockToVerify.calculateHash
            //     console.log(calculatedHash)
            //     return calculatedHash === data.hash
            // }
            return await this.blockchainService.checkChainValidity(blockToVerify, previousBlock)
        } catch (error) {
            console.log(error)
        }
    }

    @Post('add-block')
    addBlock(
        // @Req() request: Request,
        // @Res() response: Response,
        @Body('data') data: string
    ): CryptoBlock {
        try {
            return this.blockchainService.addBlock(data);
        } catch (error) {
            console.log(error)
        }
    }
}
