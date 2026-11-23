import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/pimpin12/Short";
import { TOTAL, FPS } from "./videos/pimpin12/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Pimpin12" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
