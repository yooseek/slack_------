// workflows/give_kudos.ts
import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { FindGIFFunction } from "../functions/find_gif.ts";

const GiveCompetitionsWorkflow = DefineWorkflow({
  callback_id: "give_competitions_workflow",
  title: "Give Competitions",
  description: "누군가에게 따뜻한 말과 응원의 편지를 전달하세요",
  input_parameters: {
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
    },
    required: ["interactivity"],
  },
});

const competition = GiveCompetitionsWorkflow.addStep(
  Schema.slack.functions.OpenForm,
  {
    title: "마니또",
    interactivity: GiveCompetitionsWorkflow.inputs.interactivity,
    submit_label: "마니또 칭찬하기",
    description: "누군가에게 따뜻한 메세지로 당신의 마음을 전달하세요 :smile:",
    fields: {
      elements: [{
        name: "maniddo",
        title: "누구의 마니또가 되어주실건가요?",
        type: Schema.slack.types.user_id,
      }, {
        name: "message",
        title: "마니또에게 긍정적인 말을 전하세요",
        type: Schema.types.string,
        long: true,
      }, {
        name: "default_message",
        title: '마니또에게 전할 에너지를 고르세요',
        description: "어떤 종류의 따뜻함을 전달할까요?",
        type: Schema.types.string,
        enum: [
          "당신을 응원합니다 🫂",
          "대단한 성과를 축하해요 🏆",
          "환상적인 팀워크를 가지셨군요 ⚽️",
          "나를 놀라게 했어요, 멋져요 ☄️",
          "앞으로가 기대되는걸요 🎉",
          "그냥 썼어요 🪴",
        ],
      }],
      required: ["maniddo", "message", "default_message"],
    },
  },
);

const gif = GiveCompetitionsWorkflow.addStep(FindGIFFunction, {
  vibe: competition.outputs.fields.default_message,
});

GiveCompetitionsWorkflow.addStep(Schema.slack.functions.SendDm, {
  user_id: competition.outputs.fields.maniddo,
  message:
    `*똑똑 <@${competition.outputs.fields.maniddo}>님!* 누군가 당신에게 따뜻한 편지를 보냈어요 :otter:\n` +
    `> ${competition.outputs.fields.message}\n` +
    `${gif.outputs.URL}`,
});

export { GiveCompetitionsWorkflow };