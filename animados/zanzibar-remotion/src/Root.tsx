import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/zanzibar/Short";
import { TOTAL, FPS } from "./videos/zanzibar/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Zanzibar" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
