import { DefineFunction, Schema } from "deno-slack-sdk/mod.ts";
import { SlackFunction } from "deno-slack-sdk/mod.ts";
import gifs from "../assets/gifs.json" assert { type: "json" };

export const FindGIFFunction = DefineFunction({
  callback_id: "find_gif",
  title: "Find a GIF",
  description: "Search for a GIF that matches the vibe",
  source_file: "functions/find_gif.ts",
  input_parameters: {
    properties: {
      vibe: {
        type: Schema.types.string,
        description: "에너지에 맞는 GIF 이미지를 업로드해주세요!",
      },
    },
    required: [],
  },
  output_parameters: {
    properties: {
      URL: {
        type: Schema.types.string,
        description: "GIF URL",
      },
      alt_text: {
        type: Schema.types.string,
        description: "description of the GIF",
      },
    },
    required: ["URL"],
  },
});

const getEnergy = (vibe: string): string => {
  if (vibe.endsWith("🫂")) return "appreciation";
  if (vibe.endsWith("🏆")) return "celebration";
  if (vibe.endsWith("⚽️")) return "thankful";
  if (vibe.endsWith("☄️")) return "amazed";
  if (vibe.endsWith("🎉")) return "excited";
  if (vibe.endsWith("🪴")) return "plants";
  return "otter"; // 🦦
};

interface GIF {
  URL: string;
  alt_text?: string;
  tags: string[];
}

const matchVibe = (vibe: string): GIF => {
  const energy = getEnergy(vibe);
  const matches = gifs.filter((g: GIF) => g.tags.includes(energy));
  const randomGIF = Math.floor(Math.random() * matches.length);
  return matches[randomGIF];
};

export default SlackFunction(FindGIFFunction, ({ inputs }) => {
  const { vibe } = inputs;
  const gif = matchVibe(vibe ?? "");
  return { outputs: gif };
});