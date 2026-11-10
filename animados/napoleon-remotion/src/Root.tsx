import React from "react";
import { Composition } from "remotion";
import { NapoleonShort } from "./videos/napoleon/Napoleon";
import { TOTAL, FPS } from "./videos/napoleon/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Napoleon" component={NapoleonShort} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
