Tôi sẽ đưa ra một số câu hỏi nâng cao về cấu trúc dữ liệu mảng và cung cấp câu trả lời chi tiết:

### 1. Câu hỏi: Làm thế nào để xoay một mảng 2 chiều 90 độ theo chiều kim đồng hồ mà không sử dụng mảng phụ?

**Trả lời:**
```javascript
function rotateMatrix(matrix) {
    const n = matrix.length;
    // Chuyển vị ma trận
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }
    
    // Đảo ngược từng hàng
    for (let i = 0; i < n; i++) {
        matrix[i].reverse();
    }
}
```

Độ phức tạp: O(n^2)

### 2. Câu hỏi: Tìm số xuất hiện nhiều hơn n/2 lần trong mảng có n phần tử (Moore's Voting Algorithm)?

**Trả lời:**
```javascript
function findMajorityElement(arr) {
    let candidate = arr[0];
    let count = 1;
    
    for (let i = 1; i < arr.length; i++) {
        if (count === 0) {
            candidate = arr[i];
        }
        if (arr[i] === candidate) {
            count++;
        } else {
            count--;
        }
    }
    
    return candidate;
}
```

Độ phức tạp: O(n)

### 3. Câu hỏi: Tìm tất cả các cặp số trong mảng có tổng bằng k cho trước trong O(n)?

**Trả lời:**
```javascript
function findPairsWithSum(arr, k) {
    const seen = new Set();
    const pairs = [];
    
    for (const num of arr) {
        if (seen.has(k - num)) {
            pairs.push([num, k - num]);
        }
        seen.add(num);
    }
    
    return pairs;
}
```

Độ phức tạp: O(n)

### 4. Câu hỏi: Tìm dãy con liên tiếp có tổng lớn nhất trong mảng (Kadane's Algorithm)?

**Trả lời:**
```javascript
function maxSubArraySum(arr) {
    let maxSoFar = -Infinity;
    let maxEndingHere = 0;
    
    for (const num of arr) {
        maxEndingHere = Math.max(num, maxEndingHere + num);
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }
    
    return maxSoFar;
}
```

Độ phức tạp: O(n)

### 5. Câu hỏi: Tìm phần tử bị thiếu trong mảng từ 1 đến n+1?

**Trả lời:**
```javascript
function findMissingNumber(arr) {
    const n = arr.length;
    const expectedSum = ((n + 1) * (n + 2)) / 2;
    const actualSum = arr.reduce((sum, num) => sum + num, 0);
    return expectedSum - actualSum;
}
```

Độ phức tạp: O(n)

### 6. Câu hỏi: Sắp xếp mảng chỉ chứa 0, 1, 2 (Dutch National Flag Problem)?

**Trả lời:**
```javascript
function sortColors(arr) {
    let low = 0, mid = 0;
    let high = arr.length - 1;
    
    while (mid <= high) {
        if (arr[mid] === 0) {
            [arr[low], arr[mid]] = [arr[mid], arr[low]];
            low++;
            mid++;
        } else if (arr[mid] === 1) {
            mid++;
        } else {
            [arr[mid], arr[high]] = [arr[high], arr[mid]];
            high--;
        }
    }
}
```

Độ phức tạp: O(n)

### 7. Câu hỏi: Tìm phần tử đầu tiên lặp lại trong mảng?

**Trả lời:**
```javascript
function firstRepeating(arr) {
    const seen = new Set();
    for (const num of arr) {
        if (seen.has(num)) {
            return num;
        }
        seen.add(num);
    }
    return null;
}
```

Độ phức tạp: O(n)

Mỗi câu hỏi trên đều yêu cầu hiểu sâu về:
- Thuật toán tối ưu
- Độ phức tạp thời gian và không gian
- Kỹ thuật xử lý mảng đặc biệt
- Cách tiếp cận sáng tạo để giải quyết vấn đề