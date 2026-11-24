import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/pimpin15/Short";
import { TOTAL, FPS } from "./videos/pimpin15/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Pimpin15" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
