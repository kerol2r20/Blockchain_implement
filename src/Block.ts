import Promise = require("bluebird");
import crypto = require("crypto");

export class Block {
    private blockNumber: number;
    private previousHash: string;
    private timestamp: Date;
    private data: string;
    private hash: string;
    private nonce: number;
    constructor(blockNumber: number, previousHash: string, data: any = "") {
        this.blockNumber = blockNumber;
        this.previousHash = previousHash;
        this.timestamp = new Date();
        this.data = data;
        this.nonce = 0;
        this.hash = this.doubleSha256();
    }
    public mining(difficult: number = 3): Promise<null> {
        return new Promise((res) => {
            let pat = "";
            for (let i = 0; i < difficult; i++) {
                pat += "0";
            }
            for (let i = 0; i < 64 - difficult; i++) {
                pat += "f";
            }
            let newHash = this.hash;
            while (newHash > pat) {
                this.nonce += 1;
                newHash = this.doubleSha256();
            }
            this.hash = newHash;
            res();
        });
    }
    public doubleSha256(): string {
        const secret = "f30a5884d9d364849d7ba0f64c102785426cbaa866dfd97101c8fdaeff0637cd";
        const firstResult = crypto
            .createHmac("sha256", secret)
            .update(this.serialization())
            .digest("hex");
        const secondResult = crypto
            .createHmac("sha256", secret)
            .update(firstResult)
            .digest("hex");
        return secondResult;
    }
    private serialization(): string {
        const obj = {
            blockNumber: this.blockNumber,
            previousHash: this.previousHash,
            timestamp: this.timestamp.toUTCString(),
            data: this.data,
            nonce: this.nonce,
        };
        return JSON.stringify(obj);
    }
}

export default Block;
