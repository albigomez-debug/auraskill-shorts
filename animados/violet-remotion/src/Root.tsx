import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/violet/Short";
import { TOTAL, FPS } from "./videos/violet/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Violet" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
