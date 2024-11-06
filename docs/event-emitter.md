# Event Emitter trong Node.js

## Giới thiệu
Event Emitter là một trong những core pattern quan trọng trong Node.js, cho phép xử lý các sự kiện bất đồng bộ thông qua cơ chế publish/subscribe.

## Cách sử dụng cơ bản

### 1. Khởi tạo Event Emitter
```javascript
const EventEmitter = require('events');
const myEmitter = new EventEmitter();
```

### 2. Đăng ký lắng nghe sự kiện (Subscribe)
```javascript
// Lắng nghe một lần
myEmitter.once('event', (data) => {
  console.log('Sự kiện xảy ra một lần:', data);
});

// Lắng nghe nhiều lần
myEmitter.on('event', (data) => {
  console.log('Sự kiện xảy ra:', data);
});
```

### 3. Phát sự kiện (Emit)
```javascript
myEmitter.emit('event', { message: 'Hello World' });
```

## Các phương thức quan trọng

1. `on(eventName, listener)`: Đăng ký lắng nghe sự kiện
2. `once(eventName, listener)`: Đăng ký lắng nghe sự kiện một lần
3. `emit(eventName, [...args])`: Phát sự kiện
4. `removeListener(eventName, listener)`: Gỡ bỏ listener
5. `removeAllListeners([eventName])`: Gỡ bỏ tất cả listeners

## Ví dụ thực tế

```javascript
const EventEmitter = require('events');

class MyApp extends EventEmitter {
  constructor() {
    super();
    this.init();
  }

  init() {
    // Đăng ký sự kiện
    this.on('start', () => {
      console.log('Ứng dụng bắt đầu');
    });

    this.on('data', (data) => {
      console.log('Nhận dữ liệu:', data);
    });

    this.on('end', () => {
      console.log('Ứng dụng kết thúc');
    });
  }

  start() {
    this.emit('start');
    this.emit('data', { type: 'user', id: 1 });
    this.emit('end');
  }
}

const app = new MyApp();
app.start();
```

## Một số lưu ý quan trọng

1. Event Emitter hoạt động theo cơ chế bất đồng bộ
2. Thứ tự thực thi listeners theo thứ tự đăng ký
3. Có thể đặt giới hạn số lượng listeners bằng `setMaxListeners(n)`
4. Xử lý lỗi với sự kiện đặc biệt 'error'

## Xử lý lỗi
```javascript
myEmitter.on('error', (err) => {
  console.error('Có lỗi xảy ra:', err);
});
```

## Best Practices

1. Luôn xử lý sự kiện 'error'
2. Gỡ bỏ listeners khi không cần thiết
3. Sử dụng `once()` cho các sự kiện chỉ cần xử lý một lần
4. Đặt tên sự kiện rõ ràng và có ý nghĩa

## Ví dụ về gỡ bỏ listeners

```javascript
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

// Định nghĩa các hàm xử lý sự kiện
const handler1 = (data) => {
  console.log('Handler 1:', data);
};

const handler2 = (data) => {
  console.log('Handler 2:', data);
};

// Đăng ký các listeners
myEmitter.on('event', handler1);
myEmitter.on('event', handler2);

// Phát sự kiện - cả hai handlers sẽ được gọi
myEmitter.emit('event', 'Test 1'); 

// Gỡ bỏ handler1
myEmitter.removeListener('event', handler1);

// Phát sự kiện - chỉ handler2 được gọi
myEmitter.emit('event', 'Test 2');

// Gỡ bỏ tất cả listeners của sự kiện 'event'
myEmitter.removeAllListeners('event');

// Phát sự kiện - không có handler nào được gọi
myEmitter.emit('event', 'Test 3');

// Ví dụ với nhiều loại sự kiện
myEmitter.on('event1', () => console.log('Event 1'));
myEmitter.on('event2', () => console.log('Event 2'));

// Gỡ bỏ tất cả listeners của mọi sự kiện
myEmitter.removeAllListeners();
```

### Kết quả chạy code:
```
Handler 1: Test 1
Handler 2: Test 1
Handler 2: Test 2
```

### Lưu ý khi gỡ bỏ listeners:
- `removeListener()` chỉ gỡ bỏ một listener cụ thể
- `removeAllListeners()` không có tham số sẽ gỡ bỏ tất cả listeners của mọi sự kiện
- `removeAllListeners('eventName')` chỉ gỡ bỏ tất cả listeners của sự kiện được chỉ định
- Cần lưu trữ reference đến handler function để có thể gỡ bỏ chính xác listener
```