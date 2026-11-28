import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/calment/Short";
import { TOTAL, FPS } from "./videos/calment/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Calment" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
