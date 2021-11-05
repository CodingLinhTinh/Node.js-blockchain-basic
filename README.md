# BlockChain Basic with Node.js, TypeScript
Một mô hình BlockChain đơn giản.

## Description

Tạo ra một loại tiền ảo và mô hình cơ bản về Block chain để hiểu rõ cách hoạt động của các loại tiền ảo.

Áp dụng các thuật toán: Encryption & Signing, Hashing Func, SHA256 & RSA & MD5,...

## Getting Started
### Dependencies

* Sử dụng Visual studio code đã có sẵn Node.js version 12+

### Installing

* Node.js download
```
https://nodejs.org/en/download/
```
### Executing program
* Tạo một project Node.js mới trong thư mục rỗng nào đó.
```
npm init -y
```

* Cài Typescript vào thư mục
```
npm install -D typescript @types/node
```


## Help

### Cryptography Algorithms
#### Một ví dụ về Cryptography:
1.Client (ví dụ: trình duyệt) gửi khóa công khai(public key) của nó đến Server và yêu cầu một số dữ liệu.

2.Server mã hóa dữ liệu bằng khóa công khai của Client và gửi dữ liệu đã mã hóa.

3.Client nhận dữ liệu này và giải mã nó.

#### Một số Cryptography được dùng project này
* thuật toán RSA 
RSA gồm 2 khóa public key và private key.
Cách tạo:
    * Public key
    ```
        * Chọn hai số nguyên tố. Giả sử P = 53 và Q = 59.
        Bây giờ Phần đầu tiên của Khóa công khai: 
                    n = P * Q = 3127.
        * Chúng ta cũng cần một số mũ nhỏ nói e:
        Nhưng e Phải là một số nguyên, không phải là một thừa số của n. 1 < e <Φ (n) [Φ (n) được thảo luận bên dưới],

        * Bây giờ chúng ta hãy coi nó bằng 3.

        =>Khóa công khai của chúng ta được làm bằng n và e
    ```
        
   * Private Key
   ```
    * Chúng ta cần tính Φ (n):
    Sao cho Φ (n) = (P-1) (Q-1)
        vì vậy, Φ (n) = 3016
        
    * Bây giờ hãy tính Private Key, d:
        d = (k * Φ (n) + 1) / e với một số nguyên k
            Với k = 2, giá trị của d là 2011.
   ```
    
 * Minh họa bằng Python
   ```
        import math

        message = int(input("Enter the message to be encrypted: ")) 

        p = 52
        q = 59
        e = 3

        n = p*q

        def encrypt(me):
            en = math.pow(me,e)
            c = en % n
            print("Encrypted Message is: ", c)
            return c

        print("Original Message is: ", message)
        c = encrypt(message)
   ```
    
    Output
    ```
    Enter the message to be encrypted: 
    20
    Original Message is:  20
    Encrypted Message is:  1864.0
    ```

* Thuật toán SHA256
   * Chi tiết về SHA256
        ```
        https://www.simplilearn.com/tutorials/cyber-security-tutorial/sha-256-algorithm#what_is_hashing
        ```
   * Hiểu đơn giản: là Mã chỉ có thể encrypt nhưng không thể decrypt( một chiều ).

   * Mô tả bằng Python
        ```
        import hashlib
        string="ngoc"
        encoded=string.encode()
        result = hashlib.sha256(encoded)
        print("String : ", end ="")
        print(string)
        print("Hash Value : ", end ="")
        print(result)
        print("Hexadecimal equivalent: ",result.hexdigest())
        print("Digest Size : ", end ="")
        print(result.digest_size)
        print("Block Size : ", end ="")
        print(result.block_size)
        ```
        Output
        ```
        String : ngoc
        Hash Value : < sha256 HASH object @ 0x7fd1a92339b0 >
        Hexadecimal equivalent:  50d061c94e022e2d54342b43fead2a1909f051d13adf258e4b74624018218fb7
        Digest Size : 32
        Block Size : 64
        ```

## Authors

CodingLinhTinh 
[Gmail](ngocquachgamedevz@gmail.com)


## License

This project is licensed under the ISC License.

## See my other repos
Update later...
