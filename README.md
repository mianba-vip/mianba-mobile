# 面霸 · 移动端（Capacitor · Android）

面霸的手机端：Capacitor 壳 + React SPA，构建产物为 Android APK。
原为后端单体仓库（interview）中的 `mobile/` 目录，已拆分为独立项目。

## 技术栈

React 18 · TypeScript · Vite 5 · Capacitor 8（Android）· react-router · lucide-react

## 与后端的关系

纯前端项目。所有 API 走构建时烘焙的 `VITE_API_BASE` 指向的面霸后端（Spring Boot）：

```bash
# 生产构建（地址烘进产物，装到手机后直连）
VITE_API_BASE=https://mianba.vip npm run build
```

本地联调：改 `vite.config.ts` 里 `/api` 代理的目标地址（默认指向线上源站）。

## 开发

```bash
npm install
npm run dev        # 开发服务器（--host 已开，手机同 Wi-Fi 可直接访问）
```

## 构建 APK

```bash
VITE_API_BASE=https://mianba.vip npm run build   # 记得先设置 API 地址，否则装到手机无法访问接口
npx cap sync android                             # 同步 web 产物与插件到安卓工程
cd android && ./gradlew assembleDebug            # 产物：android/app/build/outputs/apk/debug/app-debug.apk
```

- `android/local.properties`（SDK 路径）不入库：首次构建由 Android Studio 生成，或手工创建 `sdk.dir=...`
- 后续只改 web 代码时，重复 `npm run build && npx cap sync android && gradlew assembleDebug` 即可

## 目录结构

| 路径 | 说明 |
|---|---|
| `src/` | React 源码（登录 / 首页 / 练习 / 讲解 / 面试 / 沉淀 / 我的） |
| `android/` | Capacitor 安卓工程（`cap sync` 后可构建） |
| `scripts/` | 内部辅助脚本 |
| `lib/`（src 下） | 每日预取、语音输入、本地偏好等基础设施 |

## 功能备注

- 每日预取：进入首页后自动把今日任务概念的大纲与子点讲解预热进服务端缓存（每天一轮、断点续跑）
- 语音作答：答题页按住麦克风说话、松开填入输入框（原生 SpeechRecognizer 插件，需麦克风权限）
- 讲解生成期间流式展示模型思考内容；mermaid 流程图渲染为药丸流
