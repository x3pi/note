# Các Kỹ Thuật Caching với Redis

## 1. Cache-Aside (Lazy Loading)
- Đọc dữ liệu từ cache trước
- Nếu cache miss, đọc từ database và cập nhật vào cache
- Phù hợp cho dữ liệu đọc nhiều, ít thay đổi
- Ưu điểm: Chỉ cache dữ liệu cần thiết
- Nhược điểm: Độ trễ khi cache miss

## 2. Write-Through
- Cập nhật đồng thời cả cache và database
- Đảm bảo tính nhất quán cao
- Phù hợp cho dữ liệu quan trọng cần độ chính xác cao
- Ưu điểm: Dữ liệu luôn đồng bộ
- Nhược điểm: Độ trễ khi ghi

## 3. Write-Behind (Write-Back)
- Cập nhật cache trước, sau đó mới cập nhật database
- Tăng hiệu năng ghi
- Phù hợp cho dữ liệu có tần suất ghi cao
- Ưu điểm: Hiệu năng ghi tốt
- Nhược điểm: Rủi ro mất dữ liệu

## 4. Time-Based Invalidation
- Cache tự động hết hạn sau một thời gian
- Sử dụng TTL (Time To Live)
- Phù hợp cho dữ liệu tạm thời
- Ưu điểm: Tự động làm sạch cache
- Nhược điểm: Có thể cache miss nếu TTL quá ngắn

## 5. Event-Based Invalidation
- Cache được cập nhật/xóa khi có sự kiện
- Phù hợp cho dữ liệu thay đổi theo sự kiện
- Ưu điểm: Cache luôn cập nhật
- Nhược điểm: Phức tạp trong triển khai

## Các Lưu Ý Quan Trọng
1. Chọn chiến lược phù hợp với use case
2. Xử lý cache stampede
3. Monitoring cache hit/miss ratio
4. Quản lý dung lượng cache
5. Xử lý lỗi khi Redis không khả dụng

## Ví Dụ Thực Tế

### 1. Cache-Aside
- **Ứng dụng**: Hiển thị thông tin sản phẩm trên e-commerce
- **Chi tiết**: 
  - Cache thông tin sản phẩm (tên, giá, mô tả)
  - TTL: 1 giờ
  - Khi user xem sản phẩm, kiểm tra cache trước, nếu miss thì query DB

### 2. Write-Through
- **Ứng dụng**: Hệ thống đặt vé máy bay
- **Chi tiết**:
  - Cache số ghế còn trống
  - Mỗi khi có đặt vé, cập nhật đồng thời vào cache và DB
  - Đảm bảo không bị oversell

### 3. Write-Behind
- **Ứng dụng**: Hệ thống log analytics
- **Chi tiết**:
  - Cache các event log
  - Ghi nhanh vào cache
  - Định kỳ (5-10 phút) đồng bộ vào DB
  - Phù hợp với high-write workload

### 4. Time-Based Invalidation
- **Ứng dụng**: Cache kết quả trang chủ tin tức
- **Chi tiết**:
  - Cache HTML của trang chủ
  - TTL: 5 phút
  - Giảm tải DB trong giờ cao điểm
  - Chấp nhận dữ liệu có độ trễ tối đa 5 phút

### 5. Event-Based Invalidation
- **Ứng dụng**: Hệ thống real-time chat
- **Chi tiết**:
  - Cache danh sách tin nhắn gần nhất
  - Khi có tin nhắn mới, invalidate cache của người nhận
  - Đảm bảo người dùng luôn thấy tin nhắn mới nhất



## Code Examples


### Redis hashes

Redis hashes là cấu trúc dữ liệu lưu trữ các cặp field-value, phù hợp để lưu trữ đối tượng. Dưới đây là ví dụ sử dụng Redis hashes với Node.js:

```javascript
const Redis = require('ioredis');
const redis = new Redis();

// Ví dụ 1: Lưu trữ thông tin user
async function userExample() {
    // Lưu thông tin user
    await redis.hset('user:1000', {
        'username': 'johndoe',
        'email': 'john@example.com',
        'age': '30'
    });

    // Đọc toàn bộ thông tin user
    const user = await redis.hgetall('user:1000');
    console.log('User info:', user);

    // Đọc một field cụ thể
    const email = await redis.hget('user:1000', 'email');
    console.log('Email:', email);
}

// Ví dụ 2: Quản lý giỏ hàng
async function cartExample() {
    // Thêm sản phẩm vào giỏ hàng
    await redis.hset('cart:user:1000', {
        'product:1': '2',  // 2 sản phẩm
        'product:2': '1',  // 1 sản phẩm
        'product:3': '3'   // 3 sản phẩm
    });

    // Cập nhật số lượng sản phẩm
    await redis.hincrby('cart:user:1000', 'product:1', 1);

    // Kiểm tra sản phẩm tồn tại
    const exists = await redis.hexists('cart:user:1000', 'product:1');

    // Xóa sản phẩm khỏi giỏ hàng
    await redis.hdel('cart:user:1000', 'product:2');

    // Lấy số lượng sản phẩm
    const productCount = await redis.hlen('cart:user:1000');
}

// Ví dụ 3: Cache với TTL
async function cacheExample() {
    // Lưu cache với TTL
    await redis.hset('cache:products', {
        'product:1': JSON.stringify({name: 'Laptop', price: 1000}),
        'product:2': JSON.stringify({name: 'Phone', price: 500})
    });
    await redis.expire('cache:products', 3600); // TTL 1 giờ

    // Đọc và parse dữ liệu
    const product = JSON.parse(await redis.hget('cache:products', 'product:1'));
}
```

Các lệnh Redis hash phổ biến:
- `HSET`: Lưu trữ field-value
- `HGET`: Lấy giá trị của field
- `HGETALL`: Lấy tất cả field-value
- `HDEL`: Xóa field
- `HEXISTS`: Kiểm tra field tồn tại
- `HINCRBY`: Tăng giá trị số
- `HLEN`: Đếm số field

Ưu điểm của Redis hashes:
1. Tiết kiệm bộ nhớ hơn so với lưu nhiều key riêng lẻ
2. Atomic operations cho nhiều field
3. Phù hợp để lưu trữ đối tượng có nhiều thuộc tính
4. Dễ dàng cập nhật từng field mà không ảnh hưởng field khác

Tôi đã thêm 3 ví dụ thực tế về cách sử dụng Redis hashes trong Node.js:
1. Lưu trữ thông tin user
2. Quản lý giỏ hàng
3. Cache với TTL


### Redis Pub/Sub

Redis Pub/Sub là mô hình messaging cho phép gửi và nhận messages theo kênh. Dưới đây là ví dụ sử dụng Redis Pub/Sub với Node.js:

```javascript
const Redis = require('ioredis');

// Tạo các kết nối riêng biệt cho publisher và subscriber
const publisher = new Redis();
const subscriber = new Redis();

// Ví dụ 1: Chat room đơn giản
async function chatRoomExample() {
    // Subscribe vào kênh chat
    subscriber.subscribe('chatroom', (err, count) => {
        if (err) console.error('Failed to subscribe:', err.message);
        console.log(`Subscribed to ${count} channels`);
    });

    // Lắng nghe tin nhắn
    subscriber.on('message', (channel, message) => {
        console.log(`Received message from ${channel}: ${message}`);
    });

    // Gửi tin nhắn
    await publisher.publish('chatroom', JSON.stringify({
        user: 'John',
        message: 'Hello everyone!'
    }));
}

// Ví dụ 2: Realtime notifications
async function notificationExample() {
    // Subscribe nhiều kênh với pattern
    subscriber.psubscribe('notification:*', (err, count) => {
        if (err) console.error('Failed to subscribe:', err.message);
        console.log(`Subscribed to ${count} patterns`);
    });

    // Xử lý tin nhắn theo pattern
    subscriber.on('pmessage', (pattern, channel, message) => {
        const userId = channel.split(':')[1];
        console.log(`Notification for user ${userId}:`, message);
    });

    // Gửi thông báo cho user cụ thể
    await publisher.publish('notification:1000', JSON.stringify({
        type: 'friend_request',
        from: 'user_2000',
        timestamp: Date.now()
    }));
}

// Ví dụ 3: Event-driven cache invalidation
async function cacheInvalidationExample() {
    // Subscribe kênh cache invalidation
    subscriber.subscribe('cache:invalidate', (err, count) => {
        if (err) console.error('Failed to subscribe:', err.message);
    });

    // Xử lý cache invalidation
    subscriber.on('message', async (channel, message) => {
        if (channel === 'cache:invalidate') {
            const data = JSON.parse(message);
            switch (data.type) {
                case 'product':
                    await invalidateProductCache(data.id);
                    break;
                case 'user':
                    await invalidateUserCache(data.id);
                    break;
            }
        }
    });

    // Trigger cache invalidation
    await publisher.publish('cache:invalidate', JSON.stringify({
        type: 'product',
        id: '12345',
        reason: 'price_updated'
    }));
}

// Hàm cleanup khi đóng ứng dụng
function cleanup() {
    subscriber.quit();
    publisher.quit();
}

// Xử lý lỗi kết nối
subscriber.on('error', (err) => console.error('Subscriber Error:', err));
publisher.on('error', (err) => console.error('Publisher Error:', err));
```

Các lệnh Redis Pub/Sub phổ biến:
- `SUBSCRIBE`: Đăng ký nhận tin nhắn từ các kênh
- `PSUBSCRIBE`: Đăng ký nhận tin nhắn theo pattern
- `PUBLISH`: Gửi tin nhắn đến một kênh
- `UNSUBSCRIBE`: Hủy đăng ký kênh
- `PUNSUBSCRIBE`: Hủy đăng ký pattern

Ưu điểm của Redis Pub/Sub:
1. Realtime messaging với độ trễ thấp
2. Dễ dàng scale với nhiều subscribers
3. Hỗ trợ pattern matching cho kênh
4. Phù hợp cho các ứng dụng event-driven

Lưu ý khi sử dụng:
1. Messages không được persist, chỉ gửi cho các subscribers đang active
2. Không có message queue, subscribers offline sẽ không nhận được tin nhắn cũ
3. Nên tạo kết nối Redis riêng cho Pub/Sub
4. Xử lý reconnect khi mất kết nối
5. Cân nhắc sử dụng Redis Streams cho use-case cần message persistence

Tôi đã thêm 3 ví dụ thực tế về cách sử dụng Redis Pub/Sub trong Node.js:
1. Chat room đơn giản
2. Realtime notifications với pattern matching
3. Event-driven cache invalidation



