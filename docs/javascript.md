Tôi sẽ chia sẻ danh sách các kỹ thuật JavaScript nâng cao quan trọng:

### 1. Closure (Bao đóng)
```javascript
function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    getCount: () => count
  }
}

const counter = createCounter();
counter.increment(); // 1
```

### 2. Currying (Kỹ thuật curry)
```javascript
const multiply = (a) => (b) => a * b;
const multiplyByTwo = multiply(2);
console.log(multiplyByTwo(4)); // 8
```

### 3. Promise và Async/Await
```javascript
async function getData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
```

### 4. Generator Functions
```javascript
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = numberGenerator();
console.log(gen.next().value); // 1
```

### 5. Proxy
```javascript
const handler = {
  get: (target, prop) => {
    return prop in target ? target[prop] : 'Không tồn tại';
  }
};

const object = { name: 'JavaScript' };
const proxy = new Proxy(object, handler);
```

### 6. Destructuring (Phân rã)
```javascript
const person = {
  name: 'John',
  age: 30,
  city: 'New York'
};

const { name, age } = person;
```

### 7. Spread và Rest Operators
```javascript
// Spread
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];

// Rest
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b);
}
```

### 8. Map và Set
```javascript
const map = new Map();
map.set('key', 'value');

const set = new Set([1, 2, 2, 3]); // Loại bỏ trùng lặp
```

### 9. WeakMap và WeakSet
```javascript
const weakMap = new WeakMap();
let obj = {};
weakMap.set(obj, 'data');
```

### 10. Decorators (Trong TypeScript)
```typescript
function log(target, name, descriptor) {
  // Decorator logic
}

class Example {
  @log
  method() {}
}
```

### 11. Memoization
```javascript
function memoize(fn) {
  const cache = {};
  return (...args) => {
    const key = JSON.stringify(args);
    if (key in cache) {
      return cache[key];
    }
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}
```

### 12. Event Emitter
```javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
}
```