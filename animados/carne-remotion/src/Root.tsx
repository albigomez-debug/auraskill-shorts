import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/carne/Short";
import { TOTAL, FPS } from "./videos/carne/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Carne" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
