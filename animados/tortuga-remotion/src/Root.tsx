import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/tortuga/Short";
import { TOTAL, FPS } from "./videos/tortuga/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Tortuga" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
