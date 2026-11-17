import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/stubby/Short";
import { TOTAL, FPS } from "./videos/stubby/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Stubby" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
