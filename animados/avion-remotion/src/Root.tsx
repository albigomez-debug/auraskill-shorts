import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/avion/Short";
import { TOTAL, FPS } from "./videos/avion/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Avion" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
