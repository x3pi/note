Tôi sẽ cung cấp một số ví dụ nâng cao về Golang. Đây là nội dung đề xuất để thêm vào file `docs/go.md`:

```markdown:docs/go.md
# Ví dụ nâng cao Golang

## 1. Goroutines và Channels

```go
func main() {
    ch := make(chan string)
    
    go func() {
        ch <- "Xin chào từ goroutine!"
    }()
    
    msg := <-ch
    fmt.Println(msg)
}
```

## 2. Xử lý đồng thời với WaitGroup

```go
func main() {
    var wg sync.WaitGroup
    
    for i := 0; i < 3; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            fmt.Printf("Goroutine %d đang chạy\n", id)
        }(i)
    }
    
    wg.Wait()
}
```

## 3. Interface và Đa hình

```go
type Hình interface {
    Diện_tích() float64
}

type HìnhVuông struct {
    cạnh float64
}

func (h HìnhVuông) Diện_tích() float64 {
    return h.cạnh * h.cạnh
}

type HìnhTròn struct {
    bán_kính float64
}

func (h HìnhTròn) Diện_tích() float64 {
    return math.Pi * h.bán_kính * h.bán_kính
}
```

## 4. Xử lý lỗi tùy chỉnh

```go
type LỗiTùyChỉnh struct {
    Mã     int
    Thông_báo string
}

func (e *LỗiTùyChỉnh) Error() string {
    return fmt.Sprintf("Lỗi %d: %s", e.Mã, e.Thông_báo)
}

func hàm_có_thể_lỗi() error {
    return &LỗiTùyChỉnh{
        Mã:     404,
        Thông_báo: "Không tìm thấy",
    }
}
```

## 5. Context trong Go

```go
func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
    defer cancel()

    go func() {
        select {
        case <-ctx.Done():
            fmt.Println("Hết thời gian chờ")
        }
    }()

    time.Sleep(3 * time.Second)
}
```

Mỗi ví dụ trên minh họa một khía cạnh nâng cao của Go:
1. Goroutines và channels cho lập trình đồng thời
2. WaitGroup để đồng bộ hóa goroutines
3. Interface và tính đa hình
4. Xử lý lỗi tùy chỉnh
5. Sử dụng context để quản lý thời gian chờ và hủy bỏ

```

Những ví dụ này sẽ giúp người đọc hiểu rõ hơn về các tính năng nâng cao của Golang. Mỗi ví dụ đều có chú thích và giải thích rõ ràng bằng tiếng Việt.