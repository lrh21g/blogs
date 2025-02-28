# Storage

## sessionStorage 和 localStorage

Storage 提供了访问特定域名下的会话存储或本地存储的功能，数据存储大小为 5M 。例如，可以添加、修改或删除存储的数据项。

- `window.sessionStorage` ： 操作一个域名的会话存储。当会话结束（通常是窗口关闭），数据会被清空。

- `window.localStorage` ： 操作一个域名的本地存储，数据长期存储。

### Storage 属性

- `Storage.length` ： 只读。返回一个整数，表示存储在 Storage 对象中的数据项数量。

### Storage 方法

- `Storage.key(index)` ： 该方法接受一个数值 `index` 作为参数，并返回存储中的第 `index` 个键名。

- `Storage.getItem(keyName)` ： 该方法接受一个键名 `keyName` 作为参数，返回键名对应的值。如果不存在，则返回 `null` 。

- `Storage.setItem(keyName, keyValue)` ： 该方法接受一个键名 `keyName` 和值 `keyValue` 作为参数，将会把键值对添加到存储中，如果键名存在，则更新其对应的值。

- `Storage.removeItem(keyName)` ： 该方法接受一个键名 `keyName` 作为参数，并把该键名从存储中删除。

- `Storage.clear()` ： 调用该方法会清空存储中的所有键名。

### StorageEvent 事件

Storage 储存的数据发生变化时，会触发 `storage` 事件，可以指定这个事件的监听函数。

```javascript
window.addEventListener('storage', onStorageChange)
```

`storage` 事件监听函数接受一个 `event` 实例对象作为参数，该对象继承了 StorageEvent 接口。特有属性（只读）如下：

- `StorageEvent.key` ：字符串，被修改的键名。如果 `storage` 事件是由 `clear()` 方法引起，该属性返回 `null` 。

- `StorageEvent.newValue` ：字符串，修改后的新值。如果 `storage` 事件是由 `clear()` 方法或删除该键值对引发的，该属性返回 `null` 。

- `StorageEvent.oldValue` ：字符串，在修改前的旧值。如果该键值对是新增的，该属性返回 `null` 。

- `StorageEvent.storageArea` ：对象，被操作的 Storage 对象。可以从该属性上面获取当前域名储存的所有键值对。

- `StorageEvent.url` ：字符串，key 发生改变的对象所在文档的 URL 地址。

## IndexedDB

IndexedDB 是一个事务型数据库系统，基于 JavaScript 的面向对象数据库。可用于在客户端存储大量的结构化数据（包括文件/二进制大型对象（blobs））。

IndexedDB 具有以下特点：

- **键值对存储**。IndexedDB 内部采用对象仓库（object store）存放数据。所有类型的数据都可以直接存入，包括 JavaScript 对象。对象仓库中，数据以“键值对”的形式保存，每个记录都有一个对应的主键，主键是独一无二的，不能重复。
- **异步**。IndexedDB 操作时不会锁死浏览器，用户依然可以进行其他操作。防止大量数据的读写，拖慢网页的表现。
- **支持事务**。IndexedDB 支持事务（transaction），一系列操作步骤之中，只要有一步失败，整个事务就都取消，数据库回滚到事务发生之前的状态，不存在只改写一部分数据的情况。
- **同源限制**。IndexedDB 受到同源限制，每一个数据库对应创建它的域名。网页只能访问自身域名下的数据库，而不能访问跨域的数据库。
- **储存空间大**。一般来说不少于 250MB，甚至没有上限。
- **支持二进制存储**。IndexedDB 不仅可以储存字符串，还可以储存二进制数据（`ArrayBuffer` 对象和 `Blob` 对象）。

IndexedDB 库：

- `localForage` ：一个简单的 Polyfill，提供了简单的客户端数据存储的值语法。它在后台使用 IndexedDB，并在不支持 IndexedDB 的浏览器中回退到 WebSQL 或 localStorage。
- `Dexie.js` ：IndexedDB 的包装，通过简单的语法，可以更快地进行代码开发。
- `ZangoDB` ：类似 MongoDB 的 IndexedDB 接口，支持 MongoDB 的大多数熟悉的过滤、投影、排序、更新和聚合功能。
- `JsStore` ：一个带有 SQL 语法的 IndexedDB 包装器。
- `MiniMongo` ：由 localstorage 支持的客户端内存中的 mongodb，通过 http 进行服务器同步。MeteorJS 使用 MiniMongo。
- `PouchDB` ：使用 IndexedDB 在浏览器中实现 CouchDB 的客户端。
- `idb` ：一个微小的（〜1.15k）库，大多 API 与 IndexedDB 类似，但做了一些小的改进，让数据库的可用性得到了大大的提升。
- `idb-keyval` ：使用 IndexedDB 实现的超级简单且小巧的（~600B）基于 Promise 的键值对存储。
- `sifrr-storage` ：一个非常小的（~2kB）基于 Promise 的客户端键值数据库。基于 IndexedDB、localStorage、WebSQL 和 Cookies 实现。它可以自动选择上述支持的数据库，并按照优先顺序使用。
- `lovefield` ：Lovefield 是一个用于 Web App 的关系型数据库，使用 JavaScript 编写，可以在不同的浏览器环境中运行，提供了类似 SQL 的 API，速度快、安全且易用。

### 操作流程

```javascript
var db

// indexedDB.open(databaseName, version) 方法返回一个 IDBRequest 对象。
// > databaseName ： 数据库名称
// > version ： 数据库版本号
// 通过 IDBRequest 对象的 error 、 success 、 upgradeneeded 事件处理打开数据库的操作结果。
var request = window.indexedDB.open('MyTestDatabase', 3)

// 通过 IDBRequest 对象的 error 事件处理数据库打开失败的情况。
request.onerror = function (event) {
  console.log('数据库打开报错')
}

// 通过 IDBRequest 对象的 success 事件处理数据库打开成功的情况。
request.onsuccess = function (event) {
  // 通过 IDBRequest 对象的 result 属性获取 IDBDatabase 对象。
  db = request.result

  console.log('数据库打开成功')
}

// 通过 IDBRequest 对象的 upgradeneeded 事件处理数据库版本升级的情况。
// 新建数据库与打开数据库时同一个操作。如果指定数据库不存在，则会新建。
// 数据库后续的操作主要在 upgradeneeded 事件监听函数中完成。因为版本从无到有，所以会触发该事件。
request.onupgradeneeded = function (event) {
  // 通过 IDBRequest 对象的 result 属性获取 IDBDatabase 对象。
  db = event.target.result

  var objectStore

  // 如果数据库中没有 person 对象仓库则创建该对象仓库。
  if (!db.objectStoreNames.contains('person')) {
    // IDBDatabase.createObjectStore(name, options) 方法创建一个对象仓库并返回一个 IDBObjectStore 对象。
    // > name ： 对象仓库名称
    // > options ： 对象仓库选项。
    // > > options.keyPath 属性表示对象仓库的键路径。
    // > > options.autoIncrement 属性表示对象仓库的键是否自增。默认为 false 。
    objectStore = db.createObjectStore('person', { keyPath: 'id' })

    // IDBObjectStore.createIndex(indexName, keyPath, options) 方法创建一个索引并返回一个 IDBIndex 对象。
    // > indexName ： 索引名称
    // > keyPath ： 索引属性
    // > options ： 索引选项。
    // > > options.unique 属性表示索引是否包含重复的值。
    // > > options.multiEntry 属性表示索引属性是否包含数组。
    objectStore.createIndex('name', 'name', { unique: false })
    objectStore.createIndex('email', 'email', { unique: true })
  }
}

// 新增数据
// 通过 IDBDatabase.transaction(storeNames, mode) 方法创建一个事务并返回一个 IDBTransaction 对象。
// > storeNames ： 对象仓库名称或名称数组。
// > mode ： 事务模式。
// 通过 IDBTransaction.objectStore(storeName) 方法获取一个 IDBObjectStore 对象。
// > storeName ： 对象仓库名称。
// 通过 IDBObjectStore.add(value, key) 方法向对象仓库添加一条记录，并返回 IDBRequest 对象。
// > value ： 记录值。
// > key ： 可选值，记录键。
function add() {
  var request = db
    .transaction(['person'], 'readwrite')
    .objectStore('person')
    .add({ id: 1, name: '张三', age: 24, email: 'zhangsan@example.com' })

  // 通过 IDBRequest 对象的 success 事件处理添加数据成功的情况。
  request.onsuccess = function (event) {
    console.log('数据写入成功')
  }

  // 通过 IDBRequest 对象的 error 事件处理添加数据失败的情况。
  request.onerror = function (event) {
    console.log('数据写入失败')
  }
}

// 读取数据
function read() {
  var transaction = db.transaction(['person'])
  var objectStore = transaction.objectStore('person')

  // 通过 IDBObjectStore.get(key) 方法从对象储存检索特定记录，并返回 IDBRequest 对象。
  // > key ： 记录键。
  var request = objectStore.get(1)

  request.onerror = function (event) {
    console.log('事务失败')
  }

  request.onsuccess = function (event) {
    if (request.result) {
      console.log('Name: ' + request.result.name)
      console.log('Age: ' + request.result.age)
      console.log('Email: ' + request.result.email)
    } else {
      console.log('未获得数据记录')
    }
  }
}

// 遍历数据
function readAll() {
  var transaction = db.transaction('person')
  var objectStore = transaction.objectStore('person')

  // 通过 IDBObjectStore.openCursor(query, direction) 方法用一个游标来遍历一个对象存储空间，并返回 IDBRequest 对象。
  // > query ： 可选值，要查询的键或者 IDBKeyRange 。
  // > direction ： 可选值，游标遍历方向。有效的值有 "next" （默认） 、"nextunique" 、"prev" 和 "prevunique"。
  objectStore.openCursor().onsuccess = function (event) {
    var cursor = event.target.result

    if (cursor) {
      console.log('Id: ' + cursor.key)
      console.log('Name: ' + cursor.value.name)
      console.log('Age: ' + cursor.value.age)
      console.log('Email: ' + cursor.value.email)
      cursor.continue()
    } else {
      console.log('没有更多数据了！')
    }
  }
}

// 更新数据
function update() {
  var transaction = db.transaction(['person'], 'readwrite')
  var objectStore = transaction.objectStore('person')

  // 通过 IDBDatabase.put(item, key) 方法更新一条记录，并返回 IDBRequest 对象。
  // > item ： 需要更新的记录值。
  // > key ： 可选值，记录键。
  var request = objectStore.put({
    id: 1,
    name: '李四',
    age: 35,
    email: 'lisi@example.com',
  })

  request.onsuccess = function (event) {
    console.log('数据更新成功')
  }

  request.onerror = function (event) {
    console.log('数据更新失败')
  }
}

// 删除数据
function remove() {
  var transaction = db.transaction(['person'], 'readwrite')
  var objectStore = transaction.objectStore('person')

  // 通过 IDBObjectStore.delete(key) 方法删除一条记录，并返回 IDBRequest 对象。
  // > key ： 需要删除的记录键。
  var request = objectStore.delete(1)

  request.onsuccess = function (event) {
    console.log('数据删除成功')
  }
}
```

### IndexedDB 相关接口

#### IDBFactory 接口

`IDBFactory` 提供数据库访问。全局对象 `indexedDB` 实现的接口，是 API 的入口。

- `IDBFactory` 对象的方法

  - `IDBFactory.open()`

    **语法**：`IDBFactory.open(name, version)`

    **描述**：请求打开一个数据库的连接，并返回 `IDBOpenDBRequest` 对象。

    - 连接数据库的过程：
      - 指定数据库已存在时，等待 `versionchange` 操作完成。如果数据库已计划删除，则等待删除完成。
      - 如果已有数据库版本高于给定 `version` ，中止操作，并返回类型为 VersionError 的错误。
      - 如果已有数据库版本低于给定 `version` ，触发 `versionchange` 事件。
      - 如果数据库不存在时，创建指定名称数据库，版本号设置为给定版本 `version` 。如果未给定版本号，则默认为 `1` 。
    - 异步打开数据库，通过监听各种事件处理打开数据库的操作结果。
      - `success` 事件 ：打开数据库成功时触发。
      - `error` 事件 ：打开数据库失败时触发。
      - `upgradeneeded` 事件 ：第一次打开数据库或者数据库版本升级时触发。第一次打开数据库时，会触发该事件，然后触发 `success` 事件。
      - `blocked` 事件 ：上一次打开数据库的连接未关闭时触发。

    **参数**：

    - `name` ： 数据库名称。
    - `version` ： 可选值。数据库版本号。

  - `IDBFactory.deleteDatabase(name)` ：请求删除数据库，并返回 `IDBOpenDBRequest` 对象。

    - 异步删除数据库，通过监听各种事件处理删除数据库的操作结果。
      - `success` 事件 ：删除数据库成功时触发。
      - `error` 事件 ：删除数据库失败时触发。
    - 调用该方法之后，当前数据库的其他已打开连接都会接收到 `versionchange` 事件。
    - 删除不存在的数据库并不会报错。

  - `IDBFactory.cmp(first, second)` ：比较两个值是否为 indexedDB 的相同的主键，并返回一个整数，表示比较结果。

    - 如果 `first` 大于 `second` ，返回 `1` 。
    - 如果 `first` 等于 `second` ，返回 `0` 。
    - 如果 `first` 小于 `second` ，返回 `-1` 。

  - `IDBFactory.databases()` ：返回一个列表，其中包含所有可用数据库的名称和版本。

#### IDBOpenDBRequest 接口

`IDBOpenDBRequest` 继承了 `IDBRequest` 对象，表示一个打开数据库的请求。提供了额外的事件监听属性如下：

- `IDBOpenDBRequest.onblocked` ：上一次打开数据库的连接未关闭时触发。
- `IDBOpenDBRequest.onupgradeneeded` ：第一次打开数据库或者数据库版本升级时触发。

#### IDBDatabase 接口

`IDBDatabase` 表示一个数据库连接。可以使用 `IDBDatabase` 对象在数据库中打开一个 `transaction` ，然后进行操作或者删除数据库中的对象。唯一能够访问和管理数据库版本的接口。

- `IDBDatabase` 属性

  - `IDBDatabase.name` ：只读。DOMString 类型，当前连接数据库名。

  - `IDBDatabase.version` ：只读。64-bit 整型数，当前连接数据库的版本。当数据第一次被创建时，这个属性是一个空的字符串。

  - `IDBDatabase.objectStoreNames` ：只读。DOMStringList 类型，当前连接连接数据库中所有的 object store 名字列表。

- `IDBDatabase` 事件属性

  - `IDBDatabase.onclose` ：当数据库连接意外关闭。例如，当底层存储被移除或用户在浏览器的历史首选项中清除数据库时。正常关闭数据库连接，则不会触发该事件。

  - `IDBDatabase.onabort` ：在中断数据库访问时触发。

  - `IDBDatabase.onerror` ：当访问数据库失败时触发。

  - `IDBDatabase.onversionchange` ：当数据库结构发生更改时触发

- `IDBDatabase` 方法

  - `IDBDatabase.close()` ：在一个单独的线程中关闭数据库连接并立即返回。

  - `IDBDatabase.createObjectStore()` ：创建并返回一个新的 object store 或者 index。

  - `IDBDatabase.deleteObjectStore()` ：根据给定的名字，删除在当前连接的数据库中的 object store 和 相关的索引。

  - `IDBDatabase.transaction()` ：立即返回一个包含 `IDBTransaction.objectStore` 方法的 transaction 对象。你可以用这个对象来操作 object store。这个操作是在一个单独的线程中执行的。

#### IDBTransaction

`IDBTransaction` 表示一个事务。在数据库上创建一个事务，指定作用域（例如要访问的存储对象），并确定所需的访问类型（只读或读写）。

- `IDBTransaction` 属性

  - `IDBTransaction.db` ：只读。返回当前事务所属的数据库对象 `IDBDatabase`。

  - `IDBTransaction.error` ：只读。返回当前事务的错误。如果事务没有结束，或者事务成功结束，或者被手动终止，该方法返回 `null` 。

  - `IDBTransaction.mode` ：只读。返回当前事务的模式。可选值有 `readonly`（只读） 、 `readwrite` 。

  - `IDBTransaction.objectStoreNames` ：只读。返回一个类似数组的对象 `DOMStringList`，成员是当前事务涉及的对象仓库的名字。

- `IDBTransaction` 事件属性

  - `IDBTransaction.onabort` ：当事务被中止时触发。

  - `IDBTransaction.oncomplete` ：当事务成功完成时触发。

  - `IDBTransaction.onerror` ：当事务失败时触发。

- `IDBTransaction` 方法

  - `IDBTransaction.objectStore()` ：返回一个 `IDBObjectStore` 对象，用于操作当前事务涉及的对象仓库。

  - `IDBTransaction.abort()` ：中止事务，回滚所有对数据库的变更。

#### IDBRequest

`IDBRequest` 表示打开的数据库连接。对数据库的读写操作都是通过 request 的方式来异步实现。

每一个请求都有一个 `readyState` 属性，初始时为 `pending`，当请求完成或失败的时候，`readyState` 会变为 `done`。当状态值变为 `done` 时，每一个请求都会返回 `result` 和 `error` 属性，并且会触发一个事件。当状态保持为 `pending` 时，任何尝试访问 `result` 或 `error` 属性的行为会触发一个 `InvalidStateError` 异常。

- `IDBRequest` 属性

  - `IDBRequest.readyState` ：只读。等于 `pending` 表示操作正在进行，等于 `done` 表示操作正在完成。

  - `IDBRequest.result` ：只读。返回请求的结果。如果请求失败、结果不可用，读取该属性会报错。

  - `IDBRequest.error` ：只读。请求失败时，返回错误对象。

  - `IDBRequest.source` ：只读。返回请求的来源（比如索引对象或 ObjectStore）。

  - `IDBRequest.transaction` ：只读。返回当前请求正在进行的事务，如果不包含事务，返回 `null` 。

- `IDBRequest` 事件属性

  - `IDBRequest.onsuccess` ：当请求成功完成时触发。

  - `IDBRequest.onerror` ：当请求失败时触发。

#### IDBObjectStore

`IDBObjectStore` 表示数据库中的一个对象库 (object store) 。

- `IDBObjectStore` 属性

  - `IDBObjectStore.name` ：只读。返回对象仓库的名称。

  - `IDBObjectStore.keyPath` ：只读。返回对象仓库的主键。

  - `IDBObjectStore.indexNames` ：只读。返回一个 `DOMStringList` 对象，包含对象仓库中所有索引的名称。

  - `IDBObjectStore.transaction` ：只读。返回当前对象仓库所在的事务。

  - `IDBObjectStore.autoIncrement` ：只读。返回一个布尔值，表示当前对象仓库是否自增。

- `IDBObjectStore` 方法

  - `IDBObjectStore.add()` ：返回一个 `IDBRequest` 对象，用于向对象仓库中添加一条记录。只用于添加数据，如果主键相同会报错，更新数据必须使用 `put()` 方法。

  - `IDBObjectStore.put()` ：返回一个 `IDBRequest` 对象，用于向对象仓库中添加或更新一条记录。如果对应的键值不存在，则插入一条新的记录。

  - `IDBObjectStore.clear()` ：返回一个 `IDBRequest` 对象，用于清空对象仓库中的所有记录。

  - `IDBObjectStore.delete()` ：返回一个 `IDBRequest` 对象，用于删除对象仓库中指定键的记录。

  - `IDBObjectStore.deleteIndex()` ：返回一个 `IDBRequest` 对象，用于删除对象仓库中指定索引。

  - `IDBObjectStore.count()` ：返回一个 `IDBRequest` 对象，用于计算对象仓库中满足给定参数的记录数量。

  - `IDBObjectStore.getKey()` ：返回一个 `IDBRequest` 对象，用于获取对象仓库中指定键的主键。

  - `IDBObjectStore.get()` ：返回一个 `IDBRequest` 对象，用于获取对象仓库中指定键的记录。

  - `IDBObjectStore.getAll()` ：返回一个 `IDBRequest` 对象，用于获取对象仓库中所有记录。

  - `IDBObjectStore.getAllKeys()` ：返回一个 `IDBRequest` 对象，用于获取对象仓库中所有记录的主键。

  - `IDBObjectStore.index()` ：返回一个 `IDBIndex` 对象，用于获取对象仓库中指定索引的记录。

  - `IDBObjectStore.createIndex()` ：返回一个 `IDBIndex` 对象，用于创建一个索引。该方法只能在 `VersionChange` 监听函数里面调用。

  - `IDBObjectStore.openCursor()` ：返回一个 `IDBRequest` 对象，获取一个指针对象 `IDBCursor` ，指针对象可以用来遍历数据。异步操作，通过监听事件（`success` 和 `error` 事件）处理获取数据的操作结果。

  - `IDBObjectStore.openKeyCursor()` ：返回一个 `IDBRequest` 对象，用于获取一个主键指针对象。

#### IDBIndex

`IDBIndex` 允许访问 IndexedDB 数据库中的数据子集，但使用索引来检索记录而不是主键。这有时比使用 `IDBObjectStore` 更快。

- `IDBIndex` 属性

  - `IDBIndex.name` ：只读。返回索引的名称。

  - `IDBIndex.objectStore` ：只读。返回索引所在的对象仓库。

  - `IDBIndex.keyPath` ：只读。返回索引的主键。

  - `IDBIndex.multiEntry` ：只读。返回一个布尔值，针对 `keyPath` 为数组的情况，如果设为 `true`，创建数组时，每个数组成员都会有一个条目，否则每个数组都只有一个条目。
  - `IDBIndex.unique` ：只读。返回一个布尔值，表示索引的键是否包含重复的值。

- `IDBIndex` 方法

  - `IDBIndex.count()` ：返回一个 `IDBRequest` 对象，用于计算索引中满足给定参数的记录数量。

  - `IDBIndex.getKey()` ：返回一个 `IDBRequest` 对象，用于获取索引中指定键的主键。

  - `IDBIndex.get()` ：返回一个 `IDBRequest` 对象，用于获取索引中指定键的记录。

  - `IDBIndex.getAll()` ：返回一个 `IDBRequest` 对象，用于获取索引中所有记录。

  - `IDBIndex.getAllKeys()` ：返回一个 `IDBRequest` 对象，用于获取索引中所有记录的主键。

  - `IDBIndex.openCursor()` ：返回一个 `IDBRequest` 对象，获取一个指针对象 `IDBCursor` ，指针对象可以用来遍历数据。异步操作，通过监听事件（`success` 和 `error` 事件）处理获取数据的操作结果。

  - `IDBIndex.openKeyCursor()` ：返回一个 `IDBRequest` 对象，用于获取一个主键指针对象。

#### IDBCursor

`IDBCursor` 对象表示指针对象，用来遍历数据仓库（`IDBObjectStore`）或索引（`IDBIndex`）的记录。

- `IDBCursor` 属性

  - `IDBCursor.source` ：只读。返回一个 `IDBObjectStore` 或 `IDBIndex` 对象，表示当前指针对象所在的对象仓库或索引。

  - `IDBCursor.direction` ：只读。返回一个字符串，表示指针对象的遍历方向。可选值有 `next` （从头开始向后遍历） 、 `nextunique` 从头开始向后遍历，重复的值只遍历一次）、 `prev` （从尾部开始向前遍历） 、 `prevunique` （从尾部开始向前遍历，重复的值只遍历一次）。

  - `IDBCursor.key` ：只读。返回当前记录的键。

  - `IDBCursor.primaryKey` ：只读。返回当前记录的主键。

  - `IDBCursor.value` ：只读。返回当前记录的值。

- `IDBCursor` 方法

  - `IDBCursor.advance()` ：指针向前移动 n 个

  - `IDBCursor.continue()` ：指针向前移动一个位置。它可以接受一个主键作为参数，这时会跳转到这个主键。

  - `IDBCursor.continuePrimaryKey()` ：该方法需要两个参数，第一个是key，第二个是primaryKey，将指针移到符合这两个参数的位置。

  - `IDBCursor.delete()` ：用来删除当前位置的记录，返回一个 IDBRequest 对象。该方法不会改变指针的位置。

  - `IDBCursor.update()` ：用来更新当前位置的记录，返回一个 IDBRequest 对象。它的参数是要写入数据库的新的值。

#### IDBCursorWithValue

`IDBCursorWithValue` 表示一个用于遍历或迭代数据库中多条记录的游标。除了包含值属性外，它与 `IDBCursor` 相同。

#### IDBKeyRange

`IDBKeyRange` 定义可用于从特定范围内的数据库检索数据的键范围。

- `IDBKeyRange` 属性

  - `IDBKeyRange.lower` ：只读。返回键范围的下限。

  - `IDBKeyRange.upper` ：只读。返回键范围的上限。

  - `IDBKeyRange.lowerOpen` ：只读。返回一个布尔值，表示下限是否为开区间（即下限是否排除在范围之外）。

  - `IDBKeyRange.upperOpen` ：只读。返回一个布尔值，表示上限是否为开区间（即上限是否排除在范围之外）。

- `IDBKeyRange` 方法

  - `IDBKeyRange.bound()` ：返回一个 `IDBKeyRange` 对象，表示一个范围，包含下限和上限。

  - `IDBKeyRange.lowerBound()` ：返回一个 `IDBKeyRange` 对象，表示一个范围，包含下限，不包含上限。

  - `IDBKeyRange.upperBound()` ：返回一个 `IDBKeyRange` 对象，表示一个范围，包含上限，不包含下限。

  - `IDBKeyRange.only()` ：返回一个 `IDBKeyRange` 对象，表示一个范围，只包含一个特定的值。

#### IDBVersionChangeEvent

`IDBVersionChangeEvent` 作为 `IDBOpenDBRequest.onupgradeneeded` 事件的处理程序的结果， `IDBVersionChangeEvent` 接口表示数据库的版本已经发生了改变。

## HTTP Cookie

HTTP Cookie（也叫 Web Cookie 或浏览器 Cookie）是服务器发送到用户浏览器并保存在本地的一小块数据。

- 浏览器会存储 cookie 并在下次向同一服务器再发起请求时携带并发送到服务器上。
- Cookie 主要用于以下三个方面：
  - 会话（session）状态管理：如用户登录状态、购物车、游戏分数或其他需要记录的信息
  - 个性化设置：如用户自定义设置、主题和其他设置
  - 浏览器行为跟踪：如跟踪分析用户行为等
- Cookie 容量仅 4 KB，缺乏数据操作接口，而且会影响性能。客户端存储可以使用 Web storage API 和 IndexedDB 。

### Cookie 的属性

- `Expires`，`Max-Age`

  - `Expires` ： 过期时间，即在此时候之后，响应过期。UTC 格式，可以使用 `Date.prototype.toUTCString()` 进行格式转换。

    - 如设置无效的日期（比如 `0`），代表着过去的日期，即该资源已经过期。
    - 如果不设置该属性，或者设为 `null`，Cookie 只在当前会话（session）有效，浏览器窗口一旦关闭，当前 Session 结束，Cookie 会被删除。

  - `Max-Age` ： 有效期，指定的一段时间后被删除 Cookie 。

  如果同时指定了 `Expires` 和 `Max-Age` ，`Max-Age` 的值将优先生效。

  如果 `Set-Cookie` 字段没有指定 `Expires` 或 `Max-Age` 属性，即它在本次对话存在，一旦用户关闭浏览器，浏览器就不会再保留这个 Cookie 。

- `Domain`，`Path`

  `Domain` 和 `Path` 属性标识定义了 Cookie 的作用域：即允许 Cookie 应该发送给哪些 URL。

  - `Domain` 属性：指定 Cookie 属于哪个域名，浏览器向服务器发送 HTTP 请求时，通过该属性判断是否需要附带某个 Cookie 。

    - 如果未指定 `Domain` 属性，浏览器默认将其设为浏览器的当前域名。如果当前域名是一个 IP 地址，则不得设置 `Domain` 属性。
    - 如果指定了 `Domain` 属性，则需遵循如下规则：只能是当前域名或者当前域名的上级域名，但设为上级域名时，不能设为顶级域名（如： `.com` 、 `.net` 等）或公共域名（开放给外部用户设置子域名的域名，如： `github.io`），否则浏览器会拒绝设置。

      - 如果当前域名为 `x.y.z.com` ，则 `Domain` 属性可设置为 `x.y.z.com` 或 `y.z.com` 或 `z.com` ，但不能设置为 `foo.x.y.z.com` 或 `another.domain.com` 。
      - 如果当前域名为 `foo.github.io` ，则 `Domain` 属性只能设置为 `foo.github.io` ，不能设置为 `github.io` （该域名为公共域名）。

  - `Path` 属性：指定浏览器发出 HTTP 请求时，哪些路径需要附带 Cookie 。当浏览器发现 `Path` 属性是 HTTP 请求路径的开头一部分，则会在头信息中携带 Cookie 。

    - 如果 `Path=/docs` ，则 `/docs` 、 `/docs/` 、 `/docs/Web/` 都会匹配，携带 Cookie 。但，不会匹配 `/` 、 `/docsets` 。
    - 如果 `Path=/` ， 则 `/docs` 都会匹配，携带 Cookie 。

- `Secure`，`HttpOnly`

  `Secure` 和 `HttpOnly` 属性确保 Cookie 被安全发送，并且不会被意外的参与者或脚本访问。

  - `Secure` 属性：指定 Cookie 只应通过被 HTTPS 协议加密过的请求发送给服务端。如果是 HTTP 协议，则无法使用 `Secure` 属性设置 Cookie ，但不会阻止对 Cookie 中敏感信息的访问。

  - `HttpOnly` 属性：指定 Cookie 无法通过 JavaScript API （比如： `document.cookie` 属性 、 `XMLHttpRequest` 对象 、 Request API 等）获取，仅用于服务器。

- `SameSite`

  `SameSite` 属性允许服务器指定是否/何时通过跨站点请求发送，可用于防止 CSRF 攻击（Cookie 往往用于存储用户的身份信息，恶意网站可以设法伪造带有正确 Cookie 的 HTTP 请求）和用户追踪。

  `SameSite` 属性的属性值如下。如果没有设置 `SameSite` 属性，则将 Cookie 视为 `Lax`。

  - `Strict` ：最为严格，完全禁止第三方 Cookie，跨站点时，任何情况下都不会发送 Cookie。只有当前网页的 URL 与请求目标一致，才会带上 Cookie。
  - `Lax` ：大多数情况也是不发送第三方 Cookie，但是导航到目标网址的 Get 请求除外。导航到目标网址的 GET 请求，只包括三种情况：链接，预加载请求，GET 表单。
  - `None` ：浏览器会在同站请求和跨站请求下继续发送 Cookie，但仅在安全的上下文中（即，如果 `SameSite=None`，且还必须设置 `Secure` 属性）。

### Cookie 与 HTTP

- 服务器：收到 HTTP 请求后，服务器可以在响应标头里面添加一个或多个 `Set-Cookie` 选项。

  - 一个 `Set-Cookie` 字段里面，可以同时包括多个属性，没有次序的要求。
  - 服务器如果要改变一个已设置的 Cookie，必须同时满足四个条件： Cookie 的 `key`、`domain`、`path` 和 `secure` 都是匹配的。只要有一个属性不同，就会生成一个全新的 Cookie ，而不是替换。

  ```javascript
  Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain-value>; Secure; HttpOnly
  ```

- 浏览器：收到 HTTP 响应后，通常会保存下 Cookie，并将其放在 HTTP Cookie 标头内，向同一服务器发出请求时一起发送。

### document.cookie

`document.cookie` 获取并设置与当前文档相关联的 Cookie。

- 读取时，会返回当前网页的所有 Cookie （前提条件：对应 Cookie 不能有 `HttpOnly` 属性）。返回符串包含所有的 Cookie，每条 cookie 以 `分号和空格 (; )` 分隔（即： `key=value` 键值对）。
- 设置时，Cookie 的值必须为 `key=value` 键值对形式（等号两边不能有空格）。
  - 一次只能写入一个 Cookie 。
  - 必须对分号、逗号和空格进行转义（它们都不允许作为 Cookie 的值），可以使用 `encodeURIComponent` 方法处理。
  - Cookie 属性的写入注意点：
    - `path` 属性值必须为绝对路径，默认为当前路径。
    - `domain` 属性值必须是当前发送 Cookie 的域名的一部分。如果显式设置该属性，则该域名的任意子域名也可以读取 Cookie。
    - `max-age` 属性值为秒数。
    - `expires` 属性值为 UTC 格式，可以使用 `Date.prototype.toUTCString()` 进行日期格式转换。
- 删除一个现存 Cookie 的唯一方法，是设置它的 `expires` 属性为一个过去的日期。

```javascript
document.cookie =
  'fontSize=14; ' +
  'expires=' + someDate.toGMTString() + '; ' +
  'path=/subdirectory; ' +
  'domain=example.com'
```
