import { Block, BlockElement } from "./Block";

export class BlockChain {
    private blocks: Block[];
    constructor() {
        this.blocks = [];
        const genesisBlock = new Block({
            blockNumber: 0,
            previousHash: "0000000000000000000000000000000000000000000000000000000000000000",
        });
        genesisBlock.mining();
        this.blocks.push(genesisBlock);
    }
    public addBlock(data?: string) {
        const blockElement: BlockElement = {
            blockNumber: this.blocks.length,
            previousHash: this.blocks[this.blocks.length - 1].getHash,
            data: data ? data : "",
        };
        const block = new Block(blockElement);
        block.mining();
        this.blocks.push(block);
    }
    public display(): void {
        this.blocks.forEach((block: Block) => {
            block.display();
        });
    }
}

export default BlockChain;
