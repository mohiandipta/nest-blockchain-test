import { Injectable } from "@nestjs/common";
import { Block } from "./block";

@Injectable()
export class BlockchainService {
    private blockchain: Block[] = [this.createGenesisBlock()]

    createGenesisBlock(): Block {
        return new Block(0, Date.now(), 'Genesis Block', '0')
    }

    getBlockchain(): Block[] {
        return this.blockchain
    }

    addBlock(data: string): Block {
        const previousBlock = this.blockchain[this.blockchain.length - 1]
        const newIndex = previousBlock.index + 1
        const newBlock = new Block(
            newIndex,
            Date.now(),
            data,
            previousBlock.hash
        )
        this.blockchain.push(newBlock)

        return newBlock
    }

    getBlockByIndex(index: number): Block[] {
        const result = this.blockchain
        console.log(result)
        return result
    }
}
