Mẫu sử dụng Stream phổ biến trong Node.js:

```javascript
// 1. Đọc file sử dụng Readable Stream
const fs = require('fs');

// Tạo một readable stream để đọc file
// Stream sẽ đọc file theo từng chunk (phần) thay vì đọc toàn bộ vào bộ nhớ
const readStream = fs.createReadStream('input.txt');

// Sự kiện 'data' được kích hoạt mỗi khi đọc được một chunk dữ liệu
readStream.on('data', (chunk) => {
  console.log('Đọc dữ liệu:', chunk.toString());
});

// Sự kiện 'end' được kích hoạt khi đã đọc hết file
readStream.on('end', () => {
  console.log('Đã đọc xong file');
});
```

```javascript
// 2. Ghi file sử dụng Writable Stream
// Tạo writable stream để ghi file, nếu file chưa tồn tại sẽ tự động tạo mới
const writeStream = fs.createWriteStream('output.txt');

// Ghi dữ liệu vào stream, mỗi write() là một thao tác ghi
writeStream.write('Dòng 1\n');
writeStream.write('Dòng 2\n');

// Kết thúc stream, đảm bảo tất cả dữ liệu được ghi xong
writeStream.end();
```

```javascript
// 3. Pipe - Chuyển dữ liệu từ Readable sang Writable
// pipe() tự động xử lý việc đọc từ readStream và ghi vào writeStream
// Tự động xử lý backpressure khi writeStream không kịp xử lý
const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('output.txt');
readStream.pipe(writeStream);
```

```javascript
// 4. Transform Stream - Biến đổi dữ liệu
const { Transform } = require('stream');

// Tạo transform stream để chuyển đổi dữ liệu thành chữ hoa
// transform() được gọi cho mỗi chunk dữ liệu đi qua stream
const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    // Chuyển chunk thành string và uppercase trước khi đẩy tiếp
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

// Kết nối các stream lại với nhau: đọc -> transform -> ghi
readStream.pipe(upperCaseTransform).pipe(writeStream);
```

```javascript
// 5. Duplex Stream - Stream 2 chiều
// Duplex stream cho phép vừa đọc vừa ghi trên cùng một stream
const { Duplex } = require('stream');

const duplexStream = new Duplex({
  read(size) {
    // Được gọi khi cần đọc dữ liệu từ stream
  },
  write(chunk, encoding, callback) {
    // Được gọi khi có dữ liệu được ghi vào stream
    callback();
  }
});
```

```javascript
// 6. Stream với HTTP
// Sử dụng stream để phục vụ file lớn qua HTTP
// Không cần đọc toàn bộ file vào bộ nhớ
const http = require('http');
const server = http.createServer((req, res) => {
  const fileStream = fs.createReadStream('large-file.txt');
  fileStream.pipe(res);
});
```

```javascript
// 7. Xử lý lỗi trong Stream
// Luôn xử lý sự kiện error để tránh crash ứng dụng
readStream.on('error', (error) => {
  console.error('Lỗi:', error);
});

writeStream.on('error', (error) => {
  console.error('Lỗi:', error);
});
```

```javascript
// 8. Sử dụng Stream.finished()
// finished() là utility để xử lý khi stream kết thúc hoặc gặp lỗi
const { finished } = require('stream');
const readStream = fs.createReadStream('input.txt');

finished(readStream, (err) => {
  if (err) {
    console.error('Lỗi:', err);
  } else {
    console.log('Stream đã hoàn thành');
  }
});
```

Stream trong Node.js rất hữu ích khi xử lý dữ liệu lớn vì nó:
- Tiết kiệm bộ nhớ
- Xử lý dữ liệu theo từng phần nhỏ
- Có thể bắt đầu xử lý ngay khi có dữ liệu đầu tiên
- Dễ dàng kết hợp với các stream khác thông qua pipe()