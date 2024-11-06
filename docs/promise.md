Các ví dụ về cách sử dụng Promise trong Node.js:

```javascript
// 1. Ví dụ cơ bản về Promise
// Minh họa cách tạo và sử dụng Promise đơn giản với resolve và reject
const simplePromise = new Promise((resolve, reject) => {
  // Xử lý bất đồng bộ
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve("Thành công!");
    } else {
      reject("Thất bại!");
    }
  }, 1000);
});

simplePromise
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

```javascript
// 2. Promise chain (chuỗi Promise)
// Thể hiện cách kết nối nhiều Promise thành một chuỗi xử lý tuần tự
function step1() {
  return new Promise(resolve => {
    setTimeout(() => resolve('Bước 1 hoàn thành'), 1000);
  });
}

function step2(message) {
  return new Promise(resolve => {
    setTimeout(() => resolve(message + ' -> Bước 2 hoàn thành'), 1000);
  });
}

step1()
  .then(result => step2(result))
  .then(finalResult => console.log(finalResult));
```

```javascript
// 3. Promise.all() - chạy nhiều Promise song song
// Cho phép thực thi nhiều Promise đồng thời và đợi tất cả hoàn thành
const promise1 = Promise.resolve(3);
const promise2 = new Promise(resolve => setTimeout(() => resolve('foo'), 2000));
const promise3 = Promise.resolve(42);

Promise.all([promise1, promise2, promise3])
  .then(values => console.log(values)); // [3, "foo", 42]
```

```javascript
// 4. Promise với async/await
// Minh họa cú pháp async/await giúp code bất đồng bộ trở nên dễ đọc hơn
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Lỗi:', error);
  }
}
```

```javascript
// 5. Promise.race() - lấy kết quả của Promise nhanh nhất
// Trả về kết quả của Promise đầu tiên hoàn thành trong một mảng các Promise
const promise1 = new Promise(resolve => setTimeout(() => resolve('một'), 1000));
const promise2 = new Promise(resolve => setTimeout(() => resolve('hai'), 2000));

Promise.race([promise1, promise2])
  .then(result => console.log(result)); // 'một'
```

```javascript
// 6. Xử lý lỗi với Promise
// Thể hiện cách xử lý lỗi trong Promise sử dụng reject và catch
function divideNumbers(a, b) {
  return new Promise((resolve, reject) => {
    if (b === 0) {
      reject(new Error('Không thể chia cho 0'));
    } else {
      resolve(a / b);
    }
  });
}

divideNumbers(10, 2)
  .then(result => console.log('Kết quả:', result))
  .catch(error => console.error('Lỗi:', error.message));
```

```javascript
// 7. Promise.allSettled() - đợi tất cả Promise hoàn thành
// Trả về kết quả của tất cả Promise bất kể thành công hay thất bại
const promises = [
  Promise.resolve(1),
  Promise.reject('error'),
  Promise.resolve(3)
];

Promise.allSettled(promises)
  .then(results => {
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        console.log('Thành công:', result.value);
      } else {
        console.log('Thất bại:', result.reason);
      }
    });
  });
```

```javascript
// 8. Promise.any() - trả về Promise đầu tiên thành công
// Trả về Promise đầu tiên được fulfilled, bỏ qua các Promise bị rejected
const promises = [
  Promise.reject('Error 1'),
  Promise.resolve('Success 1'),
  Promise.resolve('Success 2')
];

Promise.any(promises)
  .then(result => console.log(result))  // 'Success 1'
  .catch(errors => console.log(errors)); 
```

```javascript
// 9. Promisify callback function
// Chuyển đổi hàm callback-style thành Promise-style sử dụng util.promisify
const fs = require('fs');
const util = require('util');

// Chuyển đổi callback thành promise
const readFilePromise = util.promisify(fs.readFile);

async function readFile() {
  try {
    const data = await readFilePromise('file.txt', 'utf8');
    console.log(data);
  } catch (error) {
    console.error('Lỗi đọc file:', error);
  }
}
```

```javascript
// 10. Promise với timeout
// Thêm giới hạn thời gian cho Promise sử dụng Promise.race
function promiseWithTimeout(promise, timeout) {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Timeout!')), timeout);
  });
  
  return Promise.race([promise, timeoutPromise]);
}

// Sử dụng
const slowOperation = new Promise(resolve => setTimeout(() => resolve('Done'), 5000));
promiseWithTimeout(slowOperation, 3000)
  .then(result => console.log(result))
  .catch(error => console.log(error.message)); // 'Timeout!'
```

```javascript
// 11. Promise retry mechanism
// Cơ chế tự động thử lại khi Promise thất bại
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      if (i === retries - 1) throw error;
      console.log(`Lần thử ${i + 1} thất bại, đang thử lại...`);
      // Đợi 1 giây trước khi thử lại
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}
```

```javascript
// 12. Promise pool - giới hạn số lượng Promise chạy đồng thời
// Kiểm soát số lượng Promise được thực thi cùng một lúc
async function promisePool(tasks, poolLimit) {
  const results = [];
  const executing = new Set();

  for (const task of tasks) {
    const promise = Promise.resolve().then(() => task());
    results.push(promise);
    
    executing.add(promise);
    const clean = () => executing.delete(promise);
    promise.then(clean).catch(clean);

    if (executing.size >= poolLimit) {
      await Promise.race(executing);
    }
  }

  return Promise.all(results);
}

// Sử dụng
const tasks = [
  () => new Promise(resolve => setTimeout(() => resolve(1), 1000)),
  () => new Promise(resolve => setTimeout(() => resolve(2), 2000)),
  () => new Promise(resolve => setTimeout(() => resolve(3), 1000))
];

promisePool(tasks, 2)
  .then(results => console.log(results));
```

