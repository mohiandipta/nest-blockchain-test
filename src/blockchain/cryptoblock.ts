import { SHA256 } from 'crypto-js'
import { BlockType } from 'src/types/blockType'

export class CryptoBlock {
    index: number;
    timestamp: number;
    data: string;
    previousHash: string;
    hash: string;
    nonce: number;
    previousBlock: string;

    constructor (
        index,
        timestamp,
        data,
        previousHash = ""
    ){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0
    }

    calculateHash(): string {
        return SHA256(
            this.index 
            + this.timestamp 
            + JSON.stringify(this.data) 
            // + this.previousHash
            + this.nonce
        ).toString();
    }

    proofOfWork(difficulty) {
        while (
            this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
        ) {
            this.nonce++
            this.hash = this.calculateHash()
        }
    }
}
