import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/pimpin5/Short";
import { TOTAL, FPS } from "./videos/pimpin5/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Pimpin5" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
