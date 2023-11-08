import { Injectable } from "@nestjs/common";
import { CryptoBlock } from "./cryptoblock";

@Injectable()
export class BlockchainService {
    blockchain: CryptoBlock[];
    difficulty: number;

    constructor() {
        this.blockchain = [this.startGenesisBlock()]
        this.difficulty = 4
    }

    startGenesisBlock(): CryptoBlock {
        return new CryptoBlock(0, Date.now(), "Genesis Block", "0")
    }

    obtainLatestBlock(): CryptoBlock {
        return this.blockchain[this.blockchain.length - 1]
    }

    addNewBlock(newBlock: CryptoBlock) {
        newBlock.previousBlock = this.obtainLatestBlock().hash
        newBlock.proofOfWork(this.difficulty)
        this.blockchain.push(newBlock)
    }

    checkChainValidity(curentBlock, previusBlock) {
        for (let i = 0; i < this.blockchain.length; i++) {
            const currentBlock = this.blockchain[i]
            const previousBlock = this.blockchain[i - 1]

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false
            }
            if (currentBlock.previousHash !== previousBlock.hash)
                return false
        }
        return true
    }

    // getBlockchain(): Block[] {
    //     return this.blockchain
    // }

    addBlock(data: string): CryptoBlock {
        const previousBlock = this.blockchain[this.blockchain.length - 1]
        const newIndex = previousBlock.index + 1
        const newBlock = new CryptoBlock(
            newIndex,
            Date.now(),
            data,
            previousBlock.hash
        )
        this.blockchain.push(newBlock)

        return newBlock
    }

    getBlockByIndex(index: number) {
        const result = this.blockchain.find((block) => block.index === index)
        // if (result === undefined) {
        //     return "not found!"
        // }
        return result
    }
}
