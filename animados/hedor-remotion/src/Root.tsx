import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/hedor/Short";
import { TOTAL, FPS } from "./videos/hedor/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Hedor" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
