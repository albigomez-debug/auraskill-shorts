import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/annie/Short";
import { TOTAL, FPS } from "./videos/annie/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Annie" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
