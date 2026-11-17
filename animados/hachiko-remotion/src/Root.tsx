import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/hachiko/Short";
import { TOTAL, FPS } from "./videos/hachiko/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Hachiko" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
