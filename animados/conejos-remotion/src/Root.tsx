import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/conejos/Short";
import { TOTAL, FPS } from "./videos/conejos/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Conejos" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
