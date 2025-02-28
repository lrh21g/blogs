# Math 和 Date

## Math

`Math` 是一个内置对象，它拥有一些数学常数属性和数学函数方法。`Math` 不是一个函数对象。`Math` 用于 `Number` 类型。它不支持 `BigInt`。

### Math 的属性

- `Math.E` ：欧拉常数，也是自然对数的底数，约等于 2.718。

- `Math.LN2` ：2 的自然对数，约等于 0.693。

- `Math.LN10` ：10 的自然对数，约等于 2.303。

- `Math.LOG2E` ：以 2 为底的 E 的对数，约等于 1.443。

- `Math.LOG10E` ：以 10 为底的 E 的对数，约等于 0.434。

- `Math.PI` ：圆周率，一个圆的周长和直径之比，约等于 3.14159。

- `Math.SQRT1_2` ：二分之一的平方根，同时也是 2 的平方根的倒数，约等于 0.707。

- `Math.SQRT2` ：2 的平方根，约等于 1.414

### Math 的方法

- `Math.abs(x)` ：返回一个数的绝对值。

- `Math.max([x[, y[, …]]])` ：返回零到多个数值中最大值。

- `Math.min([x[, y[, …]]])` ：返回零到多个数值中最小值。

- `Math.random()` ：返回一个 0 到 1 之间的伪随机数。

- `Math.ceil(x)` ：返回大于一个数的最小整数，即一个数**向上取整**后的值。

- `Math.floor(x)` ：返回小于一个数的最大整数，即一个数**向下取整**后的值。

- `Math.round(x)` ：返回四舍五入后的整数。

- `Math.sign(x)` ：返回一个数的符号，得知一个数是正数、负数还是 0。

- `Math.trunc(x)` ：返回一个数的整数部分，直接去除其小数点及之后的部分。

- 方根运算

  - `Math.sqrt(x)` ：返回一个数的平方根。

  - `Math.cbrt(x)` ：返回一个数的立方根。

  - `Math.pow(x, y)` ：返回一个数的 y 次幂。

  - `Math.hypot([x[, y[, …]]])` ：返回其所有参数平方和的平方根。

  - `Math.exp(x)` ：返回欧拉常数的参数次方，`E^x`，其中 x 为参数，E 是欧拉常数（2.718...，自然对数的底数）。

  - `Math.expm1(x)` ：返回 `exp(x) - 1` 的值。

- 对数函数方法

  - `Math.log(x)` ：返回一个数的自然对数（㏒e，即 ㏑）。

  - `Math.log1p(x)` ：返回一个数加 1 的和的自然对数（㏒e，即 ㏑）。

  - `Math.log10(x)` ：返回一个数以 10 为底数的对数。

  - `Math.log2(x)` ：返回一个数以 2 为底数的对数。

- 三角函数方法

  三角函数 `sin()`、`cos()`、`tan()`、`asin()`、`acos()`、`atan()` 和 `atan2()` 返回的值是弧度而非角度。若要转换，弧度除以 `(Math.PI / 180)` 即可转换为角度，同理，角度乘以这个数则能转换为弧度。

  - `Math.sin(x)` ：返回一个数的正弦值。

  - `Math.cos(x)` ：返回一个数的余弦值。

  - `Math.tan(x)` ：返回一个数的正切值。

  - `Math.asin(x)` ：返回一个数的反正弦值。

  - `Math.acos(x)` ：返回一个数的反余弦值。

  - `Math.atan(x)` ：返回一个数的反正切值。

  - `Math.sinh(x)` ：返回一个数的双曲正弦值。

  - `Math.cosh(x)` ：返回一个数的双曲余弦值。

  - `Math.tanh(x)` ：返回一个数的双曲正切值。

  - `Math.asinh(x)` ：返回一个数的反双曲正弦值。

  - `Math.acosh(x)` ：返回一个数的反双曲余弦值。

  - `Math.atanh(x)` ：返回一个数的反双曲正切值。

  - `Math.atan2(y, x)` ：返回 y/x 的反正切值。

- 其他

  - `Math.clz32(x)` ：返回一个 32 位整数的前导零的数量。

  - `Math.fround(x)` ：返回最接近一个数的单精度浮点型表示。

  - `Math.imul(x, y)` ：返回 32 位整数乘法的结果。

  - `Math.toSource()` ：返回字符串 "Math"。

## Date

创建一个 JavaScript Date 实例，该实例呈现时间中的某个时刻。`Date` 对象则基于 Unix Time Stamp，**即自 1970 年 1 月 1 日（UTC）起经过的毫秒数**。

### new Date() 构造函数

当一个参数被传递给 `Date()` 构造函数时，所有其他的值都被转换为原始值。如果结果是一个字符串，它将被解析为一个日期字符串。否则，产生的会被进一步强制转换为数值，并被视为时间戳。

- `new Date()`

  如果没有提供参数，创建的 `Date` 对象表示实例化时刻的日期和时间。

- `new Date(value)`

  `value` 是一个 Unix 时间戳（Unix Time Stamp），它是一个整数值，表示自 1970 年 1 月 1 日 00:00:00 UTC（the Unix epoch）以来的毫秒数，忽略了闰秒。

- `new Date(dateString)`

  `dateString` 表示日期的字符串值。

  `dateString` 字符串应该能被 `Date.parse()` 正确方法识别，一定要确保输入符合 ISO 8601 格式（YYYY-MM-DDTHH:mm:ss.ssZ）。仅有日期的字符串（例如 "1970-01-01"）被视为 UTC，而日期时间的字符串（例如 "1970-01-01T12:00"）被视为本地时间。

- `new Date(dateObject)`

  一个现有的 `Date` 对象。实际上是在现有的 `Date` 对象上复制了一个相同的日期和时间。这等同于 `new Date(dateObject.valueOf())`，除了不调用 `valueOf()` 方法。

- `new Date(year, monthIndex [, day [, hours [, minutes [, seconds [, milliseconds]]]]])` ：

  - `year` ：表示年的整数。从 0 到 99 的值映射了 1900 到 1999 年。其他值对应真实的年份。
  - `monthIndex` ：表示月份的整数，从代表**一月的 0 开始到代表十二月的 11 结束**。
  - `day` ：可选值。表示一个月中第几天的整数。默认为 1。
  - `hours` ：可选值。表示一天中的小时数的整数值，在 0 到 23 之间。默认值为 0。
  - `minutes` ：可选值。表示时间的分钟段的整数值。默认为小时后的 0 分钟。
  - `seconds` ：可选值。表示时间的秒数段的整数值。默认为分钟后的 0 秒。
  - `milliseconds` ：可选值。表示时间的毫秒段的整数值。默认为 0 毫秒的秒数。

  至少提供一个年份和月份，这种形式的 `Date()` 返回一个 `Date` 对象，其组成部分的值（年、月、日、小时、分钟、秒和毫秒）都来自提供的参数。任何缺失的字段都被赋予可能的最低值（day 为 1，其他所有组件为 0）。

  **如果任何参数超过其定义的范围，会发生“进位”。** 例如：

  - 如果传入一个大于 11 的 `monthIndex`，月将导致年的递增；例如：`new Date(1990, 12, 1)` 将返回 1991 年 1 月 1 日。
  - 如果传入一个大于 59 的 `minutes`，`hours` 将相应递增，等等。例如：`new Date(2020, 5, 19, 25, 65)` 将返回 2020 年 6 月 20 日凌晨 2:05。

  **如果任何参数不足其定义的范围，会从高位“借位”。** 例如：`new Date(2020, 5, 0)` 将返回 2020 年 5 月 31 日。

### Date 的属性和方法

- `Date.prototype` ：允许为 `Date` 对象添加属性。

- `Date.length` ：`Date.length` 的值是 `7`。这是该构造函数可接受的参数个数。

- `Date.now()` ：返回自 1970-1-1 00:00:00 UTC（世界标准时间）至今所经过的毫秒数。

- `Date.parse()` ：解析一个表示日期的字符串，并返回从 1970-1-1 00:00:00 所经过的毫秒数。

### Date 实例方法

- `Date.prototype.valueOf()` ：返回一个 Date 对象的原始值。覆盖了 Object.prototype.valueOf() 方法。

- to 类的方法（格式化日期）

  - `Date.prototype.toString()` ：返回一个字符串，表示该 Date 对象。覆盖了 `Object.prototype.toString()` 方法。

  - `Date.prototype.toDateString()` ：以美式英语和人类易读的表述形式返回一个 Date 对象**日期部分**的字符串。

  - `Date.prototype.toTimeString()` ：以人类易读形式返回一个 Date 对象**时间部分**的字符串，该字符串以美式英语格式化。

  - `Date.prototype.toLocaleString()` ：返回一个表述指定 Date 对象的字符串。该字符串格式因不同语言而不同。

  - `Date.prototype.toLocaleDateString()` ：返回一个表述指定 Date 对象的**日期部分**字符串。该字符串格式因不同语言而不同。

  - `Date.prototype.toLocaleTimeString()` ：返回一个表述指定 Date 对象**时间部分**的的字符串。该字符串格式因不同语言而不同。

  - `Date.prototype.toJSON()` ：返回指定 Date 对象调用 `toISOString()` 方法的返回值。在 `JSON.stringify()` 中使用。

  - `Date.prototype.toISOString()` ：将指定 Date 对象转换成 ISO 格式表述的字符串并返回。

  - `Date.prototype.toUTCString()` ：使用 UTC 时区，把一个 Date 对象转换为一个字符串。

- get 类方法（访问日期）

  - `Date.prototype.getTime()` ：返回一个数值，表示从 1970 年 1 月 1 日 0 时 0 分 0 秒（UTC，即协调世界时）距离该 Date 对象所代表时间的毫秒数。（更早的时间会用负数表示）

  - `Date.prototype.getFullYear()` ：根据本地时间，返回一个指定的 Date 对象的**完整年份（四位数年份）**。

  - `Date.prototype.getMonth()` ：根据本地时间，返回一个指定的 Date 对象的**月份（0–11）**，0 表示一年中的第一月。

  - `Date.prototype.getDate()` ：根据本地时间，返回一个指定的 Date 对象为**一个月中的哪一日**（1-31）。

  - `Date.prototype.getHours()` ：根据本地时间，返回一个指定的 Date 对象的**小时（0–23）**。

  - `Date.prototype.getMinutes()` ：根据本地时间，返回一个指定的 Date 对象的**分钟数（0–59）**。

  - `Date.prototype.getSeconds()` ：根据本地时间，返回一个指定的 Date 对象的**秒数（0–59）**。

  - `Date.prototype.getMilliseconds()` ：根据本地时间，返回一个指定的 Date 对象的**毫秒数（0–999）**。

  - `Date.prototype.getDay()` ：根据本地时间，返回一个指定的 Date 对象是在一周中的第几天（0-6），0 表示星期天。

  - `Date.prototype.getTimezoneOffset()` ：返回协调世界时（UTC）相对于当前时区的时间差值，单位为分钟。

  - `Date.prototype.getUTCFullYear()` ：以协调世界时为标准，返回一个指定的 Date 对象的完整年份（四位数年份）。

  - `Date.prototype.getUTCMonth()` ：以协调世界时为标准，返回一个指定的 Date 对象的月份（0–11），0 表示一年中的第一月。

  - `Date.prototype.getUTCDate()` ：以协调世界时为标准，返回一个指定的 Date 对象为一个月中的哪一日（1-31）。

  - `Date.prototype.getUTCHours()` ：以协调世界时为标准，返回一个指定的 Date 对象的小时（0–23）。

  - `Date.prototype.getUTCMinutes()` ：以协调世界时为标准，返回一个指定的 Date 对象的分钟数（0–59）。

  - `Date.prototype.getUTCSeconds()` ：以协调世界时为标准，返回一个指定的 Date 对象的秒数（0–59）。

  - `Date.prototype.getUTCMilliseconds()` ：以协调世界时为标准，返回一个指定的 Date 对象的毫秒数（0–999）。

  - `Date.prototype.getUTCDay()` ：以协调世界时为标准，返回一个指定的 Date 对象是在一周中的第几天（0-6），0 表示星期天。

  - `Date.prototype.getYear()` ：根据本地时间，返回一个指定的 Date 对象的相对年份（相对 1900 年，通常是 2 到 3 位数字）。请改用 `getFullYear` 。

- set 类方法（设置日期）

  - `Date.prototype.setTime()` ：用一个从 1970-1-1 00:00:00 UTC 计时的毫秒数来为一个 Date 对象设置时间。用负数来设置更早的时间。

  - `Date.prototype.setFullYear()` ：根据本地时间，设置一个 Date 对象的**完整年份（四位数年份）**。

  - `Date.prototype.setMonth()` ：根据本地时间，设置一个 Date 对象的**月份**。

  - `Date.prototype.setDate()` ：根据本地时间，设置一个 Date 对象在所属**月份中的天数**。

  - `Date.prototype.setHours()` ：根据本地时间，设置一个 Date 对象的**小时数**。

  - `Date.prototype.setMinutes()` ：根据本地时间，设置一个 Date 对象的**分钟数**。

  - `Date.prototype.setSeconds()` ：根据本地时间，设置一个 Date 对象的**秒数**。

  - `Date.prototype.setMilliseconds()` ：根据本地时间，设置一个 Date 对象的**豪秒数**。

  - `Date.prototype.setUTCFullYear()` ：以协调世界时为标准，设置一个 Date 对象的完整年份（四位数年份）。

  - `Date.prototype.setUTCMonth()` ：以协调世界时为标准，设置一个 Date 对象的月份。

  - `Date.prototype.setUTCDate()` ：以协调世界时为标准，设置一个 Date 对象在所属月份中的天数。

  - `Date.prototype.setUTCHours()` ：以协调世界时为标准，设置一个 Date 对象的小时数。

  - `Date.prototype.setUTCMinutes()` ：以协调世界时为标准，设置一个 Date 对象的分钟数。

  - `Date.prototype.setUTCSeconds()` ：以协调世界时为标准，设置一个 Date 对象的秒数。

  - `Date.prototype.setUTCMilliseconds()` ：以协调世界时为标准，设置一个 Date 对象的豪秒数。

  - `Date.prototype.setYear()` ：根据本地时间，设置一个 Date 对象的相对年份（相对 1900 年，通常是 2 到 3 位数字）。请改用 `setFullYear` 。
