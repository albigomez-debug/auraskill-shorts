import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/pimpin26/Short";
import { TOTAL, FPS } from "./videos/pimpin26/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Pimpin26" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
