# TypeScript控制反转和依赖注入

## IoC 控制反转

IoC（Inversion of Control），即 “控制反转”。在开发中， IoC 意味着将设计好的对象交给容器控制，⽽不是使⽤传统的⽅式，在对象内部直接控制。

+ **IoC 是有专⻔⼀个容器来创建这些对象，即由 IoC 容器控制对象的创建**。而直接在对象内部通过 `new` 的方式创建对象，是程序主动创建依赖对象。
+ 传统应⽤程序是由我们⾃⼰在程序中主动控制去获取依赖对象，称为**正转**。**反转，则是由容器来帮忙创建及注⼊依赖对象**。因为由容器帮我们查找及注⼊依赖对象，对象只是被动的接受依赖对象，依赖对象的获取被反转。

把创建和查找依赖对象的控制权交给了容器，由容器注⼊组合对象，所以对象之间是松散耦合。

## DI 依赖注入

对于控制反转来说，其中最常⻅的⽅式是 DI（Dependency Injection），即 “依赖注入”。组件之间的依赖关系由容器在运⾏期决定，即由容器动态的将某个依赖关系注⼊到组件之中。依赖注⼊的⽬的是为了提升组件重⽤的频率，并为系统搭建⼀个灵活、可扩展的平台。

+ 应⽤程序依赖 IoC 容器，IoC 容器注⼊应⽤程序依赖的对象，注⼊某个对象所需的外部资源（包括对象、资源、常量数据）
+ 应⽤程序需要 IoC 容器来提供对象需要的外部资源（包括对象、资源、常量数据）

## 相关 npm 库

+ [reflect-metadata](https://github.com/rbuckton/reflect-metadata)
+ [InversifyJS](https://github.com/inversify/InversifyJS) : 依赖注入工具库，可⽤于 JavaScript 和 Node.js 应⽤，功能强⼤、轻量的IoC 容器。
+ [TSYringe](https://github.com/microsoft/tsyringe) : TypeScript / JavaScript的轻量级依赖注入容器，用于构造函数注入。
