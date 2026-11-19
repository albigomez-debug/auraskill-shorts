import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/rayos/Short";
import { TOTAL, FPS } from "./videos/rayos/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Rayos" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
