# SQL 基础

+ 创建数据库： `CREATE DATABASE <database_name>`
+ 删除数据库： `DROP DATABASE <database_name>`
+ 创建数据库中的表： `CREATE TABLE <table_name>`
+ 删除数据库中的表： `DROP TABLE <table_name>`

``` sql
-- 使用 Navicat 设计表。导出 SQL 文件如下：

-- 数据表和字段使用反引号，是为了避免它们名称与 MySQL 保留字段相同
-- 先删除 player 表（如果数据库中存在该表的话），然后再创建 player 表
DROP TABLE IF EXISTS `player`;
-- 创建球员表
CREATE TABLE `player`  (
  -- player_id      球员ID
  -- int(11)        整数类型，显示长度为 11 位
  -- NOT NULL       表示整个字段不能是空值
  -- AUTO_INCREMENT 表示主键自动增长
  `player_id` int(11) NOT NULL AUTO_INCREMENT,
  -- team_id        球队ID
  -- int(11)        整数类型，显示长度为 11 位
  -- NOT NULL       表示整个字段不能是空值
  `team_id` int(11) NOT NULL,
  -- player_name    球员姓名
  -- varchar(255)   可变字符串类型，最大长度为 255
  -- CHARACTER SET  指定数据库采用的字符集，utf8 不能写为 utf-8
  -- COLLATE        指定数据库字符集的排序规则。utf8 的默认排序规则为 utf8_general_ci （表示对大小写不铭感， utf8_bin 表示对大小写敏感）
  -- NOT NULL       表示整个字段不能是空值
  `player_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  -- height         球员身高
  -- float(size, d) 带有浮动小数点的小数字。size 表示规定显示最大位数， d 表示规定小数点右侧的最大位数
  -- NULL           如果表中的某个列是可选的，那么可以在不向该列添加值的情况下插入新记录或更新已有的记录
  --                意味着该字段将以 NULL 值保存。用作未知的或不适用的值的占位符。
  -- DEFAULT        约束用于向列中插入默认值
  `height` float(3, 2) NULL DEFAULT 0.00,
  -- PRIMARY KEY    约束唯一标识数据库表中的每条记录
  --                主键必须包含唯一的值。主键列不能包含 NULL 值
  --                每个表都应该有一个主键，并且每个表只能有一个主键
  -- USING BTREE    索引方法采用 BTREE
  PRIMARY KEY (`player_id`) USING BTREE,
  -- UNIQUE         约束唯一标识数据库表中的每条记录
  --                UNIQUE 和 PRIMARY KEY 约束均为列或列集合提供了唯一性的保证
  --                PRIMARY KEY 约束拥有自动定义的 UNIQUE 约束
  --                每个表可以有多个 UNIQUE 约束，但是每个表只能有一个 PRIMARY KEY 约束
  -- UNIQUE INDEX   唯一索引。可设置其他索引方式 NORMAL INDEX（普通索引）
  --                唯一索引和普通索引的区别在于它对字段进行了唯一性的约束
  UNIQUE INDEX `player_name`(`player_name`) USING BTREE
) 
-- ENGINE = InnoDB  存储规则采用 InnoDB
-- ROW_FORMAT       设置行格式。Dynamic 基于compact格式，提高存储容量，支持大索引（large index）3072字节，由innodb_large_prefix参数控制。
ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;
```

SQL 大小写问题：

+ 表名、表别名、字段名、字段别名等都小写
+ SQL保留字、函数名、绑定变量等都大写

注：数据表的字段名推荐使用**下划线**命名。
