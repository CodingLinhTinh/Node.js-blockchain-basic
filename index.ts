import * as crypto from 'crypto';

class Transaction{
    constructor(
        //số lượng coin
        public amount: number,
        //public key cho ng mua
        public payer: string,
        //public key to ng nhận
        public payee : string
    ){}

    // chuyển thành str cho dễ quản lý :>
    toString(){
        return JSON.stringify(this);
    }
}
/*
    HASH??
vd:
Input: Fox -> cryptographic(mã crypto) hash func -> Digest: DFCD 3454 BBEA 788A 751A
                                                            696C 24D9 7009 CA99 2D17
*/

class Block{

    public nonce = Math.round(Math.random() * 999999999);

    constructor(
        //móc vào block trước
        //HASH??
        public prevHash: string,
        public transaction: Transaction,
        public ts = Date.now()
    ){}
  
    get hash(){
        const str = JSON.stringify(this);
        const hash = crypto.createHash('SHA256');
        hash.update(str).end();
        return hash.digest('hex');
    }
}

class Chain{
    // Tạo móc nối mới trước khi gọi thành phần khác
    public static instance = new Chain();

    //Khởi tạo chain
    chain : Block[];

    //Satoshi Nakamoto là tên ng tạo ra Bitcoin
    //Genesis Block là tên của khối Bitcoin đầu tiên từng được khai thác, do đó được gọi là “Genesis”. 
    //Khối Genesis tạo thành nền tảng của toàn bộ hệ thống giao dịch Bitcoin và là nguyên mẫu của tất cả các khối khác trong chuỗi khối.
    constructor(){
        this.chain = [ 
            new Block('', new Transaction(100, 'genesis', 'satoshi')) 
        ];
    }

    // móc vào block sau
    get lastBlock(){
        return this.chain[this.chain.length - 1];
    }


    // Proof of work system
    mine(nonce: number){
        let solution = 1;
        console.log('🔨 mining...');

        while(true){
            //Tạo mã theo kiểu MD5
            const hash = crypto.createHash('MD5');
            hash.update((nonce + solution).toString()).end();

            //Chuyển hash thành hex
            const attempt = hash.digest('hex');

            //tìm đến khi tìm được mã 4 số 0000
            if(attempt.substr(0,4) === '0000'){
                console.log(`Solved: ${solution}`);
                return solution;
            }

            solution += 1;
        }
    }

    //thêm block vào Chain nếu valid signature và mining complete 
    addBlock(transaction: Transaction, senderPublicKey: string, signature: Buffer){
        const verify = crypto.createVerify('SHA256');
        verify.update(transaction.toString());
    
        const isValid = verify.verify(senderPublicKey, signature);
    
        if (isValid) {
          const newBlock = new Block(this.lastBlock.hash, transaction);
          this.mine(newBlock.nonce);
          this.chain.push(newBlock);
        }
    }

}
//Wallet đưa cho user một public/private keypair
class Wallet{
    //Nhận tiền key
    public publicKey: string;
    //Mua tiền key
    public privateKey: string;

    constructor(){
        const keypair = crypto.generateKeyPairSync('rsa',
        {
            modulusLength: 2048,
            publicKeyEncoding: { type: 'spki', format: 'pem'},
            privateKeyEncoding: { type: 'pkcs8', format: 'pem'},

        });
        
        this.privateKey = keypair.privateKey;
        this.publicKey = keypair.publicKey;
    }

    sendMoney(amount: number, payeePublicKey: string ){
        const transaction = new Transaction(amount, this.publicKey, payeePublicKey);

        // Tạo one-time password
        const sign = crypto.createSign('SHA256');
        sign.update(transaction.toString()).end();

        const signature = sign.sign(this.privateKey);
        Chain.instance.addBlock(transaction, this.publicKey, signature);
    }

}

//example usage

const ngoc = new Wallet();
const mama = new Wallet();
const papa = new Wallet();

ngoc.sendMoney(50, mama.publicKey);
mama.sendMoney(23, papa.publicKey);
papa.sendMoney(5, mama.publicKey);

console.log(Chain.instance);