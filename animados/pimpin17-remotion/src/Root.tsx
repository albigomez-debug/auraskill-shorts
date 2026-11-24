import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/pimpin17/Short";
import { TOTAL, FPS } from "./videos/pimpin17/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Pimpin17" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
