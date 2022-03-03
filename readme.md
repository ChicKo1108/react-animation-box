### 组件介绍

页面滚动到当前组件的位置后，根据props传递的类名做相应的动画。

### props

```js
props = {
    animation: String, // animate.css中定义的类名
    duration: String, // 动画展示时间
    delay: String, // 延迟一段时间后展示
}
```

### 原理

监听页面滚动事件，判断当前dom元素是否出现在屏幕内，若出现了则使用`React.cloneElement(el, props)`方法，将动画的style添加到子元素的prop上。

### 使用方法

```js
import <AnimationBox> form '/animation-box';

<AnimationBox animation="fade-in" duration=".5s" delay="0">
    <div>this is a div.</div>
</AnimationBox>

```
