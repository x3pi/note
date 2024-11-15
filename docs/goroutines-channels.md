Tôi sẽ cung cấp 10 ví dụ khác nhau về cách sử dụng Goroutines và Channels trong Go. Tôi sẽ cập nhật file `docs/goroutines-channels.md` với các ví dụ sau:

```markdown:docs/goroutines-channels.md
# Goroutines và Channels trong Go

## 1. Ví dụ cơ bản về Goroutine
```go
func main() {
    go func() {
        fmt.Println("Goroutine đang chạy")
    }()
    time.Sleep(1 * time.Second)
}
```

## 2. Giao tiếp giữa Goroutines qua Channel
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

## 3. Buffer Channel
```go
func main() {
    ch := make(chan int, 2)
    ch <- 1
    ch <- 2
    fmt.Println(<-ch)
    fmt.Println(<-ch)
}
```

## 4. Select với nhiều Channel
```go
func main() {
    ch1 := make(chan string)
    ch2 := make(chan string)

    go func() {
        ch1 <- "Message 1"
    }()
    go func() {
        ch2 <- "Message 2"
    }()

    select {
    case msg1 := <-ch1:
        fmt.Println(msg1)
    case msg2 := <-ch2:
        fmt.Println(msg2)
    }
}
```

## 5. Worker Pool
```go
func worker(id int, jobs <-chan int, results chan<- int) {
    for j := range jobs {
        fmt.Printf("worker %d đang xử lý job %d\n", id, j)
        time.Sleep(time.Second)
        results <- j * 2
    }
}

func main() {
    jobs := make(chan int, 100)
    results := make(chan int, 100)

    // Khởi tạo 3 workers
    for w := 1; w <= 3; w++ {
        go worker(w, jobs, results)
    }

    // Gửi 5 jobs
    for j := 1; j <= 5; j++ {
        jobs <- j
    }
    close(jobs)

    // Thu thập kết quả
    for a := 1; a <= 5; a++ {
        result := <-results
        fmt.Printf("Nhận được kết quả: %d\n", result)
    }
}
```

## 6. Fan-out Fan-in Pattern
```go
func generator(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        for _, n := range nums {
            out <- n
        }
        close(out)
    }()
    return out
}

func square(in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        for n := range in {
            out <- n * n
        }
        close(out)
    }()
    return out
}

func merge(cs ...<-chan int) <-chan int {
    var wg sync.WaitGroup
    out := make(chan int)

    // Hàm gửi dữ liệu từ một channel vào channel out
    output := func(c <-chan int) {
        for n := range c {
            out <- n
        }
        wg.Done()
    }

    wg.Add(len(cs))
    // Khởi chạy goroutine cho mỗi input channel
    for _, c := range cs {
        go output(c)
    }

    // Khởi chạy goroutine để đóng out channel khi tất cả input đã xử lý xong
    go func() {
        wg.Wait()
        close(out)
    }()

    return out
}

func main() {
    in := generator(1, 2, 3, 4)
    ch1 := square(in)
    ch2 := square(in)

    // Merge kết quả từ cả hai channels
    for n := range merge(ch1, ch2) {
        fmt.Println(n)
    }
}
```

## 7. Timeout với Context
```go
func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
    defer cancel()

    ch := make(chan string)
    go func() {
        time.Sleep(3 * time.Second)
        ch <- "Kết quả"
    }()

    select {
    case result := <-ch:
        fmt.Println(result)
    case <-ctx.Done():
        fmt.Println("Timeout!")
    }
}
```

## 8. Pipeline Pattern
```go
func gen(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        for _, n := range nums {
            out <- n
        }
        close(out)
    }()
    return out
}

func sq(in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        for n := range in {
            out <- n * n
        }
        close(out)
    }()
    return out
}

func main() {
    for n := range sq(gen(2, 3)) {
        fmt.Println(n)
    }
}
```

## 9. Rate Limiting
```go
func main() {
    requests := make(chan int, 5)
    limiter := time.Tick(200 * time.Millisecond)

    for req := range requests {
        <-limiter // Đợi mỗi 200ms
        go func(r int) {
            fmt.Printf("Xử lý request %d\n", r)
        }(req)
    }
}
```

## 10. Mutual Exclusion với Channel
```go
type SafeCounter struct {
    mu    chan struct{}
    value int
}

func NewSafeCounter() *SafeCounter {
    counter := &SafeCounter{
        mu: make(chan struct{}, 1),
    }
    counter.mu <- struct{}{} // Initialize mutex
    return counter
}

func (c *SafeCounter) Inc() {
    <-c.mu
    c.value++
    c.mu <- struct{}{}
}

func (c *SafeCounter) Value() int {
    <-c.mu
    value := c.value
    c.mu <- struct{}{}
    return value
}

func main() {
    counter := NewSafeCounter()
    for i := 0; i < 1000; i++ {
        go counter.Inc()
    }
    time.Sleep(time.Second)
    fmt.Println(counter.Value())
}
```

Mỗi ví dụ trên minh họa một cách sử dụng khác nhau của Goroutines và Channels:

1. Goroutine cơ bản
2. Giao tiếp đơn giản qua Channel
3. Buffer Channel
4. Select với nhiều Channel
5. Worker Pool Pattern
6. Fan-out Fan-in Pattern
7. Timeout với Context
8. Pipeline Pattern
9. Rate Limiting
10. Mutual Exclusion sử dụng Channel

Mỗi ví dụ đều có thể chạy độc lập và minh họa các khía cạnh khác nhau của concurrent programming trong Go.