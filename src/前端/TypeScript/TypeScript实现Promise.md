# TypeScript 实现 Promise

```typescript
type ResolveType = (value: any) => any;
type RejectType = (value: any) => any;
type Executor = (resolve: ResolveType, reject: RejectType) => any;

function isPromise(val: any): val is Promise {
  return isObject(val) && isFunction(val.then);
}

function isObject(val: any): val is Record<any, any> {
  return val !== null && typeof val === 'object';
}

function isFunction(data: any): data is Function {
  return typeof data === 'function';
}

export default class Promise<T = any> {
  public resolve!: ResolveType;
  public reject!: RejectType;
  public status: string; // 状态值
  public resolve_executor_value: any;
  public reject_executor_value: any;
  // 保存【成功】状态需要执行的函数
  public resolve_then_callbacks: (() => void)[] = [];
  // 保存【失败】状态需要执行的函数
  public reject_then_callbacks: (() => void)[] = [];
  constructor(executor: Executor) {
    this.status = 'pending'; // 状态值

    // 成功
    this.resolve = (value: any) => {
      if (this.status === 'pending') {
        this.status = 'success';
        this.resolve_executor_value = value;
        this.resolve_then_callbacks.forEach((callback) => callback());
      }
    };
    // 失败
    this.reject = (reason: any) => {
      if (this.status === 'pending') {
        this.status = 'reject';
        this.reject_executor_value = reason;
        this.reject_then_callbacks.forEach((callback) => callback());
      }
    };
    try {
      executor(this.resolve, this.reject); // 执行函数
    } catch (err: any) {
      this.status = 'pending';
      this.reject(err.toString()); // 失败，则直接执行 reject 函数
      throw new Error('程序停止!!!');
    }
  }

  then(resolveInthen: ResolveType, rejectInThen: RejectType) {
    return new Promise((resolve, reject) => {
      let result: any;
      if (this.status === 'success') {
        result = resolveInthen(this.resolve_executor_value); //ok
        resolve(result);
      }

      if (this.status === 'reject') {
        result = rejectInThen(this.reject_executor_value);
        reject(result);
      }
      if (this.status === 'pending') {
        this.processManyAsyncAndSync(resolveInthen, rejectInThen, resolve, reject);
      }
    });
  }

  static all(promises: Promise[]): Promise {
    return new Promise((resolve, reject) => {
      let allPrmiseResolveSucssValue: Array<any> = [];
      promises.forEach((promise, index) => {
        promise.then(
          (resolveSuccess) => {
            ProcessData(resolveSuccess, index);
          },
          (rejectFail) => {
            reject(rejectFail); // 只要有一个promise对象的resolve执行失败，执行reject
            return;
          }
        );
      });

      function ProcessData(resolveSuccess: any, index: number) {
        allPrmiseResolveSucssValue[index] = resolveSuccess;
        if (index === promises.length - 1) {
          // 所有的 promise 对象 resolve 函数全部执行完成
          resolve(allPrmiseResolveSucssValue);
        }
      }
    });
  }
  /**
   * 执行多个异步+多级then的处理方法
   * @param resolveInthen
   * @param rejectInThen
   * @param resolve
   * @param reject
   */
  processManyAsyncAndSync(
    resolveInthen: ResolveType,
    rejectInThen: RejectType,
    resolve: ResolveType,
    reject: RejectType
  ) {
    let result: any;
    this.resolve_then_callbacks.push(() => {
      result = resolveInthen(this.resolve_executor_value);
      if (isPromise(result)) {
        // 是异步的 Promise 对象
        result.then(
          (resolveSuccess) => {
            resolve(resolveSuccess);
          },
          (rejectSuccess) => {
            reject(rejectSuccess);
          }
        );
      } else {
        resolve(result); // 如果是普通的数据,不是异步的 Promise 对象
      }
    });
    this.reject_then_callbacks.push(() => {
      result = rejectInThen(this.reject_executor_value);
      reject(result);
    });
  }
}
```
