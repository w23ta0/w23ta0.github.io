# MCP：从 Function Calling 到 AI Agent 的技术演进与生态构建


近年来，随着 AI 模型（如 GPT-4、Claude 等）的迅速发展，如何高效地将 AI 与企业级系统及各类第三方服务进行集成，成为了开发者和企业亟待解决的难题。传统方式依赖于单次的 Function Calling 实现模型与 API 的交互，但在复杂场景下，上下文传递不足以及各个服务之间的碎片化实现，使得全链路自动化成为难题。为了解决这一痛点，**Model Context Protocol（MCP）** 应运而生，为我们提供了一种全新的开放标准。

## 1. 背景与技术挑战

在过去的开发实践中，主要存在以下几个挑战：

- **碎片化的接口调用**：各个平台与服务采用不同的 API 设计，导致集成工作重复且效率低下。
- **上下文信息难以贯通**：传统 Function Calling 难以在多步任务中维持连续的上下文，限制了 AI Agent 的自主决策能力。
- **重复造轮子问题**：开发者需要为每个服务单独编写集成代码，资源浪费严重，且系统维护困难。

企业在面对敏感数据和安全要求时，这些问题尤为突出。迫切需要一种开放、通用且具有共识的协议标准，来统一各类服务的能力描述和调用方式。

## 2. MCP 的技术突破

MCP 的设计理念类似于电子设备中的 Type-C 接口，它的核心优势包括：

- **统一标准化能力描述**  
  MCP 通过明确描述各项服务的功能、输入参数与返回格式，为 AI Agent 构建了一份详细的“能力清单”，使不同服务之间可以无缝协作。

- **上下文传递与自动化决策**  
  借助 MCP，AI Agent 能够跨服务维持上下文信息，实现从单次函数调用到全自动任务执行的转变。这使得 AI 系统不仅仅提供建议，而是能够在多步任务中自主决策并执行。

- **开放生态与复用性**  
  标准化协议促使各大服务商和开源社区共同构建生态系统，开发者无需重复造轮子，可以直接使用现有的 MCP 服务，显著降低了集成门槛和开发成本。

## 3. MCP 与传统 Function Calling / AI Agent 的对比

在理解 MCP 的优势之前，我们先来明确传统技术之间的差异：

- **Function Calling**：主要用于将 AI 模型的请求转化为单次 API 调用，适用于简单任务，但难以应对复杂场景。
- **AI Agent**：在 Function Calling 基础上增加了决策逻辑，实现一定程度的自动化；然而，上下文传递与多步决策依旧存在局限。
- **MCP**：在上述基础上，通过标准化描述和上下文管理，支持跨系统、跨服务的连续任务执行，实现了真正的全链路自动化。

## 4. MCP 架构解析

MCP 的架构主要包括以下四个核心组件：

- **MCP Hosts**：指运行 AI 模型的应用程序，例如 Cursor、Claude Desktop 等。
- **MCP Clients**：在 Host 内部维护与 MCP Server 的 1:1 通信，负责请求转发和响应处理。
- **MCP Servers**：作为协议的核心，MCP Server 提供各项服务的能力描述、工具列表以及上下文信息，充当 AI Agent 与各类服务之间的桥梁。
- **Local Data Sources & Remote Services**：分别对应本地数据和远程 API，提供实际的数据支撑和功能实现。

这种设计使得不同服务可以在 MCP 标准下互通，AI Agent 能够根据任务需求，自动选择并调用合适的服务，实现多系统间的无缝集成。

## 5. 示例代码解读

以下代码展示了如何基于 MCP 实现一个 GitHub 集成服务。该示例定义了搜索仓库、搜索 Issue 以及创建 Issue 的能力，并通过标准化的接口描述完成了与 GitHub API 的交互。

```typescript
import { z } from 'zod';
import { Server, ListToolsRequestSchema, CallToolRequestSchema, StdioServerTransport } from 'mcp-sdk';
import * as repository from './repository';
import * as issues from './issues';
import * as search from './search';

const VERSION = '1.0.0';

const server = new Server(
  { name: "github-mcp-server", version: VERSION },
  { capabilities: { tools: {} } }
);

// 定义工具列表，告知 AI Agent 可用的功能
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "search_repositories",
        description: "搜索 GitHub 仓库",
        inputSchema: repository.SearchRepositoriesSchema,
      },
      {
        name: "create_issue",
        description: "在 GitHub 仓库中创建 Issue",
        inputSchema: issues.CreateIssueSchema,
      },
      {
        name: "search_issues",
        description: "搜索 GitHub Issue 和 Pull Request",
        inputSchema: search.SearchIssuesSchema,
      }
    ],
  };
});

// 处理具体工具调用请求
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (!request.params.arguments) {
    throw new Error("缺少必要的参数");
  }
  switch (request.params.name) {
    case "search_repositories": {
      const args = repository.SearchRepositoriesSchema.parse(request.params.arguments);
      const results = await repository.searchRepositories(args.query, args.page, args.perPage);
      return { content: [{ type: "text", text: JSON.stringify(results, null, 2) }] };
    }
    case "create_issue": {
      const args = issues.CreateIssueSchema.parse(request.params.arguments);
      const issue = await issues.createIssue(args.owner, args.repo, args.options);
      return { content: [{ type: "text", text: JSON.stringify(issue, null, 2) }] };
    }
    case "search_issues": {
      const args = search.SearchIssuesSchema.parse(request.params.arguments);
      const results = await search.searchIssues(args);
      return { content: [{ type: "text", text: JSON.stringify(results, null, 2) }] };
    }
    default:
      throw new Error(`未知的工具：${request.params.name}`);
  }
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("GitHub MCP Server 已启动，通过 stdio 进行通信");
}

runServer().catch((error) => {
  console.error("启动服务器时发生致命错误：", error);
  process.exit(1);
});
```

上述代码充分展示了 MCP 如何通过标准化协议描述服务能力，并在 AI Agent 的请求下自动调用相应的 API，从而实现跨服务的任务自动化。

## 6. 实际应用与生态构建

基于 MCP 的开放标准，当前已有越来越多的第三方平台和开源社区开始提供 MCP 服务器实现，典型应用场景包括：

- **企业级自动化运维**：通过整合本地日志、数据库查询等功能，实现从问题监控到自动化故障修复的闭环管理。
- **跨平台工具集成**：如 GitHub、Slack、AWS、Google Calendar 等服务均已有对应的 MCP 实现，方便开发者快速构建多平台协同的 AI Agent。
- **生态系统构建**：统一的接口标准有助于降低各服务之间的集成难度，促进企业、开发者与开源社区之间的协同创新。

## 7. 展望与思考

从技术演进角度看，MCP 的推出标志着 AI 应用集成进入了全新的阶段。未来，我们有理由相信：

- **上下文传递能力进一步增强**：AI Agent 将能在更大范围内保持上下文连续，实现复杂任务的多步自动化执行。
- **跨平台互操作性显著提升**：统一协议标准将促使不同平台和服务间的数据和功能实现无缝对接，降低系统集成成本。
- **生态系统逐步完善**：随着各大平台和开源社区的持续投入，基于 MCP 的应用和工具将日益丰富，推动整个 AI 自动化领域的深度发展。

## 总结

MCP 为我们提供了一种全新的思路，将传统的 Function Calling 升级为具备跨平台上下文传递能力的 AI Agent。通过统一的能力描述和标准化的接口，开发者不仅可以减少重复工作，还能更快速地构建出高效、智能的自动化系统。在技术不断进步和生态系统逐步完善的推动下，MCP 将成为未来 AI 应用集成的重要基石，为实现全链路自动化提供坚实保障。

---

---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/9fvdvwz1/  

