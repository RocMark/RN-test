# TODO

- [ ] 第三方 => 透過跳轉 or 打 API 進行登入?

# Daily
- [Human Interface Guidelines](https://www.notion.so/rocmark/Human-Interface-Guidelines-7ee13332d0fa4ef0898dbf40a9f0f533)
- [Redux Full Course](https://www.youtube.com/watch?v=zrs7u6bdbUw&t=1s)


# Components
- [ ] Icon with 通知數量 (Z-index 切版)
- [ ] Overlay Z-Index 化
- [ ] [剪貼簿功能-用於複製按鈕](https://www.npmjs.com/package/@react-native-clipboard/clipboard)
- [WebView 會盡量避免使用但還是測一下](https://iter01.com/444851.html)


# Redux Persist
- https://www.youtube.com/watch?v=AYqtzVPGIqs&t=56s
- https://blog.jscrambler.com/how-to-use-redux-persist-in-react-native-with-asyncstorage


# Push Notification
- https://www.youtube.com/watch?v=FsUNPSA6Ogg

# .env
- 使用 Expo 內建的判斷即可
- [react-native-device-info 包含了 iOS 的 Code 所以會出現錯誤而無法使用](https://stackoverflow.com/questions/67110388/invariant-violation-native-module-cannot-be-null-error-only-showing-up-on-ios)
```
import * as Device from 'expo-device'
Device.isDevice // true | false
```
