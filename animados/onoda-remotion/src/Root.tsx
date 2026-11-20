import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/onoda/Short";
import { TOTAL, FPS } from "./videos/onoda/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Onoda" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
