import React from "react";
import { Composition } from "remotion";
import { EmusShort } from "./videos/emus/Emus";
import { TOTAL, FPS } from "./videos/emus/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Emus" component={EmusShort} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
