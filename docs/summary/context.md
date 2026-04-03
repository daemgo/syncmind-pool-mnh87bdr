# 对话摘要

---
### 2026-04-03
**Skills**: /requirements (重建)
**变更**: docs/customer/requirements.json

- 档案更新后重建需求文档，从长机科技(EAM)切换为慕尚时装(CRM)
- 新增5条must-have需求：客户统一管理、销售跟进记录、业绩看板、渠道对账、离职交接
- 新增should-have需求：移动端、价格管理、拜访计划、应收款管理
- 完成度40%，置信度low（冷启动推演）

**待跟进**: 确认老板核心关注指标、对账周期、销售分配模式、预算、上线时间
---
### 2026-04-03
**Skills**: init-app
**变更**: 生成完整前端 Demo（长机科技 EAM 系统）

- 系统类型：设备资产管理系统（EAM）
- 核心模块：设备台账、维修工单、预防性维护、备品备件（含列表页+详情页+表单弹窗）
- 占位模块：西门子集成、分析报表、系统设置
- 数据来源：spec.md (v1.0.1)

**项目结构**:
- 侧边导航：src/components/layout/sidebar.tsx
- 根布局：src/routes/__root.tsx
- 数据字典：src/lib/dict.ts
- Dashboard：src/routes/index.tsx
- 模块路由：src/routes/{module}/（index.tsx、$id.tsx）
- 模块组件：src/components/{module}/（filter、table、detail、form-dialog）
- Mock 数据：src/mock/{module}.ts
- 类型定义：src/types/{module}.ts
