import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/hans/Short";
import { TOTAL, FPS } from "./videos/hans/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Hans" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
