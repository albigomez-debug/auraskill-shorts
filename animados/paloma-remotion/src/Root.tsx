import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/paloma/Short";
import { TOTAL, FPS } from "./videos/paloma/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Paloma" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
