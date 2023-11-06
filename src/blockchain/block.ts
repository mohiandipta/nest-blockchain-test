import { SHA256 } from 'crypto-js'
import { BlockType } from 'src/types/blockType'

export class Block {
    index: number;
    timestamp: number;
    data: string;
    previousHash: string;
    hash: string;

    constructor (
        index: number,
        timestamp: number,
        data: string,
        previousHash: string
    ){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(): string {
        return SHA256(
            this.index 
            + this.timestamp 
            + this.data 
            + this.previousHash
        ).toString();
    }
}
