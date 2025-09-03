# EmailJS 配置指南

## 🚀 EmailJS 服务配置

### 1. 创建 EmailJS 账户
1. 访问 [EmailJS官网](https://www.emailjs.com/)
2. 注册免费账户（每月200封邮件免费）

### 2. 创建邮件服务
1. 在EmailJS控制台点击"Add New Service"
2. 选择您的邮件服务商（推荐Gmail或Outlook）
3. 服务ID设置为：`service_skyfire`

### 3. 创建邮件模板
1. 点击"Email Templates" → "Create New Template"
2. 模板ID设置为：`template_registration`
3. 使用以下模板内容：

```html
Subject: SKYFIRE 2nd DIY Competition - New Registration: {{participant_name}}

Dear SKYFIRE Team,

🔥 New participant registration received!

📋 PARTICIPANT INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Name: {{participant_name}}
📧 Email: {{participant_email}}  
🌍 Country: {{country}}
📱 Phone: {{phone}}
📏 Height: {{height}} cm
⚖️ Weight: {{weight}} kg
🏢 Company: {{company}}

🔧 COMPETITION DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👥 Type: {{participation_type}}
👨‍👩‍👧‍👦 Team: {{team_members}}
⚡ Power: {{power_level}}
📢 Source: {{source}}
⏰ Time: {{submission_time}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Please process this registration promptly.

Best regards,
SKYFIRE Registration System
```

### 4. 获取公开密钥
1. 在EmailJS控制台点击"Account" → "General"
2. 复制"Public Key"
3. 将密钥替换到index.html中的`emailjs.init("YOUR_KEY")`

### 5. 测试配置
- 确保服务ID：`service_skyfire`
- 确保模板ID：`template_registration`
- 确保公开密钥已正确配置

## 📧 三重保险机制

1. **主要方案：EmailJS** - 跨平台兼容，无需邮件客户端
2. **备用方案：Netlify Forms** - 表单数据收集
3. **最后备用：mailto链接** - 传统邮件客户端方式

## 🔧 优势

✅ **跨平台兼容** - Windows、macOS、Linux、移动设备
✅ **无需邮件客户端** - 直接通过浏览器发送
✅ **自动化处理** - 无需用户手动操作
✅ **可靠性高** - 多重备用方案
✅ **免费使用** - 每月200封邮件限额
