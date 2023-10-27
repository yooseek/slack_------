import { Trigger } from "deno-slack-api/types.ts";

const trigger: Trigger = {
  type: "shortcut",
  name: "마니또에게 당신의 따뜻함을 전하세요",
  description: "따뜻함을 GIF 파일과 함께 전달하세요",
  workflow: "#/workflows/give_competitions_workflow",
  inputs: {
    interactivity: {
      value: "{{data.interactivity}}",
    },
  },
};

export default trigger;